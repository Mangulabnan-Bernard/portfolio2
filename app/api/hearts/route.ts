import { createHash, randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const STARTING_COUNT = 178;
const COOKIE_NAME = 'portfolio_v4_heart';
const COUNT_KEY = 'portfolio-v4:hearts:count';
const VOTERS_KEY = 'portfolio-v4:hearts:voters';

const READ_SCRIPT = `
redis.call('SETNX', KEYS[1], ARGV[1])
local count = tonumber(redis.call('GET', KEYS[1]))
if count < tonumber(ARGV[1]) then redis.call('SET', KEYS[1], ARGV[1]); count = tonumber(ARGV[1]) end
return {count, redis.call('SISMEMBER', KEYS[2], ARGV[2])}
`;
const HEART_SCRIPT = `
redis.call('SETNX', KEYS[1], ARGV[1])
if tonumber(redis.call('GET', KEYS[1])) < tonumber(ARGV[1]) then redis.call('SET', KEYS[1], ARGV[1]) end
if redis.call('SADD', KEYS[2], ARGV[2]) == 1 then return {redis.call('INCR', KEYS[1]), 1} end
return {tonumber(redis.call('GET', KEYS[1])), 1}
`;

type MemoryStore = { count: number; voters: Set<string> };
const globalStore = globalThis as typeof globalThis & { __portfolioHearts?: MemoryStore };
globalStore.__portfolioHearts ??= { count: STARTING_COUNT, voters: new Set() };

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

async function stateFor(visitorHash: string, add: boolean) {
  const result = await redisCommand(['EVAL', add ? HEART_SCRIPT : READ_SCRIPT, 2, COUNT_KEY, VOTERS_KEY, STARTING_COUNT, visitorHash]);
  if (Array.isArray(result)) return { count: Number(result[0]), hearted: Boolean(Number(result[1])) };
  const store = globalStore.__portfolioHearts!;
  let hearted = store.voters.has(visitorHash);
  if (add && !hearted) { store.voters.add(visitorHash); store.count += 1; hearted = true; }
  return { count: store.count, hearted };
}

async function handle(request: NextRequest, add: boolean) {
  if (add) {
    const origin = request.headers.get('origin');
    if (origin && new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: 'Origin not allowed' }, { status: 403 });
  }
  try {
    const existing = request.cookies.get(COOKIE_NAME)?.value;
    const visitor = existing && /^[0-9a-f-]{36}$/.test(existing) ? existing : randomUUID();
    const hash = createHash('sha256').update(visitor).digest('hex');
    const state = await stateFor(hash, add);
    const response = NextResponse.json(state, { headers: { 'Cache-Control': 'private, no-store, max-age=0', Vary: 'Cookie' } });
    if (!existing) response.cookies.set(COOKIE_NAME, visitor, { httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', path: '/', maxAge: 60 * 60 * 24 * 365 * 5 });
    return response;
  } catch (error) {
    console.error('Heart counter unavailable', error);
    return NextResponse.json({ error: 'Heart counter temporarily unavailable' }, { status: 503 });
  }
}

export function GET(request: NextRequest) { return handle(request, false); }
export function POST(request: NextRequest) { return handle(request, true); }
