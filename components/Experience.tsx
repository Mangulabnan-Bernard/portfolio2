import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import PhotoGallery from '@/components/ui/PhotoGallery';
import { PROJECTS } from '@/lib/projects';

type ExperienceProps = {
  summary?: boolean;
};

// Photos from the AP Global internship journey.
const INTERN_PHOTOS = [
  '/imgs/ex1.png',
  '/imgs/ex2.jpg',
  '/imgs/ex3.jpg',
  '/imgs/ex4.jpg',
  '/imgs/ex5.jpg',
];

const EXPERIENCE_ITEMS = [
  {
    period: 'Aug 2025 – Sep 2025',
    role: 'Intern',
    company: 'AP Global IT Solutions Inc · Antipolo (Onsite)',
    bullets: [
      'Analyzed system architecture and rebuilt a functional replica using Next.js with synthetic test data.',
      'Documented system workflows and taught Next.js fundamentals to fellow interns.',
    ],
  },
  {
    period: 'Sep 2025 – May 2026',
    role: 'Part-Time Web Developer',
    company: 'AP Global IT Solutions Inc · Antipolo (Hybrid)',
    bullets: [
      'Maintained internal systems, handled updates, bug fixes, and data management; documented new features.',
      'Conducted training sessions teaching Flutter and Dart fundamentals to upskill team members.',
      'Created website templates for various occasions such as birthdays, events, RSVPs, and more.',
    ],
  },
  {
    period: 'Feb 2025 – Jun 2026',
    role: 'Freelance Web Developer',
    company: 'Independent · Remote',
    bullets: [
      'Developed custom websites and web apps from design to deployment using Next.js, Tailwind CSS, and AI tools.',
    ],
  },
];

export default function Experience({ summary = false }: ExperienceProps) {
  const visibleItems = summary ? EXPERIENCE_ITEMS.slice(-2) : EXPERIENCE_ITEMS;

  return (
    <Section id="experience">
      <SectionHeader label={summary ? 'pipeline' : 'pipeline'} number={summary ? '02' : undefined} title="Experience" />
      <RevealSection className="pipeline flex flex-col md:flex-row items-stretch gap-8 md:gap-0 overflow-x-auto pb-2">
        {visibleItems.map((item, index) => (
          <div
            key={item.role}
            className="pipe-stage relative flex-1 min-w-[220px] bg-surface border border-border rounded-[10px] p-5 md:mr-9 transition-colors hover:border-teal-3"
          >
            {index !== visibleItems.length - 1 && (
              <span className="hidden md:block absolute -right-[30px] top-1/2 -translate-y-1/2 text-teal font-mono text-[18px]" aria-hidden="true">→</span>
            )}
            <div className="font-mono text-[10px] text-muted mb-3">{item.period}</div>
            <div className="font-sans text-[1.05rem] font-bold text-text mb-1">{item.role}</div>
            <div className="text-[11px] text-teal font-mono mb-4">{item.company}</div>
            <ul className="list-none flex flex-col gap-1.5">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                  <span className="absolute left-0 text-teal-3 text-[10px] top-1.5">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </RevealSection>

      {!summary && (
        <RevealSection className="experience-highlights mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Projects Completed',
              value: `${PROJECTS.length}`,
            },
            {
              label: 'Client Satisfaction',
              value: 'Trusted by remote teams and stakeholders',
            },
            {
              label: 'Process Focus',
              value: 'Discovery → Build → Deploy → Support',
            },
          ].map((item) => (
            <div key={item.label} className="highlight-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-teal mb-3">{item.label}</div>
              <div className="text-text text-[1.1rem] font-semibold leading-[1.4]">{item.value}</div>
            </div>
          ))}
        </RevealSection>
      )}

      {!summary && (
        <RevealSection className="mt-12">
          <div className="font-mono text-[11px] tracking-[0.1em] text-teal uppercase mb-4">Internship Journey</div>
          <PhotoGallery images={INTERN_PHOTOS} label="Internship" />
        </RevealSection>
      )}

      {summary && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/experience"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.05em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            View Full Experience
          </Link>
        </div>
      )}
    </Section>
  );
}
