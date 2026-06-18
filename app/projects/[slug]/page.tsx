import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectCover from '@/components/ui/ProjectCover';
import ScreenshotGallery from '@/components/ui/ScreenshotGallery';
import {
  PROJECTS,
  getProjectBySlug,
  projectSlug,
  type Project,
  type ProjectLink,
} from '@/lib/projects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render a static page for every project at build time.
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found — Bernard C. Mangulabnan' };

  const title = `${project.title} — Bernard C. Mangulabnan`;
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

const linkBase =
  'inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] px-5 py-2.5 rounded-[8px] no-underline transition-all';
const linkPrimary = `${linkBase} bg-teal text-bg font-bold hover:bg-teal-hover`;
const linkOutline = `${linkBase} border border-teal-3 text-teal hover:border-teal hover:bg-teal/8`;
const linkMuted = `${linkBase} border border-border text-muted opacity-70`;

function renderLink(link: ProjectLink, i: number) {
  if (link.type === 'soon') {
    return (
      <span key={i} className={linkMuted}>
        {link.label}
      </span>
    );
  }
  if (link.type === 'live') {
    return (
      <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={linkPrimary}>
        {link.label ?? 'Visit Live Site'}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }
  if (link.type === 'download') {
    return (
      <a key={i} href={link.href} download className={linkPrimary}>
        {link.label ?? 'Download'}
      </a>
    );
  }
  return (
    <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className={linkOutline}>
      View on GitHub
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const live = project.links.find(
    (l): l is Extract<ProjectLink, { type: 'live' }> => l.type === 'live'
  );

  // Sibling projects for prev/next navigation at the foot of the page.
  const index = PROJECTS.findIndex((p) => p === project);
  const prev: Project | undefined = PROJECTS[index - 1];
  const next: Project | undefined = PROJECTS[index + 1];

  return (
    <main className="relative z-10 pt-[60px]">
      <article className="max-w-[920px] mx-auto px-8 py-16 md:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-text-2 no-underline transition-colors hover:text-teal mb-10"
        >
          <span aria-hidden="true">←</span> Back to Projects
        </Link>

        <div
          className="font-mono text-[11px] tracking-[0.18em] uppercase mb-4"
          style={{ color: project.accent ?? 'var(--color-teal)' }}
        >
          {project.badge}
        </div>
        <h1 className="font-mono text-[clamp(1.9rem,4vw,2.8rem)] font-bold text-text leading-[1.15] mb-6">
          {project.title}
        </h1>
        <p className="max-w-[680px] text-text-2 text-[1.02rem] leading-[1.85] mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-12">{project.links.map(renderLink)}</div>

        <div className="rounded-[16px] overflow-hidden border border-border mb-12">
          <ProjectCover
            title={project.title}
            badge={project.badge}
            accent={project.accent}
            image={project.image}
            liveUrl={live?.href}
            collage={project.images}
            hideTitle
            className="h-64 md:h-96"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-[200px_1fr]">
          <aside className="md:border-r md:border-border md:pr-8">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-teal-3 uppercase mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 bg-dim border border-border text-text-3 rounded-[5px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-teal-3 uppercase mt-8 mb-4">
              Category
            </h2>
            <span className="font-mono text-[12px] text-text-2 capitalize">{project.category}</span>
          </aside>

          <div>
            {project.images && project.images.length > 0 && (
              <>
                <h2 className="font-mono text-[11px] tracking-[0.2em] text-teal-3 uppercase mb-4">
                  Screenshots
                </h2>
                <ScreenshotGallery
                  images={project.images}
                  label={project.title}
                  accent={project.accent}
                />
              </>
            )}
          </div>
        </div>

        {/* Prev / next */}
        <nav className="mt-16 pt-8 border-t border-border flex justify-between gap-4 font-mono text-[12px]">
          {prev ? (
            <Link href={`/projects/${projectSlug(prev)}`} className="group max-w-[45%] no-underline">
              <span className="block text-muted mb-1">← Previous</span>
              <span className="text-text-2 group-hover:text-teal transition-colors line-clamp-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${projectSlug(next)}`}
              className="group max-w-[45%] text-right no-underline"
            >
              <span className="block text-muted mb-1">Next →</span>
              <span className="text-text-2 group-hover:text-teal transition-colors line-clamp-1">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
}
