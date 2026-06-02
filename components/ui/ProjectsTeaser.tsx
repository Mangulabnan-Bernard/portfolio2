'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectCover from '@/components/ui/ProjectCover';
import { PROJECTS, type Project, type ProjectLink } from '@/lib/projects';

function findLive(p: Project) {
  return p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
}

function renderLink(link: ProjectLink, i: number) {
  if (link.type === 'soon') {
    return (
      <span key={i} className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 border border-border text-muted rounded-[6px] opacity-70">
        {link.label}
      </span>
    );
  }
  if (link.type === 'live') {
    return (
      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 bg-teal/8 border border-teal-3 text-teal no-underline rounded-[6px] transition-colors hover:bg-teal/15">
        {link.label ?? '↗ Live Site'}
      </a>
    );
  }
  return (
    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 border border-border text-text-2 no-underline rounded-[6px] transition-colors hover:border-teal-3 hover:text-teal">
      GitHub
    </a>
  );
}

export default function ProjectsTeaser() {
  const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
  const others = PROJECTS.filter((p) => p.title !== featured.title).slice(0, 4);

  const [activeTitle, setActiveTitle] = useState(featured.title);
  const active = PROJECTS.find((p) => p.title === activeTitle) ?? featured;
  const live = findLive(active);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-stretch">
      {/* Left preview — reflects the hovered project (defaults to featured) */}
      <div className="bg-surface border border-border rounded-[16px] overflow-hidden flex flex-col">
        <div key={active.title} className="animate-fade-soft flex flex-col flex-1">
          <ProjectCover
            title={active.title}
            badge={active.badge}
            accent={active.accent}
            image={active.image}
            liveUrl={live?.href}
            collage={active.images}
            hideTitle
            className="h-56 md:h-72"
          />
          <div className="p-6 flex flex-col flex-1">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: active.accent }}>
              {active.badge}
            </div>
            <h3 className="font-mono text-[1.2rem] font-bold text-text mb-2">{active.title}</h3>
            <p className="text-text-2 text-[13px] leading-[1.7] mb-4 line-clamp-3">{active.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {active.tech.slice(0, 4).map((t) => (
                <span key={t} className="font-mono text-[9px] tracking-[0.08em] px-2 py-1 bg-dim border border-border text-text-3 rounded-[4px] uppercase">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-auto flex gap-2 flex-wrap">{active.links.map(renderLink)}</div>
          </div>
        </div>
      </div>

      {/* Right list — hover to preview on the left */}
      <div className="flex flex-col gap-3" onMouseLeave={() => setActiveTitle(featured.title)}>
        {others.map((p) => {
          const isActive = p.title === active.title;
          return (
            <Link
              key={p.title}
              href="/projects"
              onMouseEnter={() => setActiveTitle(p.title)}
              onFocus={() => setActiveTitle(p.title)}
              className={`group flex items-center gap-3.5 rounded-[12px] p-3 no-underline transition-colors flex-1 border ${
                isActive ? 'border-teal bg-teal/8' : 'border-border bg-surface hover:border-teal-3'
              }`}
            >
              <div className="relative w-16 h-16 rounded-[10px] overflow-hidden shrink-0 border border-border">
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
              <span className={`transition-all ${isActive ? 'text-teal translate-x-0.5' : 'text-text-3 group-hover:text-teal'}`}>→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
