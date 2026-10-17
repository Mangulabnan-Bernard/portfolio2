import { createHash, createHmac, randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const STARTING_COUNT = 178;
const COOKIE_NAME = 'portfolio_v4_heart';
const COUNT_KEY = 'portfolio-v4:hearts:count';
const VOTERS_KEY = 'portfolio-v4:hearts:voters';
const RATE_LIMIT_PREFIX = 'portfolio-v4:hearts:ip';
const MAX_HEARTS_PER_IP = 3;
const RATE_LIMIT_SECONDS = 60 * 60 * 24;

const READ_SCRIPT = `
redis.call('SETNX', KEYS[1], ARGV[1])
local count = tonumber(redis.call('GET', KEYS[1]))
if count < tonumber(ARGV[1]) then redis.call('SET', KEYS[1], ARGV[1]); count = tonumber(ARGV[1]) end
return {count, redis.call('SISMEMBER', KEYS[2], ARGV[2])}
`;
const HEART_SCRIPT = `
redis.call('SETNX', KEYS[1], ARGV[1])
if tonumber(redis.call('GET', KEYS[1])) < tonumber(ARGV[1]) then redis.call('SET', KEYS[1], ARGV[1]) end
local count = tonumber(redis.call('GET', KEYS[1]))
if redis.call('SISMEMBER', KEYS[2], ARGV[2]) == 1 then return {count, 1, 0, 0} end
local ipHearts = tonumber(redis.call('GET', KEYS[3]) or '0')
if ipHearts >= tonumber(ARGV[3]) then
  local retryAfter = tonumber(redis.call('TTL', KEYS[3]))
  if retryAfter < 1 then retryAfter = tonumber(ARGV[4]) end
  return {count, 0, 1, retryAfter}
end
redis.call('SADD', KEYS[2], ARGV[2])
local nextCount = redis.call('INCR', KEYS[1])
local nextIpCount = redis.call('INCR', KEYS[3])
if nextIpCount == 1 then redis.call('EXPIRE', KEYS[3], ARGV[4]) end
return {nextCount, 1, 0, 0}
`;

type HeartState = { count: number; hearted: boolean; rateLimited?: boolean; retryAfter?: number };
type MemoryRate = { count: number; resetAt: number };
type MemoryStore = { count: number; voters: Set<string>; rates?: Map<string, MemoryRate> };
const globalStore = globalThis as typeof globalThis & { __portfolioHearts?: MemoryStore };
globalStore.__portfolioHearts ??= { count: STARTING_COUNT, voters: new Set(), rates: new Map() };
globalStore.__portfolioHearts.rates ??= new Map();

async function redisCommand(command: unknown[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(7000),
  });
  const payload = await response.json();
  if (!response.ok || payload.error) throw new Error('Redis request failed');
  return payload.result as unknown;
}

async function stateFor(visitorHash: string, ipHash: string, add: boolean): Promise<HeartState> {
  const result = add
    ? await redisCommand([
        'EVAL', HEART_SCRIPT, 3, COUNT_KEY, VOTERS_KEY, `${RATE_LIMIT_PREFIX}:${ipHash}`,
        STARTING_COUNT, visitorHash, MAX_HEARTS_PER_IP, RATE_LIMIT_SECONDS,
      ])
    : await redisCommand(['EVAL', READ_SCRIPT, 2, COUNT_KEY, VOTERS_KEY, STARTING_COUNT, visitorHash]);
  if (Array.isArray(result)) {
    return {
      count: Number(result[0]),
      hearted: Boolean(Number(result[1])),
      rateLimited: Boolean(Number(result[2] ?? 0)),
      retryAfter: Number(result[3] ?? 0),
    };
  }
  const store = globalStore.__portfolioHearts!;
  let hearted = store.voters.has(visitorHash);
  if (add && !hearted) {
    const now = Date.now();
    const rates = store.rates!;
    const currentRate = rates.get(ipHash);
    const activeRate = currentRate && currentRate.resetAt > now
      ? currentRate
      : { count: 0, resetAt: now + RATE_LIMIT_SECONDS * 1000 };
    if (activeRate.count >= MAX_HEARTS_PER_IP) {
      rates.set(ipHash, activeRate);
      return {
        count: store.count,
        hearted: false,
        rateLimited: true,
        retryAfter: Math.max(1, Math.ceil((activeRate.resetAt - now) / 1000)),
      };
    }
    activeRate.count += 1;
    rates.set(ipHash, activeRate);
    store.voters.add(visitorHash);
    store.count += 1;
    hearted = true;
  }
  return { count: store.count, hearted };
}

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-vercel-forwarded-for')
    ?? request.headers.get('x-forwarded-for')
    ?? request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || 'local-development';
}

function ipFingerprint(request: NextRequest) {
  const secret = process.env.HEART_RATE_LIMIT_SALT
    ?? process.env.UPSTASH_REDIS_REST_TOKEN
    ?? 'portfolio-v4-local-development';
  return createHmac('sha256', secret).update(clientIp(request)).digest('hex');
}

function originAllowed(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host.toLowerCase();
    const requestHosts = [
      request.headers.get('x-forwarded-host'),
      request.headers.get('host'),
      request.nextUrl.host,
    ].filter((host): host is string => Boolean(host)).map((host) => host.toLowerCase());
    return requestHosts.includes(originHost);
  } catch {
    return false;
  }
}

async function handle(request: NextRequest, add: boolean) {
  if (add && !originAllowed(request)) return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  try {
    const existing = request.cookies.get(COOKIE_NAME)?.value;
    const visitor = existing && /^[0-9a-f-]{36}$/.test(existing) ? existing : randomUUID();
    const hash = createHash('sha256').update(visitor).digest('hex');
    const state = await stateFor(hash, ipFingerprint(request), add);
    const headers: Record<string, string> = { 'Cache-Control': 'private, no-store, max-age=0', Vary: 'Cookie' };
    if (state.rateLimited) headers['Retry-After'] = String(state.retryAfter || RATE_LIMIT_SECONDS);
    const response = state.rateLimited
      ? NextResponse.json(
          { error: 'Heart limit reached for this network. Please try again later.', count: state.count, hearted: false },
          { status: 429, headers },
        )
      : NextResponse.json({ count: state.count, hearted: state.hearted }, { headers });
    if (!existing) response.cookies.set(COOKIE_NAME, visitor, { httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 * 365 * 5 });
    return response;
  } catch (error) {
    console.error('Heart counter unavailable', error);
    return NextResponse.json({ error: 'Heart counter temporarily unavailable' }, { status: 503 });
  }
}

export function GET(request: NextRequest) { return handle(request, false); }
export function POST(request: NextRequest) { return handle(request, true); }
