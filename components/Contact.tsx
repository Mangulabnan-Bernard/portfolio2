import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import RevealSection from '@/components/RevealSection';
import ContactItem from '@/components/ui/ContactItem';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const EMAIL = 'mangulabnan.bernard321@gmail.com';
const linkClass = 'text-teal-2 no-underline hover:text-teal';

type ContactProps = {
  summary?: boolean;
};

export default function Contact({ summary = false }: ContactProps) {
  return (
    <Section id="contact">
      <SectionHeader
        label={summary ? 'Contact' : 'Get In Touch'}
        title={summary ? "Let's Connect_" : "Let's Work Together_"}
      />
      <RevealSection className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="contact-info">
          <p className="contact-tagline text-[0.95rem] text-text-2 leading-[1.8] mb-8">
            I&apos;m open to freelance projects and full-time opportunities. Whether you need a website, web app, or mobile app — let&apos;s build something polished together.
          </p>
          <ContactItem icon="✉️" label="Email">
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
            </a>
          </ContactItem>
          <ContactItem icon="📍" label="Location">
            San Luis, Pampanga, Philippines
          </ContactItem>
          <ContactItem icon="📱" label="Phone">
            <a href="tel:+639859257816" className={linkClass}>
              +63 985 925 7816
            </a>
          </ContactItem>
          {!summary && (
            <>
              <ContactItem icon="⌨️" label="GitHub">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  @Mangulabnan-Bernard
                </a>
              </ContactItem>
              <ContactItem icon="💼" label="LinkedIn">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Bernard Mangulabnan
                </a>
              </ContactItem>
              <ContactItem icon="🟢" label="Status">
                <span className="text-teal">Available for new projects</span>
              </ContactItem>
              <a
                href="/BernardMangulabnan_Resume.pdf"
                download
                className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] no-underline font-bold transition-all hover:bg-teal-hover"
              >
                Download Résumé
                <span aria-hidden="true">↓</span>
              </a>
            </>
          )}
        </div>

        {!summary ? (
          <ContactForm />
        ) : (
          <div className="flex flex-col gap-5 justify-center">
            <p className="text-text-2 text-[0.95rem] leading-[1.8]">
              Prefer email? Click the button below and your mail client will open with my address pre-filled.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-7 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
            >
              Email Me Directly
            </a>
          </div>
        )}
      </RevealSection>

      {!summary && (
        <RevealSection className="contact-followup mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Response Time',
              value: '24–48 hours',
            },
            {
              title: 'Work Style',
              value: 'Transparent updates, clear timelines, fast delivery',
            },
            {
              title: 'Best Fit',
              value: 'Web apps, landing pages, mobile MVPs, AI-enhanced tooling',
            },
          ].map((item) => (
            <div key={item.title} className="info-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-teal mb-3">{item.title}</div>
              <div className="text-text text-[1rem] leading-[1.6]">{item.value}</div>
            </div>
          ))}
        </RevealSection>
      )}

      {summary && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            Send a Message
          </Link>
        </div>
      )}
    </Section>
  );
}
