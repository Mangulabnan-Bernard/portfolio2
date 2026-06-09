'use client';

import { useEffect, useRef } from 'react';

const MAX_PARTICLES = 5200;

export default function HeroParticleName() {
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
    type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number };
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const FONT = '700 SIZEpx ui-monospace, SFMono-Regular, Menlo, monospace';

    const build = () => {
      W = canvas.width = Math.max(1, Math.floor(wrap.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(wrap.clientHeight * dpr));
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${wrap.clientHeight}px`;

      const lines = ['Bernard C.', 'Mangulabnan'];
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
      const cx = W / 2;
      const cy = H / 2;
      ctx.fillText(lines[0], cx, cy - lh / 2);
      ctx.fillText(lines[1], cx, cy + lh / 2);

      const data = ctx.getImageData(0, 0, W, H).data;
      ctx.clearRect(0, 0, W, H);

      const gap = Math.max(3, Math.round(3 * dpr));
      const homes: [number, number][] = [];
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) homes.push([x, y]);
        }
      }
      // Downsample if we collected too many to keep the loop cheap.
      let chosen = homes;
      if (homes.length > MAX_PARTICLES) {
        chosen = [];
        const step = homes.length / MAX_PARTICLES;
        for (let i = 0; i < homes.length; i += step) chosen.push(homes[Math.floor(i)]);
      }
      particles = chosen.map(([hx, hy]) => ({ hx, hy, x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0 }));
    };

    build();

    const dot = Math.max(1, Math.round(dpr));
    const R = 64 * dpr;
    const R2 = R * R;
    let raf = 0;

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = teal;
      for (const p of particles) {
        p.vx += (p.hx - p.x) * 0.022;
        p.vy += (p.hy - p.y) * 0.022;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          const f = ((R2 - d2) / R2) * 6;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, dot, dot);
      }
      raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      ctx.fillStyle = teal;
      for (const p of particles) ctx.fillRect(p.hx, p.hy, dot, dot);
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
      <canvas ref={canvasRef} className="w-full h-full" aria-label="Bernard C. Mangulabnan" role="img" />
    </div>
  );
}
