'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio';

type Filter = 'all' | 'web' | 'mobile';
type View = 'grid' | 'list' | 'compact' | 'spotlight' | 'editorial';

const VIEWS: { id: View; label: string }[] = [
  { id: 'grid', label: 'Grid layout' },
  { id: 'list', label: 'List layout' },
  { id: 'compact', label: 'Compact layout' },
  { id: 'spotlight', label: 'Spotlight layout' },
  { id: 'editorial', label: 'Editorial layout' },
];

export default function WorkArchive() {
  const [filter, setFilter] = useState<Filter>('all');
  const [view, setView] = useState<View>('grid');
  const visible = PORTFOLIO_PROJECTS.filter((project) => filter === 'all' || project.category === filter);
  const counts = {
    all: PORTFOLIO_PROJECTS.length,
    web: PORTFOLIO_PROJECTS.filter((project) => project.category === 'web').length,
    mobile: PORTFOLIO_PROJECTS.filter((project) => project.category === 'mobile').length,
  };

  return (
    <>
      <div className="archive-toolbar">
        <div className="filter-group" role="group" aria-label="Filter projects">
          {(['all', 'web', 'mobile'] as Filter[]).map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item[0].toUpperCase() + item.slice(1)} <span>{String(counts[item]).padStart(2, '0')}</span></button>)}
        </div>
        <div className="view-group" role="group" aria-label="Project layout">
          {VIEWS.map((item) => <button key={item.id} type="button" aria-label={item.label} title={item.label} aria-pressed={view === item.id} onClick={() => setView(item.id)}><span className={`view-icon icon-${item.id}`} aria-hidden="true"></span></button>)}
        </div>
      </div>
      <div className="project-grid" data-view-mode={view}>
        {visible.map((project, index) => (
          <Link key={project.slug} className={`project-card tilt-card ${project.category === 'mobile' ? 'is-mobile' : 'is-web'}${index === 0 ? ' is-featured' : ''}`} href={`/projects/${project.slug}`} aria-label={`View details for ${project.title}`}>
            <span className="project-card-visual"><Image src={project.previewImage} alt={`${project.title} project preview`} fill sizes="(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 32vw"/></span>
            <span className="project-card-copy"><small>{project.number} / {project.categoryLabel}</small><strong>{project.title}</strong><span>{project.short} <b aria-hidden="true">↗</b></span></span>
          </Link>
        ))}
      </div>
    </>
  );
}
