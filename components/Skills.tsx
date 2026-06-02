import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import TechIcon from '@/components/ui/TechIcon';
import SkillsMarquee from '@/components/ui/SkillsMarquee';
import SkillsExplorer from '@/components/ui/SkillsExplorer';

type SkillsProps = {
  summary?: boolean;
};

type Skill = { name: string; slug?: string };

type SkillCategory = {
  key: string;
  icon: string;
  title: string;
  blurb: string;
  items: Skill[];
};

// `slug` is a Simple Icons slug (https://simpleicons.org). Skills without a
// brand logo (concepts, methodologies) omit it and render a monogram instead.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'frontend',
    icon: '🖥️',
    title: 'Front-End',
    blurb:
      'Crafting responsive, accessible interfaces with React and Next.js — fast, polished, and mobile-first by default.',
    items: [
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS3', slug: 'css' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'React.js', slug: 'react' },
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Responsive Design' },
      { name: 'PWA', slug: 'pwa' },
    ],
  },
  {
    key: 'mobile',
    icon: '📱',
    title: 'Mobile',
    blurb:
      'Cross-platform Android & iOS apps with Flutter and Dart — clean UI/UX backed by REST APIs and solid state management.',
    items: [
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Dart', slug: 'dart' },
      { name: 'Android & iOS' },
      { name: 'Cross-Platform' },
      { name: 'Mobile UI/UX' },
      { name: 'REST API' },
      { name: 'State Mgmt' },
    ],
  },
  {
    key: 'backend',
    icon: '⚙️',
    title: 'Back-End & DB',
    blurb:
      'APIs and data layers with Node.js and Express over PostgreSQL, Prisma, and MySQL.',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Express.js', slug: 'express' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Prisma ORM', slug: 'prisma' },
      { name: 'MySQL', slug: 'mysql' },
      { name: 'PHP', slug: 'php' },
    ],
  },
  {
    key: 'ai',
    icon: '🤖',
    title: 'AI Tools',
    blurb:
      'Shipping faster with AI-assisted development, plus on-device machine learning using TensorFlow.',
    items: [
      { name: 'Claude Code', slug: 'claude' },
      { name: 'ChatGPT', slug: 'openai' },
      { name: 'Cursor' },
      { name: 'Windsurf' },
      { name: 'TensorFlow', slug: 'tensorflow' },
    ],
  },
  {
    key: 'tools',
    icon: '☁️',
    title: 'Tools & Platforms',
    blurb:
      'Versioned with Git, deployed on Vercel, Hostinger, and AWS — with CI/CD and an Agile workflow.',
    items: [
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
      { name: 'Vercel', slug: 'vercel' },
      { name: 'Hostinger', slug: 'hostinger' },
      { name: 'AWS', slug: 'amazonwebservices' },
      { name: 'CI/CD' },
      { name: 'Agile / Scrum' },
    ],
  },
];

const TOOLKIT: Skill[] = [
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Claude Code', slug: 'claude' },
];

const ALL_SKILLS: Skill[] = SKILL_CATEGORIES.flatMap((c) => c.items);

export default function Skills({ summary = false }: SkillsProps) {
  return (
    <Section id="skills">
      <SectionHeader label={summary ? 'Skills' : 'Technical Skills'} title="My Stack_" />

      {summary ? (
        <>
          <RevealSection>
            <SkillsMarquee items={ALL_SKILLS} />
          </RevealSection>
          <div className="mt-8 flex justify-center">
            <Link
              href="/skills"
              className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
            >
              View Full Skill Set
            </Link>
          </div>
        </>
      ) : (
        <>
          <RevealSection>
            <SkillsExplorer categories={SKILL_CATEGORIES} />
          </RevealSection>

          <RevealSection className="mt-12">
            <SkillsMarquee items={ALL_SKILLS} />
          </RevealSection>

          <RevealSection className="skill-showcase mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="toolkit-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[11px] tracking-[0.18em] text-teal uppercase mb-4">Daily Drivers</div>
              <div className="flex flex-wrap gap-3">
                {TOOLKIT.map((tech) => (
                  <span key={tech.name} className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-teal/6 border border-teal/15 text-text-2 rounded-[999px] font-mono text-[11px] tracking-[0.05em]">
                    <TechIcon slug={tech.slug} name={tech.name} size="sm" />
                    {tech.name}
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
        </>
      )}
    </Section>
  );
}
