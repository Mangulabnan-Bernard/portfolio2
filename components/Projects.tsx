import RevealSection from '@/components/RevealSection';
import ProjectCard from '@/components/ui/ProjectCard';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROJECTS } from '@/lib/projects';

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader label="Portfolio" title="Notable Projects_" />
      <RevealSection className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </RevealSection>
    </Section>
  );
}
