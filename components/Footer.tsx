import { GITHUB_URL, LINKEDIN_URL } from '@/lib/site';

const socialClass =
  'font-mono text-[11px] tracking-[0.1em] text-text-2 no-underline hover:text-teal transition-colors';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center relative z-10">
      <div className="flex justify-center gap-6 mb-4">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={socialClass}>
          GitHub
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={socialClass}>
          LinkedIn
        </a>
        <a href="mailto:mangulabnan.bernard321@gmail.com" className={socialClass}>
          Email
        </a>
      </div>
      <p className="font-mono text-[11px] tracking-[0.1em] text-muted">
        &lt;<span className="text-teal">BCM</span>/&gt; &nbsp;·&nbsp; © 2026 Bernard C. Mangulabnan &nbsp;·&nbsp; Built with Next.js & ♥
      </p>
    </footer>
  );
}
