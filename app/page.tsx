import Image from 'next/image';
import Link from 'next/link';
import GitHubRepos from '@/components/GitHubRepos';
import { FeaturedShowcase, HomeHero } from '@/components/portfolio/HomeExperience';

export default function Home() {
  return (
    <main id="main">
      <HomeHero />

      <section className="selected-section section" id="selected-work" aria-labelledby="selected-title"><div className="shell">
        <div className="section-head reveal"><div><p className="eyebrow">01 / FEATURED WORK</p><h2 id="selected-title">Ideas made <em>real.</em></h2></div><p>A selection of products built for people, from crop health and learning to everyday services.</p></div>
        <FeaturedShowcase />
      </div></section>

      <section className="profile-preview-section section" aria-labelledby="profile-preview-title"><div className="shell profile-preview-grid">
        <div className="profile-preview-image reveal"><Image src="/imgs/ex3.jpg" alt="Bernard with colleagues during his internship" fill sizes="(max-width: 760px) 88vw, 46vw"/><span>FIELD RECORD / AP GLOBAL IT SOLUTIONS</span></div>
        <div className="profile-preview-copy reveal"><p className="eyebrow">02 / THE PERSON</p><h2 id="profile-preview-title">Curiosity,<br/>put to <em>work.</em></h2><p>I&apos;m a 2026 Computer Science graduate from Holy Cross College, Pampanga. I enjoy connecting clean interfaces with the systems behind them, and learning through the process of building.</p><div className="preview-metrics"><div><strong>03</strong><span>CHAPTERS OF EXPERIENCE</span></div><div><strong>08</strong><span>PROJECTS IN THE ARCHIVE</span></div></div><Link className="button button-dark" href="/profile">Explore my profile <span aria-hidden="true">↗</span></Link></div>
      </div></section>

      <section className="systems-preview-section section shell" aria-labelledby="systems-preview-title">
        <div className="section-head reveal"><div><p className="eyebrow">03 / SYSTEMS &amp; PRACTICE</p><h2 id="systems-preview-title">The thinking<br/>behind <em>the build.</em></h2></div><p>Four disciplines that come together to create useful, reliable digital experiences.</p></div>
        <div className="systems-preview-grid">
          <Link className="system-preview tilt-card reveal" href="/systems#interface"><span>01 / INTERFACE</span><strong>Web experiences</strong><small>React · Next.js · TypeScript</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#mobile"><span>02 / DEVICE</span><strong>Mobile products</strong><small>Flutter · Dart · Android &amp; iOS</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#data"><span>03 / ENGINE</span><strong>Data &amp; logic</strong><small>Prisma · MySQL · PostgreSQL</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#workflow"><span>04 / DELIVERY</span><strong>AI &amp; workflow</strong><small>TensorFlow · Git · Deployment</small><b aria-hidden="true">↗</b></Link>
        </div>
      </section>

      <GitHubRepos />

      <section className="contact-preview-section"><div className="shell contact-preview-inner reveal"><p className="eyebrow">05 / START A CONVERSATION</p><h2>Have an idea?<br/><em>Let&apos;s make it useful.</em></h2><div><p>A project, a role, a collaboration—I&apos;m open to the conversation.</p><Link className="button button-lime" href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
