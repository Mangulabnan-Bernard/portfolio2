'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProjectCover from '@/components/ui/ProjectCover';
import { PROJECTS, projectSlug, type Project, type ProjectLink } from '@/lib/projects';

function findLive(p: Project) {
  return p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
}

export default function ProjectsTeaser() {
  // Ordered queue — index 0 is the one shown on the left.
  const [order, setOrder] = useState<Project[]>(PROJECTS);
  const active = order[0];
  const rest = order.slice(1);
  const live = findLive(active);

  // Click a project → it moves to the front (left preview); the previously
  // shown one rotates to the end of the list.
  const select = (title: string) => {
    setOrder((prev) => {
      if (prev[0].title === title) return prev;
      const clicked = prev.find((p) => p.title === title);
      if (!clicked) return prev;
      const oldActive = prev[0];
      const middle = prev.slice(1).filter((p) => p.title !== title);
      return [clicked, ...middle, oldActive];
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-start">
      {/* Left preview — the selected project, poster-style */}
      <Link
        href={`/projects/${projectSlug(active)}`}
        className="group relative block aspect-[4/3] rounded-[16px] overflow-hidden border border-border no-underline"
      >
        <div key={active.title} className="animate-fade-soft absolute inset-0">
          <ProjectCover
            title={active.title}
            badge={active.badge}
            accent={active.accent}
            image={active.image}
            liveUrl={live?.href}
            collage={active.images}
            hideTitle
            hideBadge
            className="absolute inset-0 w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg from-10% via-bg/25 via-45% to-transparent" />
        <div
          className="absolute top-3 left-3 z-10 font-mono text-[9px] tracking-[0.08em] px-2 py-1 rounded-[6px] uppercase backdrop-blur-sm"
          style={{ background: `${active.accent ?? '#7c8cff'}24`, border: `1px solid ${active.accent ?? '#7c8cff'}45`, color: active.accent ?? '#7c8cff' }}
        >
          {active.badge}
        </div>
        <div className="absolute left-0 right-0 bottom-0 z-10 p-6">
          <h3 className="font-sans text-[1.4rem] font-bold text-text mb-1.5">{active.title}</h3>
          <p className="text-text-2 text-[13px] leading-[1.7] mb-3 line-clamp-2 max-w-[46ch]">{active.description}</p>
          <span className="font-mono text-[10.5px] tracking-[0.04em] text-teal-2 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
            Case study →
          </span>
        </div>
      </Link>

      {/* Right list — click to bring a project to the preview */}
      <div className="flex flex-col gap-2.5">
        {rest.map((p) => (
          <button
            key={p.title}
            type="button"
            onClick={() => select(p.title)}
            aria-label={`Show ${p.title}`}
            className="group flex items-center gap-3.5 rounded-[12px] p-3 border border-border bg-surface text-left cursor-pointer transition-all hover:border-teal-3 hover:-translate-y-0.5"
          >
            <div className="relative w-14 h-14 rounded-[10px] overflow-hidden shrink-0 border border-border">
              <ProjectCover
                title={p.title}
                badge={p.badge}
                accent={p.accent}
                image={p.image}
                liveUrl={findLive(p)?.href}
                hideBadge
                hideTitle
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-mono text-[13px] font-semibold text-text truncate">{p.title}</div>
              <div className="font-mono text-[10px] text-muted uppercase tracking-[0.1em] truncate mt-0.5">{p.badge}</div>
            </div>
            <span className="text-text-3 group-hover:text-teal transition-colors">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}
