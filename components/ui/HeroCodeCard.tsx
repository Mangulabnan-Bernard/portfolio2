'use client';

import { useEffect, useState } from 'react';

const COMMANDS = ['npm run build', 'git push origin main', 'vercel --prod', 'npm run dev'];

// Classic editor syntax palette — fixed (dark) regardless of site theme.
const C = {
  key: '#ff7b72',
  var: '#d2a8ff',
  prop: '#79c0ff',
  str: '#a5d6ff',
  bool: '#79c0ff',
  punc: '#8b949e',
};

const K = ({ children }: { children: React.ReactNode }) => <span style={{ color: C.key }}>{children}</span>;
const V = ({ children }: { children: React.ReactNode }) => <span style={{ color: C.var }}>{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span style={{ color: C.prop }}>{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span style={{ color: C.str }}>{children}</span>;
const Pu = ({ children }: { children: React.ReactNode }) => <span style={{ color: C.punc }}>{children}</span>;

const LINES: React.ReactNode[] = [
  <><K>const</K> <V>developer</V> <Pu>{'= {'}</Pu></>,
  <>{'  '}<P>name</P><Pu>:</Pu> <S>{"'Bernard C. Mangulabnan'"}</S><Pu>,</Pu></>,
  <>{'  '}<P>role</P><Pu>:</Pu> <S>{"'Full Stack Developer'"}</S><Pu>,</Pu></>,
  <>{'  '}<P>location</P><Pu>:</Pu> <S>{"'Pampanga, PH'"}</S><Pu>,</Pu></>,
  <>{'  '}<P>stack</P><Pu>:</Pu> <Pu>[</Pu><S>{"'Next.js'"}</S><Pu>,</Pu> <S>{"'React'"}</S><Pu>,</Pu></>,
  <>{'         '}<S>{"'TypeScript'"}</S><Pu>,</Pu> <S>{"'Flutter'"}</S><Pu>],</Pu></>,
  <>{'  '}<P>available</P><Pu>:</Pu> <span style={{ color: C.bool }}>true</span><Pu>,</Pu></>,
  <><Pu>{'};'}</Pu></>,
];

export default function HeroCodeCard() {
  const [text, setText] = useState('');
  const [cmd, setCmd] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = COMMANDS[cmd];
    const done = !deleting && text.length === full.length;
    const delay = done ? 1500 : deleting ? 35 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) setText(full.slice(0, text.length + 1));
        else setDeleting(true);
      } else if (text.length > 0) {
        setText(full.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setCmd((c) => (c + 1) % COMMANDS.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, cmd]);

  return (
    <div className="relative w-full max-w-[460px] mx-auto md:mx-0">
      <div className="absolute -inset-3 rounded-[24px] blur-3xl" style={{ background: 'var(--color-teal)', opacity: 0.1 }} />
      <div className="relative rounded-[12px] overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 h-10 bg-[#161b22] border-b border-[#30363d]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 font-mono text-[11px] text-[#8b949e]">bernard.ts</span>
        </div>

        {/* Code */}
        <div className="flex gap-4 px-4 md:px-5 py-5 font-mono text-[12px] md:text-[12.5px] leading-[1.75] overflow-x-auto">
          <div className="flex flex-col text-right text-[#484f58] select-none">
            {LINES.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className="flex flex-col whitespace-pre text-[#c9d1d9]">
            {LINES.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div className="px-4 md:px-5 py-3 border-t border-[#30363d] bg-[#010409] font-mono text-[12px]">
          <span style={{ color: '#27c93f' }}>~/portfolio</span>{' '}
          <span style={{ color: '#8b949e' }}>$</span>{' '}
          <span style={{ color: '#c9d1d9' }}>{text}</span>
          <span className="animate-blink" style={{ color: '#c9d1d9' }}>▋</span>
        </div>
      </div>
    </div>
  );
}
