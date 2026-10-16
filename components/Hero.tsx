import Link from 'next/link';
import HeroStat from '@/components/ui/HeroStat';
import NodeGraphBackground from '@/components/ui/NodeGraphBackground';
import { SKILL_CATEGORIES } from '@/components/Skills';
import { PROJECTS } from '@/lib/projects';

const PROJECT_COUNT = PROJECTS.length;
const WEB_COUNT = PROJECTS.filter((p) => p.category === 'web').length;
const MOBILE_COUNT = PROJECTS.filter((p) => p.category === 'mobile').length;
const SKILL_COUNT = SKILL_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-[640px] flex flex-col justify-center py-24 px-8 max-w-[1140px] mx-auto">
      <NodeGraphBackground density="full" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="hero-content relative z-10 max-w-[720px]">
        <div className="hero-kicker font-mono text-[11px] tracking-[0.08em] text-teal uppercase mb-5">
          Full-Stack &amp; Mobile Engineer · San Luis, PH
        </div>
        <h1 className="font-sans text-[clamp(2.6rem,6.2vw,4.6rem)] font-black leading-[1.02] tracking-[-0.015em] text-text mb-6 max-w-[15ch]">
          Every skill connects to something shipped.
        </h1>
        <p className="hero-desc max-w-[560px] text-text-2 text-[1.02rem] leading-[1.75] mb-9">
          Bernard C. Mangulabnan — 23, full-stack web and mobile developer, 2026 Computer Science graduate from Holy Cross College. Seven projects, one ML thesis, a stack that spans front-end to back-end to native mobile.
        </p>
        <div className="hero-actions flex gap-3 flex-wrap mb-11">
          <Link href="/projects" className="font-mono text-[12.5px] font-semibold px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline transition-all hover:-translate-y-0.5 inline-block">
            View Projects
          </Link>
          <Link href="/contact" className="font-mono text-[12.5px] font-semibold px-6 py-3 bg-transparent text-text border border-[var(--border-strong,var(--border))] rounded-[8px] cursor-pointer no-underline transition-all hover:border-teal hover:text-teal inline-block">
            Get In Touch
          </Link>
          <a
            href="/BernardMangulabnan.pdf"
            download
            className="font-mono text-[12.5px] font-semibold px-6 py-3 bg-transparent text-text border border-[var(--border-strong,var(--border))] rounded-[8px] cursor-pointer no-underline transition-all hover:border-teal hover:text-teal inline-flex items-center gap-2"
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="hero-stats flex gap-10 pt-8 border-t border-border flex-wrap">
          <HeroStat value={PROJECT_COUNT} label="Projects Shipped" />
          <HeroStat value={SKILL_COUNT} label="Nodes in the Stack" />
          <HeroStat value="2026" label="CS Graduate" animate={false} />
          <HeroStat value={`${WEB_COUNT} · ${MOBILE_COUNT}`} label="Web · Mobile" animate={false} />
        </div>
      </div>
    </section>
  );
}
