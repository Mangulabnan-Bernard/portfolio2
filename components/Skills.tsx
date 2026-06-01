'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import TechIcon from '@/components/ui/TechIcon';

type SkillsProps = {
  summary?: boolean;
};

type Skill = { name: string; slug?: string };

type SkillCategory = {
  key: string;
  icon: string;
  title: string;
  items: Skill[];
};

// `slug` is a Simple Icons slug (https://simpleicons.org). Skills without a
// brand logo (concepts, methodologies) omit it and render a monogram instead.
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    key: 'frontend',
    icon: '🖥️',
    title: 'Front-End',
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
    items: [
      { name: 'Flutter', slug: 'flutter' },
      { name: 'Dart', slug: 'dart' },
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
    items: [
      { name: 'Claude Code', slug: 'claude' },
      { name: 'ChatGPT', slug: 'openai' },
      { name: 'Cursor' },
      { name: 'Windsurf' },
    ],
  },
  {
    key: 'tools',
    icon: '☁️',
    title: 'Tools & Platforms',
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

// Curated, eye-catching set for the homepage summary (a compact "logo wall").
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

export default function Skills({ summary = false }: SkillsProps) {
  const [active, setActive] = useState<string>('all');

  const total = useMemo(
    () => SKILL_CATEGORIES.reduce((n, c) => n + c.items.length, 0),
    []
  );

  // Flatten with category info so we can filter into a single unified grid.
  const flat = useMemo(
    () =>
      SKILL_CATEGORIES.flatMap((c) =>
        c.items.map((item) => ({ ...item, category: c.title, categoryKey: c.key }))
      ),
    []
  );

  const visible = active === 'all' ? flat : flat.filter((s) => s.categoryKey === active);

  // ---- Homepage summary: a compact logo wall + CTA ----
  if (summary) {
    return (
      <Section id="skills">
        <SectionHeader label="Skills" title="My Stack_" />
        <RevealSection>
          <div className="flex flex-wrap gap-3">
            {TOOLKIT.map((tech) => (
              <span
                key={tech.name}
                className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 bg-surface border border-border rounded-[999px] transition-colors hover:border-teal-3"
              >
                <TechIcon slug={tech.slug} name={tech.name} size="sm" />
                <span className="font-mono text-[12px] tracking-[0.04em] text-text-2">{tech.name}</span>
              </span>
            ))}
          </div>
        </RevealSection>
        <div className="mt-8 flex justify-center">
          <Link
            href="/skills"
            className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
          >
            View Full Skill Set
          </Link>
        </div>
      </Section>
    );
  }

  // ---- Full /skills page: filterable logo grid ----
  return (
    <Section id="skills">
      <SectionHeader label="Technical Skills" title="My Stack_" />

      <RevealSection>
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <FilterTab label="All" count={total} active={active === 'all'} onClick={() => setActive('all')} />
          {SKILL_CATEGORIES.map((c) => (
            <FilterTab
              key={c.key}
              label={`${c.icon} ${c.title}`}
              count={c.items.length}
              active={active === c.key}
              onClick={() => setActive(c.key)}
            />
          ))}
        </div>

        {/* Unified logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visible.map((skill) => (
            <div
              key={`${skill.categoryKey}-${skill.name}`}
              className="group flex flex-col items-center justify-center gap-3 p-5 bg-surface border border-border rounded-[14px] text-center transition-all duration-200 hover:border-teal-3 hover:-translate-y-1 hover:shadow-[0_8px_24px_-12px_color-mix(in_srgb,var(--color-teal)_45%,transparent)]"
            >
              <TechIcon slug={skill.slug} name={skill.name} size="md" />
              <span className="font-mono text-[11px] tracking-[0.03em] text-text-2 leading-tight">
                {skill.name}
              </span>
              {active === 'all' && (
                <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.category}
                </span>
              )}
            </div>
          ))}
        </div>
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
    </Section>
  );
}

function FilterTab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] px-4 py-2 rounded-[999px] border cursor-pointer transition-colors ${
        active
          ? 'bg-teal text-bg border-teal font-bold'
          : 'bg-transparent text-text-2 border-border hover:border-teal-3'
      }`}
    >
      <span>{label}</span>
      <span className={`text-[9px] ${active ? 'text-bg/70' : 'text-muted'}`}>{count}</span>
    </button>
  );
}
