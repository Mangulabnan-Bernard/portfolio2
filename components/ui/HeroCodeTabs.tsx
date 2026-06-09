'use client';

import { useState } from 'react';

// Syntax palette — driven by the same CSS vars as the rest of the code theming.
const K = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--code-key)' }}>{children}</span>;
const V = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--code-var)' }}>{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--code-prop)' }}>{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--code-str)' }}>{children}</span>;
const Pu = ({ children }: { children: React.ReactNode }) => <span style={{ color: 'var(--code-punc)' }}>{children}</span>;

// Renders `prop: ['a', 'b', 'c'],`
function ArrLine({ prop, items }: { prop: string; items: string[] }) {
  return (
    <>
      {'  '}
      <P>{prop}</P>
      <Pu>:</Pu> <Pu>[</Pu>
      {items.map((it, i) => (
        <span key={it}>
          <S>{`'${it}'`}</S>
          {i < items.length - 1 ? <Pu>, </Pu> : null}
        </span>
      ))}
      <Pu>],</Pu>
    </>
  );
}

// Renders `prop: 'value',`
function StrLine({ prop, value }: { prop: string; value: string }) {
  return (
    <>
      {'  '}
      <P>{prop}</P>
      <Pu>:</Pu> <S>{`'${value}'`}</S>
      <Pu>,</Pu>
    </>
  );
}

type Tab = { file: string; lines: React.ReactNode[] };

const TABS: Tab[] = [
  {
    file: 'profile.ts',
    lines: [
      <><K>const</K> <V>profile</V> <Pu>{'= {'}</Pu></>,
      <StrLine prop="name" value="Bernard C. Mangulabnan" />,
      <StrLine prop="role" value="Full Stack Web & Mobile Developer" />,
      <StrLine prop="location" value="San Luis, Pampanga, PH" />,
      <StrLine prop="education" value="BS Computer Science · 2026" />,
      <>{'  '}<P>available</P><Pu>:</Pu> <span style={{ color: 'var(--code-prop)' }}>true</span><Pu>,</Pu></>,
      <Pu>{'};'}</Pu>,
    ],
  },
  {
    file: 'skills.ts',
    lines: [
      <><K>const</K> <V>skills</V> <Pu>{'= {'}</Pu></>,
      <ArrLine prop="frontend" items={['React', 'Next.js', 'TypeScript']} />,
      <ArrLine prop="mobile" items={['Flutter', 'Dart']} />,
      <ArrLine prop="backend" items={['Node.js', 'Express', 'Prisma']} />,
      <ArrLine prop="database" items={['MySQL', 'PHP']} />,
      <ArrLine prop="tools" items={['Git', 'Vercel', 'AWS']} />,
      <Pu>{'};'}</Pu>,
    ],
  },
  {
    file: 'contact.ts',
    lines: [
      <><K>const</K> <V>contact</V> <Pu>{'= {'}</Pu></>,
      <StrLine prop="email" value="mangulabnan.bernard321@gmail.com" />,
      <StrLine prop="github" value="@Mangulabnan-Bernard" />,
      <StrLine prop="linkedin" value="in/bernard-mangulabnan" />,
      <StrLine prop="status" value="open to opportunities" />,
      <Pu>{'};'}</Pu>,
    ],
  },
];

export default function HeroCodeTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div className="relative w-full max-w-[460px] mx-auto md:mx-0">
      <div className="absolute -inset-3 rounded-[24px] blur-3xl" style={{ background: 'var(--color-teal)', opacity: 0.1 }} />

      <div className="relative rounded-[12px] overflow-hidden border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-[var(--code-titlebar)] border-b border-[var(--code-border)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--code-punc)]">~/bernard</span>
        </div>

        {/* Tab strip */}
        <div className="flex bg-[var(--code-titlebar)] border-b border-[var(--code-border)]">
          {TABS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.file}
                type="button"
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] border-t-2 transition-colors ${
                  isActive
                    ? 'bg-[var(--code-bg)] text-[var(--code-base)] border-teal'
                    : 'text-[var(--code-punc)] border-transparent hover:text-[var(--code-base)]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: '#3178c6' }} />
                {t.file}
              </button>
            );
          })}
        </div>

        {/* Code body */}
        <div className="h-[250px] md:h-[270px] overflow-hidden px-4 md:px-5 py-4 font-mono text-[12px] md:text-[12.5px] leading-[1.85]">
          <div className="flex gap-4">
            <div className="flex flex-col text-right text-[var(--code-line)] select-none">
              {tab.lines.map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="flex flex-col whitespace-pre">
              {tab.lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
