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
      <section className="page-intro profile-page-intro shell reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 02 / PROFILE <span className="intro-side">SAN LUIS / PAMPANGA</span></p><h1>About<br/><em>me.</em></h1><div className="intro-bottom"><p>I&apos;m a full-stack web and mobile developer and a 2026 Computer Science graduate from Pampanga.</p><span>PROFILE / EXPERIENCE &amp; EDUCATION</span></div></section>

      <section className="profile-lead-section shell" aria-labelledby="profile-lead-title">
        <div className="profile-lead-photo reveal"><Image src="/imgs/ber1.png" alt="Bernard seated outdoors" fill sizes="(max-width: 760px) 90vw, 44vw"/><span>BERNARD / PAMPANGA, PH</span></div>
        <div className="profile-lead-copy reveal"><p className="eyebrow">01 / INTRODUCTION</p><h2 id="profile-lead-title">Hello, I&apos;m<br/><em>Bernard.</em></h2><p className="lead-text">I like making complex things simple to use.</p><p>I&apos;m Bernard C. Mangulabnan, a 2026 Computer Science graduate from Holy Cross College, Pampanga. I build responsive websites, back-end systems, and cross-platform apps.</p><p>I focus on clear interfaces, maintainable code, and reliable performance. I use AI tools when they help, and I review and test the result.</p><div className="fact-list"><div><span>BASED IN</span><strong>San Luis, Pampanga</strong></div><div><span>EDUCATION</span><strong>Computer Science · Holy Cross College</strong></div><div><span>FOCUS</span><strong>Web + mobile development</strong></div></div></div>
      </section>

      <section className="profile-timeline-section section shell" id="experience" aria-labelledby="experience-title">
        <div className="section-head reveal"><div><p className="eyebrow">02 / EXPERIENCE</p><h2 id="experience-title">Work<br/><em>experience.</em></h2></div><p>Freelance, part-time, and internship experience in web and mobile development.</p></div>
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

      <section className="education-section section" id="education" aria-labelledby="education-title"><div className="shell education-layout"><div className="reveal"><p className="eyebrow">03 / EDUCATION</p><h2 id="education-title">My<br/><em>education.</em></h2><p>I studied Computer Science at Holy Cross College, Pampanga. My coursework and projects covered front-end development, back-end systems, mobile apps, and machine learning.</p><div className="education-meta"><strong>2022 — 2026</strong><span>BACHELOR OF SCIENCE IN COMPUTER SCIENCE</span></div></div><div className="education-photo reveal"><Image src="/bernardpng.png" alt="Bernard in his graduation gown" fill sizes="(max-width: 760px) 80vw, 40vw"/><span>CLASS OF 2026</span></div></div></section>

      <section className="section principles-section shell" aria-labelledby="principles-title"><div className="section-head reveal"><div><p className="eyebrow">04 / HOW I WORK</p><h2 id="principles-title">How I<br/><em>work.</em></h2></div><p>I focus on clarity, performance, and maintainable code.</p></div><div className="principles-grid"><article className="principle tilt-card reveal"><span>01 / CLARITY</span><h3>Make it understandable.</h3><p>Build clear interfaces with readability and accessibility in mind.</p></article><article className="principle tilt-card reveal"><span>02 / PERFORMANCE</span><h3>Make it responsive.</h3><p>Check load time, device behavior, and interactions on different screen sizes.</p></article><article className="principle tilt-card reveal"><span>03 / DELIVERY</span><h3>Make it maintainable.</h3><p>Use clear code, version control, and documentation from development to deployment.</p></article></div></section>

      <section className="page-next shell"><p className="eyebrow">NEXT / SKILLS</p><h2>See my skills<br/><em>and tools.</em></h2><Link className="button button-dark" href="/systems">View skills and tools <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
