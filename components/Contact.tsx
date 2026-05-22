import ContactForm from '@/components/ContactForm';
import RevealSection from '@/components/RevealSection';
import ContactItem from '@/components/ui/ContactItem';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const EMAIL = 'mangulabnan.bernard321@gmail.com';
const linkClass = 'text-teal-2 no-underline hover:text-teal';

export default function Contact() {
  return (
    <Section id="contact">
      <SectionHeader label="Get In Touch" title="Let&apos;s Work Together_" />
      <RevealSection className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="contact-info">
          <p className="contact-tagline text-[0.95rem] text-text-2 leading-[1.8] mb-8">
            I&apos;m currently open to freelance projects and full-time opportunities. Whether you need a website, web app, or mobile app — let&apos;s talk about what we can build together.
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
        </div>
        <ContactForm />
      </RevealSection>
    </Section>
  );
}
