import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Meet Bernard Mangulabnan, a Computer Science graduate and full-stack web and mobile developer from Pampanga.',
};

const experiences = [
  { number: '01', period: 'FEB 2025 — JUN 2026', place: 'INDEPENDENT / REMOTE', eyebrow: 'FREELANCE', title: 'Web Developer', body: 'Built custom websites and web apps from design through deployment using Next.js, Tailwind CSS, and AI-assisted development tools.', tags: ['Next.js', 'Tailwind CSS', 'Web applications', 'Deployment'] },
  { number: '02', period: 'SEP 2025 — MAY 2026', place: 'AP GLOBAL IT SOLUTIONS / HYBRID', eyebrow: 'PART-TIME', title: 'Web Developer', body: 'Maintained internal systems, handled updates and data management, documented features, and led Flutter and Dart training sessions for teammates.', tags: ['System maintenance', 'Documentation', 'Flutter + Dart training'] },
  { number: '03', period: 'AUG 2025 — SEP 2025', place: 'AP GLOBAL IT SOLUTIONS / ONSITE', eyebrow: 'INTERNSHIP', title: 'Web Development Intern', body: 'Analyzed system architecture, rebuilt a functional replica with synthetic test data, documented workflows, and taught Next.js fundamentals to fellow interns.', tags: ['Next.js', 'Architecture', 'Workflow documentation', 'Peer teaching'] },
];

export default function ProfilePage() {
  return (
    <main id="main">
      <section className="page-intro profile-page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 02 / THE PERSON <span className="intro-side">SAN LUIS / PAMPANGA</span></p><h1>Always<br/><em>building.</em></h1><div className="intro-bottom"><p>I turn questions into products, and keep learning with every build.</p><span>PROFILE / BACKGROUND &amp; PRACTICE</span></div></section>

      <section className="profile-lead-section shell" aria-labelledby="profile-lead-title">
        <div className="profile-lead-photo reveal"><Image src="/imgs/ber1.png" alt="Bernard seated outdoors" fill sizes="(max-width: 760px) 90vw, 44vw"/><span>BERNARD / PAMPANGA, PH</span></div>
        <div className="profile-lead-copy reveal"><p className="eyebrow">01 / INTRODUCTION</p><h2 id="profile-lead-title">Hello, I&apos;m<br/><em>Bernard.</em></h2><p className="lead-text">I like making complex things feel simple to use.</p><p>I&apos;m Bernard C. Mangulabnan, a 2026 Computer Science graduate from Holy Cross College, Pampanga. My work spans responsive interfaces, back-end systems, and cross-platform apps.</p><p>I care about clear interfaces, maintainable code, and the details that make a product feel considered. I use AI-assisted tools in my workflow and keep exploring performance, APIs, and accessible experiences.</p><div className="fact-list"><div><span>BASED IN</span><strong>San Luis, Pampanga</strong></div><div><span>EDUCATION</span><strong>Computer Science · Holy Cross College</strong></div><div><span>FOCUS</span><strong>Web + mobile development</strong></div></div></div>
      </section>

      <section className="profile-timeline-section section shell" id="experience" aria-labelledby="experience-title">
        <div className="section-head reveal"><div><p className="eyebrow">02 / EXPERIENCE</p><h2 id="experience-title">Work in<br/><em>motion.</em></h2></div><p>Three chapters of practice, from independent delivery to team development and an onsite internship.</p></div>
        <div className="timeline">
          {experiences.map((item) => <article className="timeline-entry reveal" key={item.number}><div className="timeline-side"><span>{item.number}</span><small>{item.period}<br/>{item.place}</small></div><div><p className="eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p>{item.body}</p><div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}
        </div>
        <div className="field-gallery reveal">
          <figure className="field-gallery-large"><Image src="/imgs/ex1.png" alt="Team developing together during Bernard's internship" fill sizes="(max-width: 760px) 90vw, 56vw"/><figcaption>FIELD RECORD / AP GLOBAL IT SOLUTIONS</figcaption></figure>
          <figure><Image src="/imgs/ex2.jpg" alt="Bernard and teammates working on laptops" fill sizes="(max-width: 760px) 43vw, 22vw"/></figure>
          <figure><Image src="/imgs/ex3.jpg" alt="Bernard with teammates" fill sizes="(max-width: 760px) 43vw, 22vw"/></figure>
          <figure><Image src="/imgs/ex4.jpg" alt="Development work on laptops" fill sizes="(max-width: 760px) 43vw, 22vw"/></figure>
          <figure><Image src="/imgs/ex5.jpg" alt="A dashboard interface on a laptop" fill sizes="(max-width: 760px) 43vw, 22vw"/></figure>
        </div>
      </section>

      <section className="education-section section" id="education" aria-labelledby="education-title"><div className="shell education-layout"><div className="reveal"><p className="eyebrow">03 / EDUCATION</p><h2 id="education-title">The<br/><em>foundation.</em></h2><p>Computer Science at Holy Cross College, Pampanga. The work in this portfolio connects front-end design, back-end systems, mobile development, and machine learning.</p><div className="education-meta"><strong>2022 — 2026</strong><span>BACHELOR OF SCIENCE IN COMPUTER SCIENCE</span></div></div><div className="education-photo reveal"><Image src="/bernardpng.png" alt="Bernard in his graduation gown" fill sizes="(max-width: 760px) 80vw, 40vw"/><span>CLASS OF 2026</span></div></div></section>

      <section className="section principles-section shell" aria-labelledby="principles-title"><div className="section-head reveal"><div><p className="eyebrow">04 / WORKING APPROACH</p><h2 id="principles-title">How I<br/><em>approach it.</em></h2></div><p>Three priorities connect the projects, from a mobile prototype to a full-stack system.</p></div><div className="principles-grid"><article className="principle tilt-card reveal"><span>01 / CLARITY</span><h3>Make it understandable.</h3><p>Build approachable interfaces with readability and accessibility in mind.</p></article><article className="principle tilt-card reveal"><span>02 / PERFORMANCE</span><h3>Make it responsive.</h3><p>Consider load time, device behavior, and smooth interactions as part of the product.</p></article><article className="principle tilt-card reveal"><span>03 / DELIVERY</span><h3>Make it maintainable.</h3><p>Use clear code, version control, and documentation from build to deployment.</p></article></div></section>

      <section className="page-next shell"><p className="eyebrow">NEXT / THE TOOLSET</p><h2>See what powers<br/><em>the work.</em></h2><Link className="button button-dark" href="/systems">Explore systems <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
