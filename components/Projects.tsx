import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import ProjectsExplorer from '@/components/ui/ProjectsExplorer';
import ProjectsTeaser from '@/components/ui/ProjectsTeaser';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

type ProjectsProps = {
  summary?: boolean;
};

export default function Projects({ summary = false }: ProjectsProps) {
  // Home page teaser: a featured preview that updates as you hover the list.
  if (summary) {
    return (
      <Section id="projects">
        <SectionHeader label="Selected Projects" number="04" title="Notable Projects_" />
        <RevealSection>
          <ProjectsTeaser />
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
