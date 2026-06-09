'use client';

import { useEffect, useRef } from 'react';

export default function HeroNetwork() {
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

    let W = 0;
    let H = 0;
    type Node = { x: number; y: number; vx: number; vy: number };
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      W = canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      const count = Math.min(130, Math.max(45, Math.round((canvas.clientWidth * canvas.clientHeight) / 13000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
      }));
    };
    build();

    const D = 130 * dpr; // node-to-node link distance
    const D2 = D * D;
    const MR = 190 * dpr; // cursor link radius
    const MR2 = MR * MR;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // move
      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
          // gentle drift toward cursor
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MR2) {
            const d = Math.sqrt(d2) || 1;
            const f = ((MR2 - d2) / MR2) * 0.06;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
          n.vx = Math.max(-0.7 * dpr, Math.min(0.7 * dpr, n.vx));
          n.vy = Math.max(-0.7 * dpr, Math.min(0.7 * dpr, n.vy));
        }
      }

      // node-to-node links
      ctx.strokeStyle = teal;
      ctx.lineWidth = dpr;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < D2) {
            ctx.globalAlpha = (1 - d2 / D2) * 0.22;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // cursor links
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MR2) {
          ctx.globalAlpha = (1 - d2 / MR2) * 0.5;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // nodes
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = teal;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) draw();
    else raf = requestAnimationFrame(draw);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

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
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      themeObs.disconnect();
      clearTimeout(rt);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
