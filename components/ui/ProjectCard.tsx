import type { Project } from '@/lib/projects';

const linkClass =
  'project-link font-mono text-[10px] tracking-[0.08em] px-3 py-1 border border-border text-text-2 no-underline rounded-[6px] transition-colors hover:border-teal-3 hover:text-teal';

const linkLiveClass =
  'project-link live font-mono text-[10px] tracking-[0.08em] px-3 py-1 bg-teal/8 border border-teal-3 text-teal no-underline rounded-[6px] transition-colors hover:bg-teal/15';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardClass = project.featured
    ? 'project-card border border-teal/25 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-teal)_4%,transparent),var(--color-surface))] rounded-[14px] p-7 flex flex-col lg:col-span-3 transition-colors hover:border-teal/40 hover:-translate-y-0.5'
    : 'project-card bg-surface border border-border rounded-[14px] p-7 flex flex-col transition-colors hover:border-teal-3 hover:-translate-y-0.5';

  return (
    <div className={cardClass}>
      <span className="project-badge font-mono text-[9px] tracking-[0.15em] px-2 py-1 bg-teal/10 border border-teal/20 text-teal rounded-[20px] uppercase mb-4 self-start">
        {project.badge}
      </span>
      <div className="project-title font-mono text-[1.05rem] font-bold text-text mb-3">
        {project.title}
      </div>
      <p className="project-desc text-[13px] text-text-2 leading-[1.75] mb-5 flex-1">
        {project.description}
      </p>
      <div className="project-tech flex flex-wrap gap-2 mb-5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="tech-tag font-mono text-[9px] tracking-[0.08em] px-2 py-1 bg-dim border border-border text-text-3 rounded-[4px] uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="project-links flex gap-2 flex-wrap">
        {project.links.map((link) => {
          if (link.type === 'soon') {
            return (
              <span
                key={link.label}
                className="project-link font-mono text-[10px] tracking-[0.08em] px-3 py-1 border border-border text-muted rounded-[6px] opacity-70"
              >
                {link.label}
              </span>
            );
          }

          if (link.type === 'live') {
            return (
              <a
                key={link.href}
                className={linkLiveClass}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label ?? '↗ Live Site'}
              </a>
            );
          }

          return (
            <a
              key={link.href}
              className={linkClass}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          );
        })}
      </div>
    </div>
  );
}
