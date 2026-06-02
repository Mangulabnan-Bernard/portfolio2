import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import ProjectCover from '@/components/ui/ProjectCover';
import ProjectsExplorer from '@/components/ui/ProjectsExplorer';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { PROJECTS, type ProjectLink } from '@/lib/projects';

type ProjectsProps = {
  summary?: boolean;
};

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

export default function Projects({ summary = false }: ProjectsProps) {
  // Home page teaser: one featured project + a compact list of the rest.
  if (summary) {
    const featured = PROJECTS.find((p) => p.featured) ?? PROJECTS[0];
    const others = PROJECTS.filter((p) => p !== featured).slice(0, 4);
    const featuredLive = featured.links.find(
      (l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live'
    );

    return (
      <Section id="projects">
        <SectionHeader label="Selected Projects" title="Notable Projects_" />
        <RevealSection className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-stretch">
          {/* Featured */}
          <div className="group bg-surface border border-border rounded-[16px] overflow-hidden flex flex-col transition-colors hover:border-teal-3">
            <ProjectCover
              title={featured.title}
              badge={featured.badge}
              accent={featured.accent}
              image={featured.image}
              liveUrl={featuredLive?.href}
              collage={featured.images}
              hideTitle
              className="h-56 md:h-72"
            />
            <div className="p-6 flex flex-col flex-1">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: featured.accent }}>
                {featured.badge}
              </div>
              <h3 className="font-mono text-[1.2rem] font-bold text-text mb-2">{featured.title}</h3>
              <p className="text-text-2 text-[13px] leading-[1.7] mb-4 line-clamp-3">{featured.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tech.slice(0, 4).map((t) => (
                  <span key={t} className="font-mono text-[9px] tracking-[0.08em] px-2 py-1 bg-dim border border-border text-text-3 rounded-[4px] uppercase">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex gap-2 flex-wrap">{featured.links.map(renderLink)}</div>
            </div>
          </div>

          {/* Side list */}
          <div className="flex flex-col gap-3">
            {others.map((p) => {
              const live = p.links.find(
                (l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live'
              );
              return (
                <Link
                  key={p.title}
                  href="/projects"
                  className="group flex items-center gap-3.5 bg-surface border border-border rounded-[12px] p-3 no-underline transition-colors hover:border-teal-3 flex-1"
                >
                  <div className="relative w-16 h-16 rounded-[10px] overflow-hidden shrink-0 border border-border">
                    <ProjectCover
                      title={p.title}
                      badge={p.badge}
                      accent={p.accent}
                      image={p.image}
                      liveUrl={live?.href}
                      hideBadge
                      hideTitle
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[13px] font-semibold text-text truncate">{p.title}</div>
                    <div className="font-mono text-[10px] text-muted uppercase tracking-[0.1em] truncate mt-0.5">{p.badge}</div>
                  </div>
                  <span className="text-text-3 group-hover:text-teal group-hover:translate-x-0.5 transition-all">→</span>
                </Link>
              );
            })}
          </div>
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
