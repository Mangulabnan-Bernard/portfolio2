'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectCover from '@/components/ui/ProjectCover';
import ScreenshotGallery from '@/components/ui/ScreenshotGallery';
import { PROJECTS, projectSlug, type Project, type ProjectLink } from '@/lib/projects';

type FilterId = 'all' | 'web' | 'mobile';
type LayoutId = 'explorer' | 'compact' | 'spotlight' | 'list' | 'story' | 'grid' | 'stacked';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile app' },
];

const LAYOUTS: { id: LayoutId; label: string }[] = [
  { id: 'explorer', label: 'Explorer' },
  { id: 'compact', label: 'Compact' },
  { id: 'spotlight', label: 'Spotlight' },
  { id: 'list', label: 'List' },
  { id: 'story', label: 'Story' },
  { id: 'grid', label: 'Grid' },
  { id: 'stacked', label: 'Stacked' },
];

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
  if (link.type === 'download') {
    return (
      <a key={i} href={link.href} download className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 bg-teal/8 border border-teal-3 text-teal no-underline rounded-[6px] transition-colors hover:bg-teal/15">
        {link.label ?? '↓ Download'}
      </a>
    );
  }
  return (
    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 border border-border text-text-2 no-underline rounded-[6px] transition-colors hover:border-teal-3 hover:text-teal">
      GitHub
    </a>
  );
}

function LinksRow({ project }: { project: Project }) {
  return (
    <div className="flex gap-2 flex-wrap">
      <Link
        href={`/projects/${projectSlug(project)}`}
        className="font-mono text-[10px] tracking-[0.08em] px-3 py-1.5 bg-teal text-bg font-bold no-underline rounded-[6px] transition-colors hover:bg-teal-hover"
      >
        Case study →
      </Link>
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
    case 'compact':
      return (
        <svg {...common}><rect x="1.5" y="2" width="4.5" height="4.5" rx="1" /><path d="M7.5 3.2h7" /><path d="M7.5 5.4h5" /><rect x="1.5" y="9.5" width="4.5" height="4.5" rx="1" /><path d="M7.5 10.7h7" /><path d="M7.5 12.9h5" /></svg>
      );
    case 'spotlight':
      return (
        <svg {...common}><rect x="1.5" y="1.5" width="13" height="6.5" rx="1" /><rect x="1.5" y="10" width="3.6" height="4.5" rx="1" /><rect x="6.2" y="10" width="3.6" height="4.5" rx="1" /><rect x="10.9" y="10" width="3.6" height="4.5" rx="1" /></svg>
      );
    case 'list':
      return (
        <svg {...common}><path d="M2 4h12" /><path d="M2 8h12" /><path d="M2 12h12" /></svg>
      );
    case 'story':
      return (
        <svg {...common}><rect x="1.5" y="2.5" width="13" height="4.5" rx="1" /><rect x="1.5" y="9" width="13" height="4.5" rx="1" /></svg>
      );
    case 'grid':
      return (
        <svg {...common}><rect x="1.5" y="1.5" width="3" height="3" rx="0.5" /><rect x="6" y="1.5" width="3" height="3" rx="0.5" /><rect x="10.5" y="1.5" width="3" height="3" rx="0.5" /><rect x="1.5" y="6" width="3" height="3" rx="0.5" /><rect x="6" y="6" width="3" height="3" rx="0.5" /><rect x="10.5" y="6" width="3" height="3" rx="0.5" /><rect x="1.5" y="10.5" width="3" height="3" rx="0.5" /><rect x="6" y="10.5" width="3" height="3" rx="0.5" /><rect x="10.5" y="10.5" width="3" height="3" rx="0.5" /></svg>
      );
    case 'stacked':
      return (
        <svg {...common}><rect x="1.5" y="2" width="13" height="3.5" rx="1" /><rect x="1.5" y="6.5" width="13" height="3.5" rx="1" /><rect x="1.5" y="11" width="13" height="3.5" rx="1" /></svg>
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

  const summaryLabel = filter === 'all'
    ? `Showing ${projects.length} project${projects.length === 1 ? '' : 's'} across the portfolio`
    : `Showing ${projects.length} ${filter === 'web' ? 'web' : 'mobile'} project${projects.length === 1 ? '' : 's'}`;

  if (projects.length === 0) {
    return (
      <div className="rounded-[16px] border border-dashed border-border bg-surface p-8 text-center">
        <p className="font-mono text-[13px] font-semibold text-text mb-2">No projects match this filter.</p>
        <p className="text-text-2 text-[13px] leading-[1.7] mb-4">Try switching back to all projects to browse the full portfolio.</p>
        <button
          type="button"
          onClick={() => setFilter('all')}
          className="font-mono text-[11px] tracking-[0.08em] px-3.5 py-1.5 rounded-full border border-teal-3 bg-teal/8 text-teal cursor-pointer"
        >
          Show all projects
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted">{summaryLabel}</span>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-text-3">Web {count('web')} • Mobile {count('mobile')}</span>
      </div>

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
        {layout === 'compact' && <CompactLayout projects={projects} />}
        {layout === 'spotlight' && <SpotlightLayout projects={projects} />}
        {layout === 'list' && <HoverListLayout projects={projects} />}
        {layout === 'story' && <StoryLayout projects={projects} />}
        {layout === 'grid' && <GridLayout projects={projects} />}
        {layout === 'stacked' && <StackedLayout projects={projects} />}
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
          <ProjectCover title={active.title} badge={active.badge} accent={active.accent} image={active.image} liveUrl={live?.href} collage={active.images} hideTitle className="h-60 md:h-80" />
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

/* 2) Compact — horizontal cards: thumbnail + details (no overlap) */
function CompactLayout({ projects }: { projects: Project[] }) {
  const live = (p: Project) => p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {projects.map((p) => (
        <div
          key={p.title}
          className="group flex gap-4 min-h-[150px] bg-surface border border-border rounded-[14px] p-4 transition-colors hover:border-teal-3"
        >
          <div className="relative w-[120px] sm:w-[150px] shrink-0 rounded-[10px] overflow-hidden border border-border">
            <ProjectCover
              title={p.title}
              badge={p.badge}
              accent={p.accent}
              image={p.image}
              liveUrl={live(p)?.href}
              hideTitle
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="min-w-0 flex flex-col py-1">
            <h3 className="font-mono text-[14px] font-bold text-text mb-1.5 leading-snug">{p.title}</h3>
            <p className="text-text-2 text-[12px] leading-[1.6] mb-3 line-clamp-2">{p.description}</p>
            <div className="mt-auto">
              <LinksRow project={p} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 3) Spotlight — one large feature on top, the rest in a compact grid */
function SpotlightLayout({ projects }: { projects: Project[] }) {
  const live = (p: Project) => p.links.find((l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live');
  const [feature, ...rest] = projects;
  if (!feature) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Feature */}
      <div className="grid md:grid-cols-2 bg-surface border border-border rounded-[18px] overflow-hidden">
        <ProjectCover
          title={feature.title}
          badge={feature.badge}
          accent={feature.accent}
          image={feature.image}
          liveUrl={live(feature)?.href}
          collage={feature.images}
          hideTitle
          className="h-64 md:h-auto md:min-h-[320px]"
        />
        <div className="p-7 md:p-9 flex flex-col justify-center">
          <h3 className="font-mono text-[1.5rem] font-bold text-text mb-4">{feature.title}</h3>
          <p className="text-text-2 text-[0.95rem] leading-[1.8] mb-6">{feature.description}</p>
          <div className="mb-6"><TechTags tech={feature.tech} /></div>
          <LinksRow project={feature} />
        </div>
      </div>

      {/* The rest */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => (
            <ProjectCard key={p.title} project={{ ...p, featured: false }} />
          ))}
        </div>
      )}
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
            <ProjectCover title={p.title} badge={p.badge} accent={p.accent} image={p.image} liveUrl={live(p)?.href} collage={p.images} hideTitle className="h-56 md:h-72" />
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

/* 6) Grid — uniform card grid view */
function GridLayout({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  );
}

/* 7) Stacked — one project per row with a richer summary */
function StackedLayout({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p) => (
        <div key={p.title} className="group rounded-[16px] border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-teal-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-2">{p.badge}</div>
              <h3 className="font-mono text-[1.1rem] font-bold text-text mb-2">{p.title}</h3>
              <p className="text-text-2 text-[0.92rem] leading-[1.75]">{p.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] rounded-full border border-border px-3 py-1 text-text-3">{p.category}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] rounded-full border border-border px-3 py-1 text-text-3">{p.tech[0]}</span>
            </div>
          </div>
          <div className="mt-4"><LinksRow project={p} /></div>
        </div>
      ))}
    </div>
  );
}
