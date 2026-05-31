import Link from 'next/link';
import RevealSection from '@/components/RevealSection';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

type AboutProps = {
  summary?: boolean;
};

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

      <RevealSection className="about-grid grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="about-text">
          <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
            I&apos;m a Web Developer from San Luis, Pampanga, Philippines. I build user-friendly, visually appealing websites and web apps that are fast, polished, and easy to use.
          </p>

          {!summary ? (
            <>
              <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
                Proficient in HTML5, CSS3, JavaScript, React, Next.js, Node.js, and TypeScript. I also work with mobile development tools like Flutter and Dart, and back-end systems using PostgreSQL, Drizzle ORM, Prisma, MySQL, and PHP.
              </p>
              <p className="text-text-2 mb-5 text-[0.95rem] leading-[1.9]">
                I leverage AI tools such as Claude, Claude Code, ChatGPT, Cursor, and Windsurf to boost efficiency. I&apos;m a fast learner and collaborative team player ready to grow in a professional environment.
              </p>
              <div className="about-tags flex flex-wrap gap-2 mt-6">
                {[
                  'HTML5',
                  'CSS3',
                  'JavaScript',
                  'TypeScript',
                  'React',
                  'Next.js',
                  'Tailwind CSS',
                  'Node.js',
                  'Flutter',
                  'AI Tools',
                  'PostgreSQL',
                  'Prisma ORM',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="tag font-mono text-[10px] tracking-[0.1em] px-3 py-1 border border-border text-text-2 rounded-[20px] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <Link
              href="/about"
              className="inline-flex items-center justify-center font-mono text-[12px] tracking-[0.1em] px-6 py-3 bg-teal text-bg border-none rounded-[8px] cursor-pointer no-underline font-bold transition-all hover:bg-teal-hover"
            >
              Read More
            </Link>
          )}
        </div>

        <div className="about-highlights flex flex-col gap-3">
          {[
            {
              icon: '🎓',
              title: 'CS Student',
              subtitle: 'Holy Cross College · 2022–2026',
            },
            {
              icon: '⚡',
              title: 'Full Stack Developer',
              subtitle: 'React · Next.js · Node.js · TypeScript',
            },
            {
              icon: '📱',
              title: 'Mobile App Developer',
              subtitle: 'Flutter · React Native',
            },
            {
              icon: '🤖',
              title: 'AI-Augmented Developer',
              subtitle: 'Claude · Cursor · Windsurf · ChatGPT',
            },
            !summary && {
              icon: '☁️',
              title: 'Cloud & DevOps',
              subtitle: 'Vercel · AWS · Hostinger · Git',
            },
          ]
            .filter(Boolean)
            .map((item) => (
              <div
                key={(item as { title: string }).title}
                className="highlight-card bg-surface border border-border rounded-[14px] p-5 flex items-start gap-3 transition-colors hover:border-teal-3"
              >
                <div className="highlight-icon text-[1.3rem] min-w-[36px] h-[36px] bg-teal/8 rounded-[8px] flex items-center justify-center">
                  {(item as { icon: string }).icon}
                </div>
                <div>
                  <div className="highlight-title font-mono text-[12px] font-semibold text-text mb-[2px]">
                    {(item as { title: string }).title}
                  </div>
                  <div className="highlight-sub text-[11px] text-muted">
                    {(item as { subtitle: string }).subtitle}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </RevealSection>

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
