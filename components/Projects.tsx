import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectsExplorer from '@/components/ui/ProjectsExplorer';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROJECTS } from '@/lib/projects';

type ProjectsProps = {
  summary?: boolean;
};

export default function Projects({ summary = false }: ProjectsProps) {
  // Home page: a short 3-card teaser. Full page: the interactive showcase.
  if (summary) {
    return (
      <Section id="projects">
        <SectionHeader label="Selected Projects" title="Notable Projects_" />
        <RevealSection className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </RevealSection>
        <div className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            Explore More Projects
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects">
      <SectionHeader label="Portfolio" title="Notable Projects_" />
      <RevealSection>
        <ProjectsExplorer />
      </RevealSection>
    </Section>
  );
}
