import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

type ExperienceProps = {
  summary?: boolean;
};

const EXPERIENCE_ITEMS = [
  {
    period: 'Feb 2025\n– Mar 2026',
    role: 'Freelance Web Developer',
    company: 'Independent · Remote',
    bullets: [
      'Developed custom websites and web apps from design to deployment using Next.js, Tailwind CSS, and AI tools.',
    ],
  },
  {
    period: 'Sep 2025\n– Mar 2026',
    role: 'Part-Time Web Developer',
    company: 'AP Global IT Solutions Inc · Antipolo (Hybrid)',
    bullets: [
      'Maintained internal systems, handled updates, bug fixes, and data management; documented new features.',
      'Conducted training sessions teaching Flutter and Dart fundamentals to upskill team members.',
      'Created website templates for various occasions such as birthdays, events, RSVPs, and more.',
    ],
  },
  {
    period: 'Aug 2025\n– Sep 2025',
    role: 'Intern',
    company: 'AP Global IT Solutions Inc · Antipolo (Onsite)',
    bullets: [
      'Analyzed system architecture and rebuilt a functional replica using Next.js with synthetic test data.',
      'Documented system workflows and taught Next.js fundamentals to fellow interns.',
    ],
  },
];

export default function Experience({ summary = false }: ExperienceProps) {
  const visibleItems = summary ? EXPERIENCE_ITEMS.slice(0, 2) : EXPERIENCE_ITEMS;

  return (
    <Section id="experience">
      <SectionHeader label={summary ? 'Experience' : 'Work History'} title="Experience_" />
      <RevealSection className="exp-timeline flex flex-col gap-0">
        {visibleItems.map((item, index) => (
          <div key={item.role} className="exp-item grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1.5 md:gap-8 relative pb-8 md:pb-10">
            <div className="exp-date font-mono text-[11px] text-muted md:pt-1 md:pr-8 text-left md:text-right leading-[1.6] whitespace-pre-line">
              {item.period}
            </div>
            {index !== visibleItems.length - 1 && (
              <div className="absolute left-[173px] top-[18px] bottom-0 w-[2px] bg-border hidden md:block" />
            )}
            <div className="exp-dot absolute left-[168px] top-[6px] w-[12px] h-[12px] rounded-full bg-teal border-2 border-bg z-10 hidden md:block"></div>
            <div className="exp-content bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="exp-role font-mono text-[1rem] font-semibold text-text mb-[3px]">
                {item.role}
              </div>
              <div className="exp-company text-[12px] text-teal-2 mb-3 font-mono">
                {item.company}
              </div>
              <ul className="exp-bullets list-none flex flex-col gap-1">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                    <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </RevealSection>

      {!summary && (
        <RevealSection className="experience-highlights mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: 'Projects Completed',
              value: '5+',
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
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-teal mb-3">{item.label}</div>
              <div className="text-text text-[1.1rem] font-semibold leading-[1.4]">{item.value}</div>
            </div>
          ))}
        </RevealSection>
      )}

      {summary && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/experience"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            View Full Experience
          </Link>
        </div>
      )}
    </Section>
  );
}
