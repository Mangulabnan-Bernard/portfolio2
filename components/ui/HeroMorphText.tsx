'use client';

import { useEffect, useRef } from 'react';

const POOL = 3000;
const HOLD_MS = 2800;

// Each frame morphs the pool toward one of these (two-line) targets, in order.
const PHRASES: string[][] = [
  ['Bernard', 'Mangulabnan'],
  ['Full Stack', 'Developer'],
  ['React · Next', '· Flutter'],
  ["Let's", 'build_'],
];

export default function HeroMorphText() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const readTeal = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-teal').trim() || '#3b9eff';
    let teal = readTeal();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    const FONT = '700 SIZEpx ui-monospace, SFMono-Regular, Menlo, monospace';
    let targets: Float32Array[] = [];
    type P = { x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const samplePhrase = (lines: string[]): Float32Array => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let size = H * 0.42;
      ctx.font = FONT.replace('SIZE', String(size));
      const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
      if (widest > W * 0.92) size *= (W * 0.92) / widest;
      ctx.font = FONT.replace('SIZE', String(size));

      const lh = size * 1.04;
      ctx.fillText(lines[0], W / 2, H / 2 - lh / 2);
      ctx.fillText(lines[1], W / 2, H / 2 + lh / 2);

      const data = ctx.getImageData(0, 0, W, H).data;
      ctx.clearRect(0, 0, W, H);

      const gap = Math.max(3, Math.round(3 * dpr));
      const pts: number[] = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
        }
      }
      // Normalize to exactly POOL points (index-stable across phrases → clean morph).
      const out = new Float32Array(POOL * 2);
      const count = pts.length / 2;
      for (let i = 0; i < POOL; i++) {
        const src = count > 0 ? Math.floor((i * count) / POOL) : 0;
        out[i * 2] = pts[src * 2] ?? W / 2;
        out[i * 2 + 1] = pts[src * 2 + 1] ?? H / 2;
      }
      return out;
    };

    const build = () => {
      W = canvas.width = Math.max(1, Math.floor(wrap.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(wrap.clientHeight * dpr));
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${wrap.clientHeight}px`;
      targets = PHRASES.map(samplePhrase);
      if (particles.length !== POOL) {
        particles = Array.from({ length: POOL }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 }));
      }
    };

    build();

    const dot = Math.max(1, Math.round(dpr));
    const R = 64 * dpr;
    const R2 = R * R;
    let raf = 0;
    let active = 0;
    let last = -1;

    const frame = (now: number) => {
      if (last < 0) last = now;
      if (now - last > HOLD_MS) {
        active = (active + 1) % targets.length;
        last = now;
      }
      const tgt = targets[active];

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = teal;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.vx += (tgt[i * 2] - p.x) * 0.02;
        p.vy += (tgt[i * 2 + 1] - p.y) * 0.02;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          const f = ((R2 - d2) / R2) * 6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, dot, dot);
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      const tgt = targets[0];
      ctx.fillStyle = teal;
      for (let i = 0; i < POOL; i++) ctx.fillRect(tgt[i * 2], tgt[i * 2 + 1], dot, dot);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);

    const themeObs = new MutationObserver(() => {
      teal = readTeal();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      themeObs.disconnect();
      clearTimeout(rt);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-[clamp(150px,30vw,320px)] touch-none">
      <canvas ref={canvasRef} className="w-full h-full" aria-label="Bernard C. Mangulabnan — Full Stack Developer" role="img" />
    </div>
  );
}
