import Image from 'next/image';
import Link from 'next/link';
import GitHubRepos from '@/components/GitHubRepos';
import { FeaturedShowcase, HomeHero } from '@/components/portfolio/HomeExperience';

export default function Home() {
  return (
    <main id="main">
      <HomeHero />

      <section className="selected-section section" id="selected-work" aria-labelledby="selected-title"><div className="shell">
        <div className="section-head reveal"><div><p className="eyebrow">01 / FEATURED WORK</p><h2 id="selected-title">Featured <em>projects.</em></h2></div><p>Three projects covering crop health, online learning, and Filipino recipes.</p></div>
        <FeaturedShowcase />
      </div></section>

      <section className="profile-preview-section section" aria-labelledby="profile-preview-title"><div className="shell profile-preview-grid">
        <div className="profile-preview-image reveal"><Image src="/imgs/ex3.jpg" alt="Bernard with colleagues during his internship" fill sizes="(max-width: 760px) 88vw, 46vw"/><span>FIELD RECORD / AP GLOBAL IT SOLUTIONS</span></div>
        <div className="profile-preview-copy reveal"><p className="eyebrow">02 / ABOUT ME</p><h2 id="profile-preview-title">About<br/><em>me.</em></h2><p>I&apos;m a 2026 Computer Science graduate from Holy Cross College, Pampanga. I build websites, mobile apps, and the systems behind them.</p><div className="preview-metrics"><div><strong>03</strong><span>WORK EXPERIENCES</span></div><div><strong>08</strong><span>PROJECTS</span></div></div><Link className="button button-dark" href="/profile">View my profile <span aria-hidden="true">↗</span></Link></div>
      </div></section>

      <section className="systems-preview-section section shell" aria-labelledby="systems-preview-title">
        <div className="section-head reveal"><div><p className="eyebrow">03 / SKILLS &amp; TOOLS</p><h2 id="systems-preview-title">Skills and<br/><em>tools.</em></h2></div><p>I work with front-end development, mobile apps, databases, and deployment.</p></div>
        <div className="systems-preview-grid">
          <Link className="system-preview tilt-card reveal" href="/systems#interface"><span>01 / WEB</span><strong>Web development</strong><small>React · Next.js · TypeScript</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#mobile"><span>02 / MOBILE</span><strong>Mobile development</strong><small>Flutter · Dart · Android &amp; iOS</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#data"><span>03 / BACK END</span><strong>Backend &amp; databases</strong><small>Prisma · MySQL · PostgreSQL</small><b aria-hidden="true">↗</b></Link>
          <Link className="system-preview tilt-card reveal" href="/systems#workflow"><span>04 / WORKFLOW</span><strong>Workflow &amp; machine learning</strong><small>TensorFlow · Git · Deployment</small><b aria-hidden="true">↗</b></Link>
        </div>
      </section>

      <GitHubRepos />

      <section className="contact-preview-section"><div className="shell contact-preview-inner reveal"><p className="eyebrow">05 / CONTACT</p><h2>Want to work<br/><em>together?</em></h2><div><p>I&apos;m open to projects, collaborations, and job opportunities.</p><Link className="button button-lime" href="/contact">Contact me <span aria-hidden="true">↗</span></Link></div></div></section>
    </main>
  );
}
