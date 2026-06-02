'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { notFound } from 'next/navigation';
import { INSIGHTS_UNLOCK_KEY } from '@/components/SecretTrigger';

type Pair = { label: string; count: number };
type Insights = {
  pageviews7: number;
  visitors7: number;
  pageviews1: number;
  series: { date: string; count: number }[];
  topPages: Pair[];
  referrers: Pair[];
  countries: Pair[];
  devices: Pair[];
  recent: { event: string; path: string; time: string }[];
};

const STORAGE_KEY = 'insights-pw';

export default function InsightsDashboard() {
  const [allowed, setAllowed] = useState(false);
  const [denied, setDenied] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<Insights | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const pwRef = useRef('');

  const load = useCallback(async (pw: string) => {
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/insights', { headers: { 'x-insights-password': pw } });
      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        throw new Error('Wrong password.');
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? 'Failed to load analytics.');
      }
      const json = (await res.json()) as Insights;
      sessionStorage.setItem(STORAGE_KEY, pw);
      pwRef.current = pw;
      setData(json);
      setStatus('idle');
    } catch (err) {
      setData(null);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }, []);

  // Gate: only reachable after the secret word (or an existing session);
  // direct visits bounce to home. Fetch-on-mount is intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const unlocked = sessionStorage.getItem(INSIGHTS_UNLOCK_KEY) === '1';
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!unlocked && !saved) {
      setDenied(true);
      return;
    }
    setAllowed(true);
    if (saved) load(saved);
  }, [load]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password) load(password);
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    pwRef.current = '';
    setData(null);
    setPassword('');
    setStatus('idle');
  };

  // Direct visit without the secret word → behave as if the page doesn't exist.
  if (denied) notFound();
  // Still checking — render nothing to avoid a flash.
  if (!allowed) return null;

  // --- Password gate ---
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm bg-surface border border-border rounded-[14px] p-7">
          <div className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase mb-2">Private</div>
          <h1 className="font-mono text-[1.3rem] font-bold text-text mb-5">Analytics Dashboard_</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-bg border border-border rounded-[8px] px-3.5 py-2.5 font-mono text-[13px] text-text outline-none transition-colors focus:border-teal-3 mb-3"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg rounded-[8px] font-bold cursor-pointer transition-colors hover:bg-teal-hover disabled:opacity-60"
          >
            {status === 'loading' ? 'Checking…' : 'Unlock →'}
          </button>
          {status === 'error' && (
            <p className="font-mono text-[10px] text-red-400 mt-3 text-center">{error}</p>
          )}
        </form>
      </div>
    );
  }

  const maxSeries = Math.max(1, ...data.series.map((d) => d.count));

  return (
    <div className="max-w-[1080px] mx-auto px-6 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-teal uppercase mb-1">Private · Live</div>
          <h1 className="font-mono text-[1.6rem] font-bold text-text">Analytics_</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => load(pwRef.current)}
            className="font-mono text-[11px] tracking-[0.08em] px-4 py-2 border border-border text-text-2 rounded-[8px] cursor-pointer hover:border-teal-3 hover:text-teal transition-colors"
          >
            ↻ Refresh
          </button>
          <button
            onClick={logout}
            className="font-mono text-[11px] tracking-[0.08em] px-4 py-2 border border-border text-text-2 rounded-[8px] cursor-pointer hover:border-teal-3 hover:text-teal transition-colors"
          >
            Lock
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Pageviews · 24h" value={data.pageviews1} />
        <Stat label="Pageviews · 7d" value={data.pageviews7} />
        <Stat label="Unique visitors · 7d" value={data.visitors7} />
      </div>

      {/* Visits over time */}
      <Panel title="Visits · last 14 days">
        <div className="flex items-end gap-1.5 h-40">
          {data.series.length === 0 && <Empty />}
          {data.series.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center justify-end gap-1 group" title={`${d.date}: ${d.count}`}>
              <span className="font-mono text-[9px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">{d.count}</span>
              <div
                className="w-full bg-teal/70 rounded-t-[3px] transition-all hover:bg-teal"
                style={{ height: `${(d.count / maxSeries) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
              />
              <span className="font-mono text-[8px] text-muted">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Panel title="Top pages · 30d"><BarList rows={data.topPages} /></Panel>
        <Panel title="Referrers · 30d"><BarList rows={data.referrers} /></Panel>
        <Panel title="Countries · 30d"><BarList rows={data.countries} /></Panel>
        <Panel title="Devices · 30d"><BarList rows={data.devices} /></Panel>
      </div>

      {/* Recent events */}
      <Panel title="Recent events" className="mt-6">
        <div className="flex flex-col divide-y divide-border">
          {data.recent.length === 0 && <Empty />}
          {data.recent.map((e, i) => (
            <div key={i} className="flex items-center justify-between py-2 font-mono text-[11px]">
              <span className="text-teal-2">{e.event}</span>
              <span className="text-text-2 truncate max-w-[40%]">{e.path || '—'}</span>
              <span className="text-muted">{formatTime(e.time)}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-surface border border-border rounded-[14px] p-6">
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-2">{label}</div>
      <div className="font-mono text-[2rem] font-bold text-text leading-none">{value.toLocaleString()}</div>
    </div>
  );
}

function Panel({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-border rounded-[14px] p-6 ${className}`}>
      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-teal mb-4">{title}</div>
      {children}
    </div>
  );
}

function BarList({ rows }: { rows: Pair[] }) {
  if (rows.length === 0) return <Empty />;
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-text-2 w-[45%] truncate" title={r.label}>{r.label}</span>
          <div className="flex-1 h-2 bg-bg rounded-full overflow-hidden">
            <div className="h-full bg-teal/60 rounded-full" style={{ width: `${(r.count / max) * 100}%` }} />
          </div>
          <span className="font-mono text-[11px] text-muted w-10 text-right">{r.count}</span>
        </div>
      ))}
    </div>
  );
}

function Empty() {
  return <p className="font-mono text-[11px] text-muted">No data yet.</p>;
}

function formatTime(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
