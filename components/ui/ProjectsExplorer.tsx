'use client';

import { useMemo, useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectCover from '@/components/ui/ProjectCover';
import ScreenshotGallery from '@/components/ui/ScreenshotGallery';
import { PROJECTS, type Project, type ProjectLink } from '@/lib/projects';

type FilterId = 'all' | 'web' | 'mobile';
type LayoutId = 'explorer' | 'bento' | 'carousel' | 'list' | 'story';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile app' },
];

const LAYOUTS: { id: LayoutId; label: string }[] = [
  { id: 'explorer', label: 'Explorer' },
  { id: 'bento', label: 'Bento' },
  { id: 'carousel', label: 'Carousel' },
  { id: 'list', label: 'List' },
  { id: 'story', label: 'Story' },
];

function renderLink(link: ProjectLink) {
  if (link.type === 'soon') {
    return (
      <span key={link.label} className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 border border-border text-muted rounded-[6px] opacity-70">
        {link.label}
      </span>
    );
  }
  if (link.type === 'live') {
    return (
      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 bg-teal/8 border border-teal-3 text-teal no-underline rounded-[6px] transition-colors hover:bg-teal/15">
        {link.label ?? '↗ Live Site'}
      </a>
    );
  }
  return (
    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 border border-border text-text-2 no-underline rounded-[6px] transition-colors hover:border-teal-3 hover:text-teal">
      GitHub
    </a>
  );
}

function LinksRow({ project }: { project: Project }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {project.links.map(renderLink)}
      {project.images && project.images.length > 0 && (
        <ScreenshotGallery images={project.images} label={project.title} accent={project.accent} />
      )}
    </div>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((tag) => (
        <span key={tag} className="font-mono text-[9px] tracking-[0.08em] px-2 py-1 bg-dim border border-border text-text-3 rounded-[4px] uppercase">
          {tag}
        </span>
      ))}
    </div>
  );
}

function LayoutIcon({ id }: { id: LayoutId }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (id) {
    case 'explorer':
      return (
        <svg {...common}><rect x="1.5" y="2.5" width="4.5" height="11" rx="1" /><rect x="8" y="2.5" width="6.5" height="11" rx="1" /></svg>
      );
    case 'bento':
      return (
        <svg {...common}><rect x="1.5" y="1.5" width="6" height="6" rx="1" /><rect x="9.5" y="1.5" width="5" height="5" rx="1" /><rect x="1.5" y="9.5" width="5" height="5" rx="1" /><rect x="9.5" y="8.5" width="5" height="6" rx="1" /></svg>
      );
    case 'carousel':
      return (
        <svg {...common}><rect x="5" y="3.5" width="6" height="9" rx="1" /><path d="M2.5 5.5 1 8l1.5 2.5" /><path d="M13.5 5.5 15 8l-1.5 2.5" /></svg>
      );
    case 'list':
      return (
        <svg {...common}><path d="M2 4h12" /><path d="M2 8h12" /><path d="M2 12h12" /></svg>
      );
    case 'story':
      return (
        <svg {...common}><rect x="1.5" y="2.5" width="13" height="4.5" rx="1" /><rect x="1.5" y="9" width="13" height="4.5" rx="1" /></svg>
      );
  }
}

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<FilterId>('all');
  const [layout, setLayout] = useState<LayoutId>('explorer');

  const projects = useMemo(
    () => PROJECTS.filter((p) => filter === 'all' || p.category === filter),
    [filter]
  );
  const count = (id: FilterId) => (id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length);

  return (
    <div>
      {/* Controls — filter on the left, layout icon switch on the right */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] px-3.5 py-1.5 rounded-full border cursor-pointer transition-colors ${
                filter === f.id ? 'bg-teal text-bg border-teal font-bold' : 'bg-surface text-text-2 border-border hover:border-teal-3'
              }`}
            >
              {f.label}
              <span className={`text-[9px] ${filter === f.id ? 'text-bg/70' : 'text-muted'}`}>{count(f.id)}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Layout">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLayout(l.id)}
              aria-pressed={layout === l.id}
              aria-label={l.label}
              title={l.label}
              className={`w-9 h-9 grid place-items-center rounded-[8px] border cursor-pointer transition-colors ${
                layout === l.id ? 'bg-teal text-bg border-teal' : 'bg-surface text-text-2 border-border hover:border-teal-3 hover:text-teal'
              }`}
            >
              <LayoutIcon id={l.id} />
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div key={layout} className="animate-fade">
        {layout === 'explorer' && <ExplorerLayout projects={projects} />}
        {layout === 'bento' && <BentoLayout projects={projects} />}
        {layout === 'carousel' && <CarouselLayout projects={projects} />}
        {layout === 'list' && <HoverListLayout projects={projects} />}
        {layout === 'story' && <StoryLayout projects={projects} />}
      </div>
    </div>
  );
}

/* 1) Explorer — selectable list + sticky preview */
function ExplorerLayout({ projects }: { projects: Project[] }) {
  const [activeTitle, setActiveTitle] = useState(projects[0]?.title);
  const active = projects.find((p) => p.title === activeTitle) ?? projects[0];
  if (!active) return null;
  const live = active.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,330px)_1fr] gap-6 items-start">
      <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
        {projects.map((p, i) => {
          const isActive = p.title === active.title;
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => setActiveTitle(p.title)}
              className={`shrink-0 lg:shrink min-w-[230px] lg:min-w-0 snap-start text-left rounded-[12px] border p-4 transition-all ${
                isActive ? 'border-teal bg-teal/8' : 'border-border bg-surface hover:border-teal-3 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[12px] font-bold mt-0.5" style={{ color: p.accent }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <div className="font-mono text-[13px] font-semibold text-text leading-snug truncate">{p.title}</div>
                  <div className="font-mono text-[10px] text-muted uppercase tracking-[0.1em] mt-1 truncate">{p.badge}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="lg:sticky lg:top-24">
        <div key={active.title} className="animate-fade bg-surface border border-border rounded-[16px] overflow-hidden">
          <ProjectCover title={active.title} badge={active.badge} accent={active.accent} image={active.image} liveUrl={live?.href} collage={active.images} className="h-60 md:h-80" />
          <div className="p-6 md:p-8">
            <h3 className="font-mono text-[1.4rem] md:text-[1.6rem] font-bold text-text mb-4">{active.title}</h3>
            <p className="text-text-2 text-[0.95rem] leading-[1.8] mb-6">{active.description}</p>
            <div className="mb-6"><TechTags tech={active.tech} /></div>
            <LinksRow project={active} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2) Bento — asymmetric image tiles */
function BentoLayout({ projects }: { projects: Project[] }) {
  const live = (p: Project) => p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] gap-4">
      {projects.map((p, i) => {
        const span = p.featured ? 'col-span-2 row-span-2' : i % 5 === 3 ? 'col-span-2' : '';
        return (
          <div key={p.title} className={`group relative rounded-[16px] overflow-hidden border border-border ${span}`}>
            <ProjectCover title={p.title} badge={p.badge} accent={p.accent} image={p.image} liveUrl={live(p)?.href} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="font-mono text-[13px] font-bold text-text leading-tight mb-2">{p.title}</h3>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity"><LinksRow project={p} /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 3) Carousel — horizontal snap of cards */
function CarouselLayout({ projects }: { projects: Project[] }) {
  return (
    <div className="flex gap-5 overflow-x-auto snap-x pb-4 -mx-6 px-6">
      {projects.map((p) => (
        <div key={p.title} className="shrink-0 w-[300px] sm:w-[330px] snap-start">
          <ProjectCard project={{ ...p, featured: false }} />
        </div>
      ))}
    </div>
  );
}

/* 4) List — minimal rows with a floating preview on hover */
function HoverListLayout({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState(projects[0]?.title);
  const active = projects.find((p) => p.title === hover) ?? projects[0];
  const live = (p: Project) => p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
  return (
    <div className="relative grid lg:grid-cols-[1fr_360px] gap-8 items-start">
      <div className="flex flex-col">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onMouseEnter={() => setHover(p.title)}
            onFocus={() => setHover(p.title)}
            onClick={() => { const l = live(p); if (l) window.open(l.href, '_blank'); }}
            className="group text-left border-b border-border py-5 transition-colors"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="flex-1 font-mono text-[1.3rem] md:text-[1.9rem] font-bold text-text-2 group-hover:text-teal transition-colors leading-tight">{p.title}</h3>
              <span className="font-mono text-[10px] text-muted uppercase tracking-[0.12em] hidden sm:block">{p.category}</span>
              <span className="text-text-3 group-hover:text-teal group-hover:translate-x-1 transition-all">↗</span>
            </div>
          </button>
        ))}
      </div>
      {active && (
        <div className="hidden lg:block lg:sticky lg:top-24">
          <div key={active.title} className="animate-fade rounded-[16px] overflow-hidden border border-border bg-surface">
            <ProjectCover title={active.title} badge={active.badge} accent={active.accent} image={active.image} liveUrl={live(active)?.href} collage={active.images} className="h-72" />
            <div className="p-5">
              <p className="text-text-2 text-[13px] leading-[1.7] mb-4 line-clamp-4">{active.description}</p>
              <LinksRow project={active} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 5) Story — alternating scroll sections */
function StoryLayout({ projects }: { projects: Project[] }) {
  const live = (p: Project) => p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p, i) => (
        <div key={p.title} className="grid md:grid-cols-2 gap-6 md:gap-10 items-center bg-surface border border-border rounded-[16px] overflow-hidden p-5 md:p-7">
          <div className={`rounded-[12px] overflow-hidden ${i % 2 ? 'md:order-2' : ''}`}>
            <ProjectCover title={p.title} badge={p.badge} accent={p.accent} image={p.image} liveUrl={live(p)?.href} collage={p.images} className="h-56 md:h-72" />
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase mb-3" style={{ color: p.accent }}>{p.badge}</div>
            <h3 className="font-mono text-[1.4rem] font-bold text-text mb-3">{p.title}</h3>
            <p className="text-text-2 text-[0.95rem] leading-[1.8] mb-5">{p.description}</p>
            <div className="mb-5"><TechTags tech={p.tech} /></div>
            <LinksRow project={p} />
          </div>
        </div>
      ))}
    </div>
  );
}
