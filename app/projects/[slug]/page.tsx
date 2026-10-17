import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioProject, PORTFOLIO_PROJECTS } from '@/lib/portfolio';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: 'article', url: `/projects/${slug}` },
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();
  const images = project.images?.length ? project.images : [project.previewImage];
  const liveLinks = project.links.filter((link) => link.type !== 'soon');

  return (
    <main id="main" className="project-case-page">
      <section className="detail-view"><div className="shell">
        <div className="detail-topbar"><Link className="detail-back" href="/work">← ALL PROJECTS</Link><span className="detail-count">{project.number} / 08</span><Link className="detail-close" href="/work">CLOSE ×</Link></div>
        <div className="detail-hero"><div className="detail-hero-copy"><p className="eyebrow">{project.categoryLabel} / PROJECT</p><h1>{project.title}</h1><p>{project.short}</p></div><div className={`detail-hero-visual${project.category === 'mobile' ? ' is-mobile' : ''}`}><Image src={project.previewImage} alt={`${project.title} project preview`} fill sizes="(max-width: 760px) 92vw, 46vw" priority/></div></div>
        <div className="detail-body"><div><p className="eyebrow">ABOUT</p><h2>About the project.</h2><p>{project.description}</p></div><div className="detail-meta"><div><h3>PROJECT TYPE</h3><span>{project.discipline}</span></div><div><h3>TOOLS &amp; TECHNOLOGY</h3><div className="tag-row">{project.tech.map((item) => <span key={item}>{item}</span>)}</div></div>{liveLinks.length > 0 && <div><h3>PROJECT LINKS</h3><div className="detail-links">{liveLinks.map((link) => link.type === 'download' ? <a key={link.href} href={link.href} download>{link.label ?? 'Download'} ↗</a> : <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.type === 'github' ? 'Source code' : link.label ?? 'Visit website'} ↗</a>)}</div></div>}</div></div>
        <div className="detail-gallery"><div className="detail-gallery-header"><div><p className="eyebrow">SCREENSHOTS</p><h2>Project screenshots.</h2></div><span>{String(images.length).padStart(2, '0')} IMAGES</span></div><div className="detail-gallery-thumbs project-detail-static-gallery" role="list" aria-label={`${project.title} screenshots`}>{images.map((image, index) => <a href={image} target="_blank" rel="noopener noreferrer" key={image} role="listitem" aria-label={`Open ${project.title} image ${index + 1}`}><Image src={image} alt={`${project.title} screenshot ${index + 1}`} fill sizes="(max-width: 760px) 44vw, 24vw"/></a>)}</div></div>
        <section className="page-next"><p className="eyebrow">BACK TO PROJECTS</p><h2>View more<br/><em>projects.</em></h2><Link className="button button-dark" href="/work">View all projects <span aria-hidden="true">↗</span></Link></section>
      </div></section>
    </main>
  );
}
