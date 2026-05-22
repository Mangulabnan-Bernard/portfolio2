import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

export default function About() {
  return (
    <Section id="about">
      <RevealSection>
        <SectionHeader
          label="About Me"
          title={
            <>
              Building Modern<br />Digital Solutions_
            </>
          }
        />
      </RevealSection>
      <RevealSection className="about-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="about-text">
          <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
            I&apos;m a Web Developer from Pampanga, Philippines, currently completing my BS in Computer Science at Holy Cross College. I love turning ideas into fast, good-looking digital products.
          </p>
          <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
            My stack covers the full cycle: from designing responsive UIs with React and Tailwind CSS, to building APIs with Node.js and Express, to shipping on Vercel, Hostinger, or AWS. I also use AI coding tools — Cursor, Windsurf, Claude Code, ChatGPT — to work smarter and faster.
          </p>
          <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
            I&apos;m a fast learner, collaborative team player, and always looking to grow through real-world challenges.
          </p>
          <div className="about-tags flex flex-wrap gap-2 mt-6">
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">React</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">Next.js</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">TypeScript</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">Node.js</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">Flutter</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">AI Tools</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">PostgreSQL</span>
            <span className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase">Tailwind CSS</span>
          </div>
        </div>
        <div className="about-highlights flex flex-col gap-3">
          <div className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3">
            <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">🎓</div>
            <div>
              <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">CS Student</div>
              <div className="highlight-sub text-[11px] text-muted">Holy Cross College · 2022–2026</div>
            </div>
          </div>
          <div className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3">
            <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">⚡</div>
            <div>
              <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">Full Stack Developer</div>
              <div className="highlight-sub text-[11px] text-muted">React · Next.js · Node.js · TypeScript</div>
            </div>
          </div>
          <div className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3">
            <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">📱</div>
            <div>
              <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">Mobile App Developer</div>
              <div className="highlight-sub text-[11px] text-muted">Flutter · React Native</div>
            </div>
          </div>
          <div className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3">
            <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">🤖</div>
            <div>
              <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">AI-Augmented Developer</div>
              <div className="highlight-sub text-[11px] text-muted">Claude · Cursor · Windsurf · ChatGPT</div>
            </div>
          </div>
          <div className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3">
            <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">☁️</div>
            <div>
              <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">Cloud & DevOps</div>
              <div className="highlight-sub text-[11px] text-muted">Vercel · AWS · Hostinger · Git</div>
            </div>
          </div>
        </div>
      </RevealSection>
    </Section>
  );
}
