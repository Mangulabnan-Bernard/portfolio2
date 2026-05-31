import type { Project } from '@/lib/projects';

const linkClass =
  'project-link font-mono text-[10px] tracking-[0.08em] px-3 py-1 border border-[#1f3329] text-[#8ab8a0] no-underline rounded-[6px] transition-colors hover:border-[#00875c] hover:text-[#00e5a0]';

const linkLiveClass =
  'project-link live font-mono text-[10px] tracking-[0.08em] px-3 py-1 bg-[rgba(0,229,160,0.08)] border border-[#00875c] text-[#00e5a0] no-underline rounded-[6px] transition-colors hover:bg-[rgba(0,229,160,0.15)]';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardClass = project.featured
    ? 'project-card border border-[rgba(0,229,160,0.25)] bg-[linear-gradient(135deg,rgba(0,229,160,0.04),#131f18)] rounded-[14px] p-7 flex flex-col lg:col-span-3 transition-colors hover:border-[rgba(0,229,160,0.4)] hover:-translate-y-0.5'
    : 'project-card bg-[#131f18] border border-[#1f3329] rounded-[14px] p-7 flex flex-col transition-colors hover:border-[#00875c] hover:-translate-y-0.5';

  return (
    <div className={cardClass}>
      <span className="project-badge font-mono text-[9px] tracking-[0.15em] px-2 py-1 bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] text-[#00e5a0] rounded-[20px] uppercase mb-4 self-start">
        {project.badge}
      </span>
      <div className="project-title font-mono text-[1.05rem] font-bold text-[#d4f0e3] mb-3">
        {project.title}
      </div>
      <p className="project-desc text-[13px] text-[#8ab8a0] leading-[1.75] mb-5 flex-1">
        {project.description}
      </p>
      <div className="project-tech flex flex-wrap gap-2 mb-5">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="tech-tag font-mono text-[9px] tracking-[0.08em] px-2 py-1 bg-[#1e2e26] border border-[#1f3329] text-[#4d7a62] rounded-[4px] uppercase"
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
                className="project-link font-mono text-[10px] tracking-[0.08em] px-3 py-1 border border-[#1f3329] text-[#4d7a62] rounded-[6px] opacity-70"
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
