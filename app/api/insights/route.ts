import { NextResponse } from 'next/server';

// Server-only PostHog credentials — never exposed to the browser.
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const PERSONAL_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const API_HOST = process.env.POSTHOG_API_HOST ?? 'https://us.posthog.com';
const PASSWORD = process.env.INSIGHTS_PASSWORD;

async function hogql(query: string): Promise<unknown[][]> {
  const res = await fetch(`${API_HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PERSONAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    // Always fetch fresh numbers.
    cache: 'no-store',
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`PostHog ${res.status}: ${detail.slice(0, 200)}`);
  }
  const json = (await res.json()) as { results?: unknown[][] };
  return json.results ?? [];
}

export async function GET(request: Request) {
  // --- Auth gate ---
  if (!PASSWORD) {
    return NextResponse.json({ error: 'Dashboard password is not configured.' }, { status: 500 });
  }
  if (request.headers.get('x-insights-password') !== PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  if (!PROJECT_ID || !PERSONAL_KEY) {
    return NextResponse.json({ error: 'PostHog is not configured.' }, { status: 500 });
  }

  try {
    const [pv7, uv7, pv1, series, topPages, referrers, countries, devices, recent] =
      await Promise.all([
        hogql(`SELECT count() FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 7 DAY`),
        hogql(`SELECT count(DISTINCT person_id) FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 7 DAY`),
        hogql(`SELECT count() FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 1 DAY`),
        hogql(
          `SELECT toDate(timestamp) AS d, count() AS c FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 14 DAY GROUP BY d ORDER BY d`
        ),
        hogql(
          `SELECT properties.$pathname AS path, count() AS c FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY GROUP BY path ORDER BY c DESC LIMIT 8`
        ),
        hogql(
          `SELECT coalesce(nullif(properties.$referring_domain, ''), 'direct') AS ref, count() AS c FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY GROUP BY ref ORDER BY c DESC LIMIT 8`
        ),
        hogql(
          `SELECT coalesce(nullif(properties.$geoip_country_name, ''), 'Unknown') AS country, count() AS c FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY GROUP BY country ORDER BY c DESC LIMIT 8`
        ),
        hogql(
          `SELECT coalesce(nullif(properties.$device_type, ''), 'Unknown') AS device, count() AS c FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY GROUP BY device ORDER BY c DESC`
        ),
        hogql(
          `SELECT event, properties.$pathname AS path, timestamp FROM events ORDER BY timestamp DESC LIMIT 20`
        ),
      ]);

    const num = (rows: unknown[][]) => Number((rows?.[0]?.[0] as number) ?? 0);
    const pairs = (rows: unknown[][]) =>
      (rows ?? []).map((r) => ({ label: String(r[0] ?? '—'), count: Number(r[1] ?? 0) }));

    return NextResponse.json({
      pageviews7: num(pv7),
      visitors7: num(uv7),
      pageviews1: num(pv1),
      series: (series ?? []).map((r) => ({ date: String(r[0]), count: Number(r[1] ?? 0) })),
      topPages: pairs(topPages),
      referrers: pairs(referrers),
      countries: pairs(countries),
      devices: pairs(devices),
      recent: (recent ?? []).map((r) => ({
        event: String(r[0] ?? ''),
        path: String(r[1] ?? ''),
        time: String(r[2] ?? ''),
      })),
    });
  } catch (err) {
    console.error('Insights error:', err);
    return NextResponse.json({ error: 'Failed to load analytics.' }, { status: 502 });
  }
}
