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
      <section className="page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 01 / PROJECT ARCHIVE <span className="intro-side">WEB / MOBILE / ML</span></p><h1>Selected<br/><em>work.</em></h1><div className="intro-bottom"><p>Eight real projects across web, mobile, and machine learning. Open one to explore its complete record.</p><span>08 / SELECTED PROJECTS</span></div></section>
      <section className="archive-section shell" aria-labelledby="archive-title"><div className="archive-heading"><div><p className="eyebrow">THE COLLECTION</p><h2 id="archive-title">Explore the archive.</h2></div><p>Filter the work, choose a layout, and open any project for its complete record.</p></div><WorkArchive/></section>
      <section className="page-next shell"><p className="eyebrow">NEXT / THE PERSON</p><h2>Curious who<br/><em>built the work?</em></h2><Link className="button button-dark" href="/profile">Explore the profile <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
