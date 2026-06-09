import Image from 'next/image';
import TechIcon from '@/components/ui/TechIcon';
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const EMAIL = 'mangulabnan.bernard321@gmail.com';
const GMAIL_COMPOSE =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}` +
  `&su=${encodeURIComponent("Let's work together")}` +
  `&body=${encodeURIComponent('Hi Bernard,\n\n')}`;

const STACK = [
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Flutter', slug: 'flutter' },
];

function MetaRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[13px] text-text-2">
      <span className="text-teal shrink-0">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[9px] border border-border text-text-2 font-mono text-[11px] tracking-[0.05em] transition-all hover:border-teal-3 hover:text-teal hover:bg-teal/6"
    >
      {children}
    </a>
  );
}

/**
 * Hero visual — a glassy "developer ID card": avatar, name, status, key facts,
 * stack logos, and social links. Themed via the standard surface/border/teal tokens.
 */
export default function HeroProfileCard() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto md:mx-0">
      <div className="absolute -inset-3 rounded-[28px] blur-3xl" style={{ background: 'var(--color-teal)', opacity: 0.1 }} />

      <div className="relative rounded-[18px] overflow-hidden border border-border bg-surface/80 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
        {/* Accent strip */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--color-teal), transparent)' }} />

        <div className="p-6">
          {/* Header: avatar + name */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-[64px] h-[64px] rounded-full overflow-hidden ring-2 ring-teal/30">
                <Image src="/imgs/ber1.png" alt="Bernard C. Mangulabnan" width={64} height={64} className="w-full h-full object-cover" priority />
              </div>
              <span className="absolute bottom-0 right-0 w-[14px] h-[14px] rounded-full bg-teal border-[3px] border-surface" />
            </div>
            <div className="min-w-0">
              <h2 className="font-mono text-[1.05rem] font-bold text-text leading-tight">Bernard C. Mangulabnan</h2>
              <p className="font-mono text-[12px] text-teal mt-0.5">Full Stack Web &amp; Mobile Developer</p>
            </div>
          </div>

          {/* Status pill */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/8 border border-teal/15">
            <span className="w-[7px] h-[7px] rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.08em] text-text-2">Available for new projects</span>
          </div>

          {/* Facts */}
          <div className="mt-5 space-y-2.5">
            <MetaRow icon={<svg {...iconProps}><path d="M10 17s5-4.2 5-8a5 5 0 0 0-10 0c0 3.8 5 8 5 8Z" /><circle cx="10" cy="9" r="1.8" /></svg>}>
              San Luis, Pampanga, Philippines
            </MetaRow>
            <MetaRow icon={<svg {...iconProps}><path d="M10 4 2 7l8 3 8-3-8-3Z" /><path d="M5 9v3.5c0 1 2.4 2 5 2s5-1 5-2V9" /></svg>}>
              BS Computer Science · Holy Cross College (2026)
            </MetaRow>
          </div>

          {/* Stack */}
          <div className="mt-5 pt-5 border-t border-border">
            <div className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-3">Core Stack</div>
            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <TechIcon key={tech.name} slug={tech.slug} name={tech.name} size="sm" />
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="mt-5 flex gap-2.5">
            <SocialButton href={GITHUB_URL} label="GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" /></svg>
              GitHub
            </SocialButton>
            <SocialButton href={LINKEDIN_URL} label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.3v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.4v6.3ZM5.5 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1ZM7.2 20.4H3.7V9h3.5v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V1.7C24 .8 23.2 0 22.2 0Z" /></svg>
              LinkedIn
            </SocialButton>
            <SocialButton href={GMAIL_COMPOSE} label="Email">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="14" height="10" rx="1.5" /><path d="m3.5 6 6.5 5 6.5-5" /></svg>
              Email
            </SocialButton>
          </div>
        </div>
      </div>
    </div>
  );
}
