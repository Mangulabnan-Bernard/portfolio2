'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number; r: number; label: string | null };

const LABELS = ['React', 'Next.js', 'TypeScript', 'Flutter', 'Dart', 'Node.js', 'Prisma', 'MySQL', 'TensorFlow', 'Tailwind', 'Claude Code', 'Cursor', 'Git', 'Vercel'];

function rgbVariable(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(value)?.[1];
  if (!hex) return fallback;
  const expanded = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  return `${parseInt(expanded.slice(0, 2), 16)},${parseInt(expanded.slice(2, 4), 16)},${parseInt(expanded.slice(4, 6), 16)}`;
}

type NodeGraphBackgroundProps = {
  /** Lower density for small ambient headers vs. the full hero. */
  density?: 'full' | 'ambient';
  className?: string;
};

/**
 * A drifting node network rendered on canvas — nodes brighten, connect, and
 * gently repel from the cursor. `ambient` mode drops labels and node count
 * for use as a quiet backdrop on secondary page headers.
 */
export default function NodeGraphBackground({ density = 'full', className = '' }: NodeGraphBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let accent = rgbVariable('--accent', '124,140,255');
    let accent2 = rgbVariable('--accent-2', '255,180,84');

    const refreshPalette = () => {
      accent = rgbVariable('--accent', accent);
      accent2 = rgbVariable('--accent-2', accent2);
    };

    function layout() {
      if (!canvas || !container) return;
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
      const count = density === 'ambient' ? (w < 700 ? 10 : 18) : w < 700 ? 22 : 38;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (density === 'ambient' ? 0.18 : 0.25),
        vy: (Math.random() - 0.5) * (density === 'ambient' ? 0.18 : 0.25),
        r: 1.5 + Math.random() * (density === 'ambient' ? 1.2 : 1.8),
        label: density === 'full' && i < LABELS.length ? LABELS[i] : null,
      }));
    }

    function onMove(e: MouseEvent) {
      if (!container) return;
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    layout();
    window.addEventListener('resize', layout);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        if (density === 'full') {
          const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 130 && mdist > 0.01) {
            const force = ((130 - mdist) / 130) * 0.6;
            n.x += (mdx / mdist) * force;
            n.y += (mdy / mdist) * force;
          }
        }
      }

      const linkDist = density === 'ambient' ? 140 : 150;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.strokeStyle = `rgba(${accent},${(1 - dist / linkDist) * (density === 'ambient' ? 0.25 : 0.35)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const near = density === 'full' && Math.hypot(n.x - mouse.x, n.y - mouse.y) < 130;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? `rgb(${accent2})` : `rgba(${accent},0.85)`;
        ctx.fill();
        if (n.label && (near || n.r > 2.6)) {
          ctx.font = '10px var(--font-jetbrains), monospace';
          ctx.fillStyle = near ? `rgba(${accent2},0.9)` : 'rgba(150,161,175,0.55)';
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,140,255,0.5)';
        ctx.fill();
      }
    } else {
      draw();
    }

    return () => {
      window.removeEventListener('resize', layout);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      themeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} aria-hidden="true" />;
}
