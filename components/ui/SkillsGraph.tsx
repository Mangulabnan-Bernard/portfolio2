'use client';

import { useEffect, useRef } from 'react';

type Skill = { name: string; slug?: string };
type SkillCategory = { key: string; title: string; items: Skill[] };

const COLOR_VARIABLES: Record<string, string> = {
  frontend: '--accent',
  mobile: '--accent-2',
  backend: '--accent-hover',
  ai: '--accent-3',
  tools: '--text-2',
};

function rgbVariable(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(value)?.[1];
  if (!hex) return fallback;
  const expanded = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  return `${parseInt(expanded.slice(0, 2), 16)},${parseInt(expanded.slice(2, 4), 16)},${parseInt(expanded.slice(4, 6), 16)}`;
}

function clusterColors() {
  return Object.fromEntries(
    Object.entries(COLOR_VARIABLES).map(([key, variable]) => [key, rgbVariable(variable, '124,140,255')])
  ) as Record<string, string>;
}

const MIN_SPACING = 30;

type GraphNode = {
  x: number; y: number; cx: number; cy: number;
  vx: number; vy: number; r: number; color: string; cluster: string; label: string;
};

export default function SkillsGraph({ categories }: { categories: SkillCategory[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = canvas?.parentElement;
    if (!canvas || !panel) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0;
    let nodes: GraphNode[] = [];
    let centers: { x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let colors = clusterColors();

    const refreshPalette = () => {
      colors = clusterColors();
      nodes.forEach((node) => { node.color = colors[node.cluster] ?? colors.frontend; });
    };

    function layout() {
      if (!canvas || !panel) return;
      w = canvas.width = panel.offsetWidth;
      h = canvas.height = panel.offsetHeight;
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.34;
      centers = categories.map((_, i) => {
        const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
        return { x: cx + Math.cos(angle) * R, y: cy + Math.sin(angle) * R };
      });
      nodes = [];
      categories.forEach((cluster, ci) => {
        const color = colors[cluster.key] ?? colors.frontend;
        const center = centers[ci];
        // Spread items evenly around the cluster center on a ring, with a
        // little jitter, so they start separated instead of stacking.
        const n = cluster.items.length;
        cluster.items.forEach((item, ii) => {
          const a = (Math.PI * 2 * ii) / n + Math.random() * 0.4;
          const r = 34 + (ii % 2) * 20 + Math.random() * 10;
          nodes.push({
            x: center.x + Math.cos(a) * r,
            y: center.y + Math.sin(a) * r,
            cx: center.x, cy: center.y,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            r: 2.4 + Math.random() * 1.6,
            color,
            cluster: cluster.key,
            label: item.name,
          });
        });
      });
    }

    function onMove(e: MouseEvent) {
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    layout();
    window.addEventListener('resize', layout);
    panel.addEventListener('mousemove', onMove);
    panel.addEventListener('mouseleave', onLeave);
    const themeObserver = new MutationObserver(refreshPalette);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < centers.length; i++) {
        const next = centers[(i + 1) % centers.length];
        ctx.beginPath();
        ctx.moveTo(centers[i].x, centers[i].y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = 'rgba(150,161,175,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Gentle pull back toward the cluster center, so nodes wander but
      // don't drift off into other clusters.
      for (const n of nodes) {
        n.vx += (n.cx - n.x) * 0.0006;
        n.vy += (n.cy - n.y) * 0.0006;
      }

      // Hard repulsion between every pair that's gotten too close — this is
      // what keeps nodes from ever collapsing onto the same point.
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          if (dist < MIN_SPACING) {
            const push = ((MIN_SPACING - dist) / MIN_SPACING) * 0.5;
            const ux = dx / dist, uy = dy / dist;
            nodes[a].vx += ux * push;
            nodes[a].vy += uy * push;
            nodes[b].vx -= ux * push;
            nodes[b].vy -= uy * push;
          }
        }
      }

      for (const n of nodes) {
        n.vx *= 0.9;
        n.vy *= 0.9;
        n.x += n.vx;
        n.y += n.vy;
      }

      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          if (nodes[a].color !== nodes[b].color) continue;
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.strokeStyle = `rgba(${nodes[a].color},${(1 - dist / 95) * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Labels first (dim, always on) so hovered dots+labels paint over them.
      ctx.font = '9px var(--font-jetbrains), monospace';
      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dist < 90;
        if (near) continue;
        ctx.fillStyle = `rgba(${n.color},0.6)`;
        ctx.fillText(n.label, n.x + 7, n.y + 3);
      }

      for (const n of nodes) {
        const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dist < 90;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r * 1.9 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${near ? 1 : 0.85})`;
        ctx.fill();
        if (near) {
          ctx.font = "600 12px var(--font-jetbrains), monospace";
          const tw = ctx.measureText(n.label).width;
          ctx.fillStyle = 'rgba(8,11,18,0.75)';
          ctx.fillRect(n.x + 9, n.y - 9, tw + 8, 18);
          ctx.fillStyle = `rgba(${n.color},1)`;
          ctx.fillText(n.label, n.x + 13, n.y + 4);
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    }

    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      window.removeEventListener('resize', layout);
      panel.removeEventListener('mousemove', onMove);
      panel.removeEventListener('mouseleave', onLeave);
      themeObserver.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [categories]);

  return (
    <div className="relative h-[560px] md:h-[620px] bg-surface border border-border rounded-[14px] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      <div className="absolute bottom-3.5 right-4 font-mono text-[10px] text-muted hidden sm:block">hover a node to highlight it</div>
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-x-4 gap-y-2">
        {categories.map((c) => (
          <div key={c.key} className="flex items-center gap-2 font-mono text-[10.5px] text-text-2">
            <span className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: `var(${COLOR_VARIABLES[c.key] ?? '--accent'})` }} />
            {c.title}
          </div>
        ))}
      </div>
    </div>
  );
}
