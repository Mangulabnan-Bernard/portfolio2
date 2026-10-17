import type { Metadata } from 'next';
import Link from 'next/link';
import WorkArchive from '@/components/portfolio/WorkArchive';

export const metadata: Metadata = {
  title: 'Selected Work',
  description: 'Explore eight web, mobile, and machine-learning projects by Bernard Mangulabnan.',
};

export default function WorkPage() {
  return (
    <main id="main">
      <section className="page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 01 / PROJECTS <span className="intro-side">WEB / MOBILE / ML</span></p><h1>My<br/><em>projects.</em></h1><div className="intro-bottom"><p>Eight projects across web, mobile, and machine learning. Open any project to see its details.</p><span>08 / PROJECTS</span></div></section>
      <section className="archive-section shell" aria-labelledby="archive-title"><div className="archive-heading"><div><p className="eyebrow">ALL PROJECTS</p><h2 id="archive-title">Browse my projects.</h2></div><p>Filter by type, choose a layout, and open a project to learn more.</p></div><WorkArchive/></section>
      <section className="page-next shell"><p className="eyebrow">NEXT / PROFILE</p><h2>Want to know<br/><em>more about me?</em></h2><Link className="button button-dark" href="/profile">View my profile <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
