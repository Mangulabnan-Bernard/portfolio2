'use client';

import { useState } from 'react';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import ProjectCard from '@/components/ui/ProjectCard';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROJECTS } from '@/lib/projects';

type ProjectsProps = {
  summary?: boolean;
};

type ProjectFilter = 'all' | 'web' | 'mobile';

const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile app' },
];

export default function Projects({ summary = false }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const visibleProjects = summary ? PROJECTS.slice(0, 3) : PROJECTS;
  const filteredProjects = summary
    ? visibleProjects
    : visibleProjects.filter((project) => filter === 'all' || project.category === filter);

  return (
    <Section id="projects">
      <SectionHeader label={summary ? 'Selected Projects' : 'Portfolio'} title="Notable Projects_" />
      {!summary && (
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
                filter === item.id
                  ? 'border-teal bg-teal text-bg'
                  : 'border-border bg-surface text-text-2 hover:border-teal/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <RevealSection className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </RevealSection>

      {!summary && (
        <RevealSection className="project-highlights mt-10 grid grid-cols-1 gap-6">
          <div className="featured-project bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
            <div className="font-mono text-[11px] tracking-[0.18em] text-teal uppercase mb-3">Project Spotlight</div>
            <h3 className="text-text text-[1.45rem] font-semibold mb-4">SmartGrow — AI Crop Health System</h3>
            <p className="text-text-2 text-[0.95rem] leading-[1.8] mb-4">
              A mobile-first agriculture app that helps farmers detect crop disease using offline TensorFlow Lite models and cloud AI support. It delivers quick guidance, progress tracking, and harvest management from one experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-text-2 text-[0.88rem]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal mb-2">Challenge</div>
                <p>Trusted crop diagnosis and recommendations for rural farmers even with limited internet access.</p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal mb-2">Solution</div>
                <p>Hybrid AI design with offline inference, farm analytics, and a polished mobile experience.</p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal mb-2">Impact</div>
                <p>Improved usability for real growers and supported evidence-based crop care decisions.</p>
              </div>
            </div>
          </div>
        </RevealSection>
      )}

      {summary && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            Explore More Projects
          </Link>
        </div>
      )}
    </Section>
  );
}
