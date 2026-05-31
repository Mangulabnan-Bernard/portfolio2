import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

type SkillsProps = {
  summary?: boolean;
};

const SKILL_CATEGORIES = [
  {
    icon: '🖥️',
    title: 'Front-End',
    items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Responsive Design', 'PWA'],
  },
  {
    icon: '📱',
    title: 'Mobile',
    items: ['Flutter', 'Dart', 'Cross-Platform Development', 'Mobile UI/UX Design', 'RESTful API Integration', 'State Management'],
  },
  {
    icon: '⚙️',
    title: 'Back-End & Database',
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'Drizzle ORM', 'Prisma ORM', 'MySQL', 'PHP', 'C++'],
  },
  {
    icon: '🤖',
    title: 'AI Tools',
    items: ['Claude & Claude Code', 'ChatGPT', 'Cursor', 'Windsurf'],
  },
  {
    icon: '☁️',
    title: 'Tools & Platforms',
    items: ['Git', 'Version Control', 'Vercel', 'Hostinger', 'AWS', 'CI/CD', 'Agile / Scrum'],
  },
];

export default function Skills({ summary = false }: SkillsProps) {
  const visibleCategories = summary ? SKILL_CATEGORIES.slice(0, 4) : SKILL_CATEGORIES;

  return (
    <Section id="skills">
      <SectionHeader label={summary ? 'Skills' : 'Technical Skills'} title="My Stack_" />
      <RevealSection className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleCategories.map((category) => (
          <div key={category.title} className="skill-category bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3 hover:-translate-y-0.5">
            <div className="skill-cat-header flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <span className="skill-cat-icon text-[1.1rem]">{category.icon}</span>
              <span className="skill-cat-name font-mono text-[12px] font-semibold tracking-[0.1em] text-text uppercase">{category.title}</span>
            </div>
            <div className="skill-pills flex flex-wrap gap-2">
              {category.items.map((tag) => (
                <span
                  key={tag}
                  className="pill font-mono text-[10px] tracking-[0.05em] px-2 py-1 bg-teal/6 border border-teal/15 text-teal-2 rounded-[20px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </RevealSection>

      {!summary && (
        <RevealSection className="skill-showcase mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="toolkit-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[11px] tracking-[0.18em] text-teal uppercase mb-4">Current Toolkit</div>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Flutter', 'Firebase', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="tech-pill font-mono text-[10px] tracking-[0.08em] px-3 py-2 bg-teal/6 border border-teal/15 text-teal rounded-[999px]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="learning-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[11px] tracking-[0.18em] text-teal uppercase mb-4">Learning & Growth</div>
              <ul className="space-y-3 text-text-2 text-[0.95rem] leading-[1.8]">
                <li>Exploring modern API integrations and AI-assisted workflows.</li>
                <li>Improving performance with web vitals, caching, and accessibility.</li>
                <li>Building polished mobile-first experiences across web and native apps.</li>
              </ul>
            </div>
          </div>
        </RevealSection>
      )}

      {summary && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/skills"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            View Full Skill Set
          </Link>
        </div>
      )}
    </Section>
  );
}
