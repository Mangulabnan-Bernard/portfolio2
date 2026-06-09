import Link from 'next/link';
import HeroNetwork from '@/components/ui/HeroNetwork';
import { PROJECTS } from '@/lib/projects';

const PROJECT_COUNT = PROJECTS.length;

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 py-32">
      {/* Interactive constellation network */}
      <HeroNetwork />

      {/* Scrim to keep the content readable above the web */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-bg) 72%, transparent), transparent 72%)' }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-[860px] pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-11 rounded-full border border-border bg-surface/60 backdrop-blur-sm font-mono text-[11px] tracking-[0.12em] text-text-2">
          <span className="w-[7px] h-[7px] rounded-full bg-teal animate-pulse" />
          Available for new projects · Pampanga, PH
        </div>

        <h1 className="font-mono font-bold leading-[1.22] text-[clamp(2.6rem,7vw,5rem)] mb-9">
          <span className="block text-text">Bernard C.</span>
          <span
            className="block mt-1"
            style={{
              background: 'linear-gradient(100deg, var(--color-teal), color-mix(in srgb, var(--color-teal) 55%, var(--color-text)))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Mangulabnan
          </span>
        </h1>

        <div className="font-mono text-[clamp(1rem,2.4vw,1.3rem)] text-teal font-light mb-10">
          Full Stack Web &amp; Mobile Developer
        </div>

        <p className="max-w-[600px] text-text-2 text-[1.02rem] leading-[1.9] mb-12">
          I build fast, polished, user-friendly websites, web apps, and mobile apps —
          turning ideas into clean, reliable products with React, Next.js, and Flutter.
        </p>

        {/* re-enable pointer events on interactive elements */}
        <div className="flex gap-4 flex-wrap justify-center mb-10 pointer-events-auto">
          <Link href="/projects" className="font-mono text-[12px] tracking-[0.1em] px-8 py-3.5 bg-teal text-bg rounded-[8px] no-underline font-bold transition-all hover:bg-teal-hover hover:-translate-y-0.5">
            View Projects
          </Link>
          <Link href="/contact" className="font-mono text-[12px] tracking-[0.1em] px-8 py-3.5 bg-surface/50 backdrop-blur-sm text-teal border border-teal-3 rounded-[8px] no-underline transition-all hover:bg-teal/10 hover:border-teal">
            Get In Touch
          </Link>
        </div>

        <div className="flex items-center gap-6 font-mono text-[12px] text-muted pointer-events-auto">
          <span><span className="text-teal font-bold">{PROJECT_COUNT}</span> projects shipped</span>
          <span className="w-px h-3 bg-border" />
          <span><span className="text-teal font-bold">1+</span> years experience</span>
          <span className="w-px h-3 bg-border" />
          <a href="/BernardMangulabnan.pdf" download className="hover:text-teal transition-colors">Download CV ↓</a>
        </div>
      </div>
    </section>
  );
}
