'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { projectSlug, type Project, type ProjectLink } from '@/lib/projects';
import ProjectCover from '@/components/ui/ProjectCover';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const live = project.links.find(
    (l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live'
  );

  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${py * -6}deg) translateY(-4px)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
  };

  return (
    <Link
      ref={cardRef}
      href={`/projects/${projectSlug(project)}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className={`project-card group relative block overflow-hidden rounded-[14px] border border-border bg-surface no-underline transform-gpu [transition:transform_0.25s_ease,border-color_0.25s_ease] hover:border-teal-3 ${
        project.featured ? 'lg:col-span-2 aspect-[16/11]' : 'aspect-[3/4]'
      }`}
    >
      <ProjectCover
        title={project.title}
        badge={project.badge}
        accent={project.accent}
        image={project.image}
        liveUrl={live?.href}
        collage={project.images}
        hideTitle
        hideBadge
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg from-10% via-bg/25 via-45% to-transparent" />
      <div
        className="absolute top-3 left-3 z-10 font-mono text-[9px] tracking-[0.08em] px-2 py-1 rounded-[6px] uppercase backdrop-blur-sm"
        style={{ background: `${project.accent ?? '#7c8cff'}24`, border: `1px solid ${project.accent ?? '#7c8cff'}45`, color: project.accent ?? '#7c8cff' }}
      >
        {project.badge}
      </div>
      <div className="absolute left-0 right-0 bottom-0 z-10 p-5">
        <div className={`font-sans font-bold text-text leading-[1.15] mb-1 ${project.featured ? 'text-[1.4rem]' : 'text-[0.95rem]'}`}>
          {project.title}
        </div>
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-teal-2 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          Case study →
        </span>
      </div>
    </Link>
  );
}
