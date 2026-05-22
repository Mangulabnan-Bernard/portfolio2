import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader label="Work History" title="Experience_" />
      <RevealSection className="exp-timeline flex flex-col gap-0">
        <div className="exp-item grid grid-cols-[180px_1fr] gap-0 md:gap-8 relative pb-10">
          <div className="exp-date font-mono text-[11px] text-muted pt-1 text-right leading-[1.6]">
            Feb 2025<br/>– Mar 2026
          </div>
          <div className="absolute left-[173px] top-[18px] bottom-0 w-[2px] bg-border hidden md:block" />
          <div className="exp-dot absolute left-[168px] top-[6px] w-[12px] h-[12px] rounded-full bg-teal border-2 border-bg z-10 hidden md:block"></div>
          <div className="exp-content bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
            <div className="exp-role font-mono text-[1rem] font-semibold text-text mb-[3px]">
              Freelance Web Developer
            </div>
            <div className="exp-company text-[12px] text-teal-2 mb-3 font-mono">
              Independent · Remote
            </div>
            <ul className="exp-bullets list-none flex flex-col gap-1">
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Built websites and web apps end-to-end for various clients — from design through deployment.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Delivered projects faster using Next.js, Tailwind CSS, and AI coding tools.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Handled full production cycle including hosting, domain setup, and ongoing support.
              </li>
            </ul>
          </div>
        </div>

        <div className="exp-item grid grid-cols-[180px_1fr] gap-0 md:gap-8 relative pb-10">
          <div className="exp-date font-mono text-[11px] text-muted pt-1 text-right leading-[1.6]">
            Sep 2025<br/>– Mar 2026
          </div>
          <div className="absolute left-[173px] top-[18px] bottom-0 w-[2px] bg-border hidden md:block" />
          <div className="exp-dot absolute left-[168px] top-[6px] w-[12px] h-[12px] rounded-full bg-teal border-2 border-bg z-10 hidden md:block"></div>
          <div className="exp-content bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
            <div className="exp-role font-mono text-[1rem] font-semibold text-text mb-[3px]">
              Part-Time Web Developer
            </div>
            <div className="exp-company text-[12px] text-teal-2 mb-3 font-mono">
              APGT Global Solutions · Antipolo
            </div>
            <ul className="exp-bullets list-none flex flex-col gap-1">
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Maintained and improved an internal company system after completing internship.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Handled updates, bug fixes, and data management to keep the platform stable.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Documented new features and supported other developers on the team.
              </li>
            </ul>
          </div>
        </div>

        <div className="exp-item grid grid-cols-[180px_1fr] gap-0 md:gap-8 relative pb-10">
          <div className="exp-date font-mono text-[11px] text-muted pt-1 text-right leading-[1.6]">
            Aug 2025<br/>– Sep 2025
          </div>
          <div className="exp-dot absolute left-[168px] top-[6px] w-[12px] h-[12px] rounded-full bg-teal border-2 border-bg z-10 hidden md:block"></div>
          <div className="exp-content bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
            <div className="exp-role font-mono text-[1rem] font-semibold text-text mb-[3px]">
              Web Developer Intern
            </div>
            <div className="exp-company text-[12px] text-teal-2 mb-3 font-mono">
              APGT Global Solutions · Antipolo
            </div>
            <ul className="exp-bullets list-none flex flex-col gap-1">
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Studied and reverse-engineered the company&apos;s existing system architecture.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Rebuilt a replica of the system using Next.js, replicating the original&apos;s structure and design.
              </li>
              <li className="text-[13px] text-text-2 pl-[14px] relative leading-[1.6]">
                <span className="absolute left-0 text-teal-3 text-[10px] top-1">▸</span>
                Created mock data sets for safe feature testing and wrote system documentation for future developers.
              </li>
            </ul>
          </div>
        </div>
      </RevealSection>
    </Section>
  );
}
