'use client';

import { useEffect, useState } from 'react';

type Line = { kind: 'cmd' | 'out'; text: string; accent?: boolean };

// The boot sequence. `cmd` lines type out slowly behind a prompt; `out` lines
// print fast as the "response".
const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Bernard C. Mangulabnan' },
  { kind: 'cmd', text: 'cat role.txt' },
  { kind: 'out', text: 'Full Stack Web & Mobile Developer' },
  { kind: 'cmd', text: 'load --stack' },
  { kind: 'out', text: 'React · Next.js · TypeScript · Flutter · Node.js  ✓', accent: true },
  { kind: 'cmd', text: 'scan ./projects' },
  { kind: 'out', text: '8 shipped projects found  ✓', accent: true },
  { kind: 'cmd', text: 'status' },
  { kind: 'out', text: '● available for new projects', accent: true },
];

function Prompt() {
  return (
    <>
      <span style={{ color: 'var(--code-prompt)' }}>visitor@bernard</span>
      <span style={{ color: 'var(--code-punc)' }}>:~$</span>{' '}
    </>
  );
}

function LineView({ line, text }: { line: Line; text: string }) {
  if (line.kind === 'cmd') {
    return (
      <div>
        <Prompt />
        <span style={{ color: 'var(--code-base)' }}>{text}</span>
      </div>
    );
  }
  return (
    <div className="mb-1.5 pl-[2px]" style={{ color: line.accent ? 'var(--color-teal)' : 'var(--code-punc)' }}>
      {text}
    </div>
  );
}

export default function HeroBootTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const done = lineIdx >= SCRIPT.length;

  useEffect(() => {
    if (done) return;
    const line = SCRIPT[lineIdx];
    const isCmd = line.kind === 'cmd';

    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), isCmd ? 42 : 10);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, isCmd ? 240 : 430);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx, done]);

  return (
    <div className="relative w-full max-w-[460px] mx-auto md:mx-0">
      <div className="absolute -inset-3 rounded-[24px] blur-3xl" style={{ background: 'var(--color-teal)', opacity: 0.1 }} />

      <div className="relative rounded-[12px] overflow-hidden border border-[var(--code-border)] bg-[var(--code-bg)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-[var(--code-titlebar)] border-b border-[var(--code-border)]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[var(--code-punc)]">bernard@portfolio: ~</span>
        </div>

        {/* Boot log */}
        <div className="h-[280px] md:h-[300px] overflow-hidden px-4 md:px-5 py-4 font-mono text-[12px] md:text-[12.5px] leading-[1.75]">
          {SCRIPT.map((line, i) => {
            if (i > lineIdx) return null;
            const text = i < lineIdx ? line.text : line.text.slice(0, charIdx);
            return <LineView key={i} line={line} text={text} />;
          })}

          {/* Trailing blinking prompt once the sequence finishes */}
          {done && (
            <div>
              <Prompt />
              <span className="inline-block w-[8px] h-[15px] align-middle bg-[var(--code-prompt)] animate-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
