import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import CopyEmail from '@/components/portfolio/CopyEmail';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Bernard Mangulabnan about web applications, mobile projects, collaborations, or opportunities.',
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="contact-hero shell"><div className="contact-hero-copy reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 04 / CONTACT <span className="availability-dot"></span> AVAILABLE FOR OPPORTUNITIES</p><h1>Let&apos;s talk about<br/><em>your project.</em></h1><p>Need a website, mobile app, or developer for your team? Send me a message.</p><a className="button button-dark" href="mailto:mangulabnan.bernard321@gmail.com">Email me <span aria-hidden="true">↗</span></a></div><div className="contact-sculpture" aria-hidden="true"><div className="sculpture-ring sculpture-ring-one"></div><div className="sculpture-ring sculpture-ring-two"></div><div className="sculpture-core">↗</div><span>WEB → MOBILE → FULL STACK</span></div></section>

      <section className="contact-direct-section shell" aria-labelledby="direct-title"><div className="section-head reveal"><div><p className="eyebrow">01 / EMAIL</p><h2 id="direct-title">Email<br/><em>me.</em></h2></div><p>Contact me about projects, freelance work, collaboration, or job opportunities.</p></div><div className="email-panel reveal"><span>EMAIL ADDRESS</span><a href="mailto:mangulabnan.bernard321@gmail.com">mangulabnan.<br/>bernard321@gmail.com <b aria-hidden="true">↗</b></a><CopyEmail/></div><p className="contact-note reveal">Tell me about your project, the problem you need to solve, or the role you have in mind. You can also view my <Link href="/work">projects</Link> and <Link href="/profile">profile</Link>.</p></section>

      <section className="section contact-form-section shell" aria-labelledby="message-title"><div className="contact-form-layout"><div className="contact-form-intro reveal"><p className="eyebrow">02 / MESSAGE</p><h2 id="message-title">Send me<br/>a <em>message.</em></h2><p>Fill out the form and I&apos;ll reply by email.</p></div><div className="reveal"><ContactForm/></div></div></section>

      <section className="section contact-channels-section shell" aria-labelledby="channels-title"><div className="section-head reveal"><div><p className="eyebrow">03 / OTHER OPTIONS</p><h2 id="channels-title">Other ways<br/><em>to reach me.</em></h2></div><p>You can also contact me or view my work through these links.</p></div><div className="channel-grid"><a className="channel-card tilt-card reveal" href="tel:+639859257816"><span>01 / PHONE</span><strong>+63 985<br/>925 7816</strong><small>CALL ME ↗</small></a><a className="channel-card tilt-card reveal" href="https://github.com/Mangulabnan-Bernard" target="_blank" rel="noopener noreferrer"><span>02 / GITHUB</span><strong>GitHub.</strong><small>VIEW REPOSITORIES ↗</small></a><a className="channel-card tilt-card reveal" href="https://www.linkedin.com/in/bernard-mangulabnan" target="_blank" rel="noopener noreferrer"><span>03 / LINKEDIN</span><strong>LinkedIn.</strong><small>VIEW PROFILE ↗</small></a></div></section>

      <section className="resume-section"><div className="shell resume-inner reveal"><div><p className="eyebrow">04 / RÉSUMÉ</p><h2>Download my<br/><em>résumé.</em></h2><p>See my education, skills, projects, and work experience in one file.</p></div><a className="button button-light" href="/BernardMangulabnan.pdf" download>Download résumé <span aria-hidden="true">↓</span></a></div></section>
    </main>
  );
}
