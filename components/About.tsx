import Image from 'next/image';
import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

type AboutProps = {
  summary?: boolean;
};

const HIGHLIGHTS = [
  { icon: '🎓', title: 'CS Student', subtitle: 'Holy Cross College · 2022–2026' },
  { icon: '⚡', title: 'Full Stack Developer', subtitle: 'React · Next.js · Node.js · TypeScript' },
  { icon: '📱', title: 'Mobile App Developer', subtitle: 'Flutter · React Native' },
  { icon: '🤖', title: 'AI-Augmented Developer', subtitle: 'Claude · Cursor · Windsurf · ChatGPT' },
  { icon: '☁️', title: 'Cloud & DevOps', subtitle: 'Vercel · AWS · Hostinger · Git' },
];

// Two overlapping, tilted portraits with a soft accent glow behind them.
function AboutPhotos() {
  return (
    <div className="relative w-full max-w-[400px] mx-auto md:mx-0 aspect-[4/5]">
      <div
        className="absolute inset-8 rounded-[40%] blur-3xl"
        style={{ background: 'var(--color-teal)', opacity: 0.12 }}
      />
      {/* Back photo */}
      <div className="absolute right-0 bottom-0 w-[60%] aspect-[3/4] rotate-3 rounded-[18px] overflow-hidden border-[5px] border-bg-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] z-10">
        <Image src="/imgs/ber2.png" alt="Bernard" fill sizes="(max-width: 768px) 50vw, 240px" className="object-cover" />
      </div>
      {/* Front photo */}
      <div className="absolute left-0 top-1 w-[60%] aspect-[3/4] -rotate-3 rounded-[18px] overflow-hidden border-[5px] border-bg-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] z-20">
        <Image src="/imgs/ber1.png" alt="Bernard" fill sizes="(max-width: 768px) 50vw, 240px" className="object-cover" priority />
      </div>
    </div>
  );
}

export default function About({ summary = false }: AboutProps) {
  return (
    <Section id="about">
      <RevealSection>
        <SectionHeader
          label={summary ? 'About' : 'About Me'}
          title={
            summary ? (
              <>Focused on fast, clean web products_</>
            ) : (
              <>
                Building Modern<br />Digital Solutions_
              </>
            )
          }
        />
      </RevealSection>

      {summary ? (
        <RevealSection className="about-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AboutPhotos />
          <div className="about-text">
            <p className="text-text-2 mb-6 text-[0.95rem] leading-[1.9]">
              I&apos;m a Web Developer from San Luis, Pampanga, Philippines. I build user-friendly,
              visually appealing websites and web apps that are fast, polished, and easy to use.
            </p>
            <div className="flex flex-col gap-2.5 mb-7">
              {HIGHLIGHTS.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="highlight-card bg-surface border border-border rounded-[12px] p-3.5 flex items-center gap-3 transition-colors hover:border-teal-3"
                >
                  <div className="highlight-icon text-[1.1rem] min-w-[34px] h-[34px] bg-teal/8 rounded-[8px] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[12px] font-semibold text-text">{item.title}</div>
                    <div className="text-[11px] text-muted">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
            >
              Read More
            </Link>
          </div>
        </RevealSection>
      ) : (
        <RevealSection className="about-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="about-text">
            <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
              I&apos;m a Web Developer from San Luis, Pampanga, Philippines. I build user-friendly, visually appealing websites and web apps that are fast, polished, and easy to use.
            </p>
            <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
              Proficient in HTML5, CSS3, JavaScript, React, Next.js, Node.js, and TypeScript. I also work with mobile development tools like Flutter and Dart, and back-end systems using PostgreSQL, Prisma, MySQL, and PHP.
            </p>
            <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
              I leverage AI tools such as Claude, Claude Code, ChatGPT, Cursor, and Windsurf to boost efficiency. I&apos;m a fast learner and collaborative team player ready to grow in a professional environment.
            </p>
            <div className="about-tags flex flex-wrap gap-2 mt-6">
              {['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Flutter', 'AI Tools', 'PostgreSQL', 'Prisma ORM'].map((tag) => (
                <span
                  key={tag}
                  className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="about-highlights flex flex-col gap-3">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3"
              >
                <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">{item.title}</div>
                  <div className="highlight-sub text-[11px] text-muted">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>
      )}

      {!summary && (
        <RevealSection className="about-extra grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: 'Design with clarity',
              description:
                'I create polished interfaces that feel modern and approachable while keeping accessibility and readability first.',
            },
            {
              title: 'Built for performance',
              description:
                'Every project is optimized for fast load times, responsive behavior, and smooth interactions across devices.',
            },
            {
              title: 'Delivered with care',
              description:
                'I follow clean code practices, consistent version control, and transparent communication from start to launch.',
            },
          ].map((card) => (
            <div key={card.title} className="feature-card bg-surface border border-border rounded-[14px] p-6 transition-colors hover:border-teal-3">
              <div className="font-mono text-[11px] text-teal uppercase tracking-[0.18em] mb-3">{card.title}</div>
              <p className="text-text-2 text-[0.95rem] leading-[1.8]">{card.description}</p>
            </div>
          ))}
        </RevealSection>
      )}
    </Section>
  );
}
