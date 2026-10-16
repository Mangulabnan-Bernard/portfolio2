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
      <section className="contact-hero shell"><div className="contact-hero-copy reveal"><p className="eyebrow"><span className="eyebrow-line"></span> 04 / OPEN CHANNEL <span className="availability-dot"></span> AVAILABLE FOR OPPORTUNITIES</p><h1>Let&apos;s build<br/><em>something good.</em></h1><p>Have a web app, mobile idea, or useful problem to solve? I&apos;d like to hear about it.</p><a className="button button-dark" href="mailto:mangulabnan.bernard321@gmail.com">Email Bernard <span aria-hidden="true">↗</span></a></div><div className="contact-sculpture" aria-hidden="true"><div className="sculpture-ring sculpture-ring-one"></div><div className="sculpture-ring sculpture-ring-two"></div><div className="sculpture-core">↗</div><span>IDEA → INTERFACE → IMPACT</span></div></section>

      <section className="contact-direct-section shell" aria-labelledby="direct-title"><div className="section-head reveal"><div><p className="eyebrow">01 / START HERE</p><h2 id="direct-title">The direct<br/><em>line.</em></h2></div><p>For projects, collaboration, freelance work, and full-time opportunities.</p></div><div className="email-panel reveal"><span>EMAIL ADDRESS</span><a href="mailto:mangulabnan.bernard321@gmail.com">mangulabnan.<br/>bernard321@gmail.com <b aria-hidden="true">↗</b></a><CopyEmail/></div><p className="contact-note reveal">Tell me what you&apos;re building, the problem you&apos;re trying to solve, or the role you have in mind. You can explore my <Link href="/work">work</Link> and <Link href="/profile">profile</Link> first.</p></section>

      <section className="section contact-form-section shell" aria-labelledby="message-title"><div className="contact-form-layout"><div className="contact-form-intro reveal"><p className="eyebrow">02 / SEND A MESSAGE</p><h2 id="message-title">From your idea<br/>to <em>my inbox.</em></h2><p>Use the secure form and I&apos;ll reply through the email address you provide.</p></div><div className="reveal"><ContactForm/></div></div></section>

      <section className="section contact-channels-section shell" aria-labelledby="channels-title"><div className="section-head reveal"><div><p className="eyebrow">03 / OTHER CHANNELS</p><h2 id="channels-title">Elsewhere<br/><em>on the web.</em></h2></div><p>Choose whichever channel works best for you.</p></div><div className="channel-grid"><a className="channel-card tilt-card reveal" href="tel:+639859257816"><span>01 / PHONE</span><strong>+63 985<br/>925 7816</strong><small>CALL BERNARD ↗</small></a><a className="channel-card tilt-card reveal" href="https://github.com/Mangulabnan-Bernard" target="_blank" rel="noopener noreferrer"><span>02 / CODE</span><strong>GitHub.</strong><small>VIEW REPOSITORIES ↗</small></a><a className="channel-card tilt-card reveal" href="https://www.linkedin.com/in/bernard-mangulabnan" target="_blank" rel="noopener noreferrer"><span>03 / NETWORK</span><strong>LinkedIn.</strong><small>VIEW PROFILE ↗</small></a></div></section>

      <section className="resume-section"><div className="shell resume-inner reveal"><div><p className="eyebrow">04 / REFERENCE</p><h2>Need the<br/><em>short version?</em></h2><p>Download the résumé for a concise look at my background and experience.</p></div><a className="button button-light" href="/BernardMangulabnan.pdf" download>Download résumé <span aria-hidden="true">↓</span></a></div></section>
    </main>
  );
}
