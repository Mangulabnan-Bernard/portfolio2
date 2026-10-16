'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio';

const FEATURED_SLUGS = [
  'smart-grow-ai-crop-health-monitor',
  'devpath-hub-guided-learning-platform',
  'anong-ulam-today-filipino-recipe-helper',
];

export function HomeHero() {
  const [portrait, setPortrait] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setPortrait((value) => (value + 1) % 2), 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line"></span> INDEPENDENT DEVELOPER <span className="availability-dot"></span> OPEN TO OPPORTUNITIES</p>
        <h1 id="hero-title">Building for<br/><span className="hero-heading-accent">what&apos;s next<span className="hero-period">.</span></span></h1>
        <p className="hero-lead">I&apos;m Bernard Mangulabnan. I create thoughtful web and mobile products where good engineering meets a clear, human experience.</p>
        <div className="hero-actions"><Link className="button button-lime" href="/work">Explore selected work <span aria-hidden="true">↗</span></Link><Link className="text-action" href="/profile">Meet the developer <span aria-hidden="true">↗</span></Link></div>
      </div>
      <div className="hero-stage" aria-label="Portraits of Bernard">
        <div className="stage-grid" aria-hidden="true"></div><div className="stage-orbit" aria-hidden="true"></div>
        <div className="stage-card">
          <Image className={`stage-portrait${portrait === 0 ? ' is-active' : ''}`} src="/imgs/ber2.png" alt="Bernard standing by the water" fill sizes="(max-width: 760px) 90vw, 42vw" priority/>
          <Image className={`stage-portrait${portrait === 1 ? ' is-active' : ''}`} src="/imgs/ber1.png" alt="Bernard seated outdoors" fill sizes="(max-width: 760px) 90vw, 42vw"/>
          <span className="stage-overlay" aria-hidden="true"></span>
        </div>
        <span className="stage-coordinate stage-coordinate-bottom">PORTRAIT / <b>{String(portrait + 1).padStart(2, '0')} / 02</b></span>
        <span className="stage-cross stage-cross-a" aria-hidden="true">+</span><span className="stage-cross stage-cross-b" aria-hidden="true">+</span>
      </div>
      <div className="hero-bar"><span><b>01</b> DESIGN &amp; CODE</span><span><b>02</b> WEB &amp; MOBILE</span><span><b>03</b> PAMPANGA, PH</span><a href="#selected-work">SCROLL TO EXPLORE ↓</a></div>
    </section>
  );
}

export function FeaturedShowcase() {
  const projects = FEATURED_SLUGS.map((slug) => PORTFOLIO_PROJECTS.find((project) => project.slug === slug)!).filter(Boolean);
  const [active, setActive] = useState(projects[0]?.slug ?? '');

  return (
    <div className="selected-list selected-showcase">
      {projects.map((project) => {
        const open = active === project.slug;
        return (
          <Link
            key={project.slug}
            className={`selected-row selected-row-expandable reveal${project.category === 'mobile' ? ' selected-row-mobile' : ''}${open ? ' is-active' : ''}`}
            aria-expanded={open}
            href={`/projects/${project.slug}`}
            onClick={(event) => { if (!open) { event.preventDefault(); setActive(project.slug); } }}
          >
            <span className="selected-row-index">{project.number}</span><strong>{project.title}</strong><small>{project.categoryLabel}</small><b aria-hidden="true">↗</b>
            <span className="selected-row-expansion">
              <span className="selected-row-visual"><Image src={project.previewImage} alt={`${project.title} project preview`} fill sizes="(max-width: 760px) 88vw, 42vw"/></span>
              <span className="selected-row-detail"><span className="eyebrow">{project.short.toUpperCase()}</span><span className="selected-row-summary">{project.description}</span><span className="selected-row-tools">{project.tech.slice(0, 4).join(' · ').toUpperCase()}</span><span className="selected-row-open">EXPLORE FULL PROJECT <b aria-hidden="true">↗</b></span></span>
            </span>
          </Link>
        );
      })}
      <Link className="selected-row selected-row-all reveal" href="/work"><span>→</span><strong>See all eight projects</strong><small>FULL WORK ARCHIVE</small><b aria-hidden="true">↗</b></Link>
    </div>
  );
}
