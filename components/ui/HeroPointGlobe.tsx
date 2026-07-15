'use client';

import { useEffect, useRef } from 'react';

const N = 1100; // points on the sphere

export default function HeroPointGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const readTeal = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-teal').trim() || '#3b9eff';
    let teal = readTeal();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fibonacci sphere — evenly distributed unit vectors.
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }

    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    };
    resize();
    window.addEventListener('resize', resize);

    let ay = 0;
    let rx = 0;
    let rxTarget = 0;
    let ryTarget = 0;
    let raf = 0;

    const draw = () => {
      const radius = Math.min(W, H) * 0.42;
      const fov = 3.2;
      const cx = W / 2;
      const cy = H / 2;

      ay += reduce ? 0 : 0.0032;
      rx += (rxTarget - rx) * 0.06;
      const ry = ay + ryTarget;

      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const [px, py, pz] = pts[i];
        // rotate Y then X
        const x = px * cosY - pz * sinY;
        let z = px * sinY + pz * cosY;
        const y = py * cosX - z * sinX;
        z = py * sinX + z * cosX;

        const scale = fov / (fov - z); // perspective
        const sx = cx + x * radius * scale;
        const sy = cy + y * radius * scale;

        const depth = (z + 1) / 2; // 0 back → 1 front
        const alpha = 0.15 + depth * 0.7;
        const size = Math.max(0.6, (0.6 + depth * 1.7) * dpr);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = teal;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) draw();
    else raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      rxTarget = ny * 0.9;
      ryTarget = nx * 0.9;
    };
    window.addEventListener('pointermove', onMove);

    const themeObs = new MutationObserver(() => {
      teal = readTeal();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      themeObs.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
