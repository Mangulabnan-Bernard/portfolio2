'use client';

import { useState } from 'react';
import TechIcon from '@/components/ui/TechIcon';

type Skill = { name: string; slug?: string };
export type SkillCategoryData = {
  key: string;
  icon: string;
  title: string;
  blurb: string;
  items: Skill[];
};

export default function SkillsExplorer({ categories }: { categories: SkillCategoryData[] }) {
  const [active, setActive] = useState(categories[0]?.key);
  const cat = categories.find((c) => c.key === active) ?? categories[0];
  if (!cat) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">
      {/* Category list — vertical on desktop, horizontal scroll on mobile */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
        {categories.map((c) => {
          const isActive = c.key === cat.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c.key)}
              className={`shrink-0 lg:shrink min-w-[170px] lg:min-w-0 snap-start text-left rounded-[12px] border p-4 transition-all ${
                isActive ? 'border-teal bg-teal/8' : 'border-border bg-surface hover:border-teal-3 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[1.1rem]">{c.icon}</span>
                <span className="font-mono text-[12px] font-semibold text-text">{c.title}</span>
                <span className="ml-auto font-mono text-[10px] text-muted">{c.items.length}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div key={cat.key} className="animate-fade bg-surface border border-border rounded-[16px] p-6 md:p-7">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[1.5rem]">{cat.icon}</span>
          <h3 className="font-mono text-[1.2rem] font-bold text-text">{cat.title}</h3>
          <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-muted uppercase">{cat.items.length} skills</span>
        </div>
        <p className="text-text-2 text-[0.92rem] leading-[1.75] mb-6 max-w-[640px]">{cat.blurb}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cat.items.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2.5 p-3 bg-bg border border-border rounded-[10px] transition-all hover:border-teal-3 hover:-translate-y-0.5"
            >
              <TechIcon slug={s.slug} name={s.name} size="sm" />
              <span className="font-mono text-[11px] text-text-2 truncate">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
