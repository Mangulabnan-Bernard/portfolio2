'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01xX$%&abcdef';

type Q = { from: string; to: string; start: number; end: number; char: string };

// A self-contained "decrypting text" engine driving a React state setter.
class Scrambler {
  setOut: (s: string) => void;
  queue: Q[] = [];
  frame = 0;
  req = 0;
  text = '';
  resolve: (() => void) | null = null;

  constructor(setOut: (s: string) => void) {
    this.setOut = setOut;
    this.update = this.update.bind(this);
  }

  setText(newText: string) {
    const old = this.text;
    const length = Math.max(old.length, newText.length);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = old[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 36);
      const end = start + Math.floor(Math.random() * 36) + 12;
      this.queue.push({ from, to, start, end, char: '' });
    }
    cancelAnimationFrame(this.req);
    this.frame = 0;
    this.text = newText;
    return new Promise<void>((res) => {
      this.resolve = res;
      this.update();
    });
  }

  update() {
    let out = '';
    let done = 0;
    for (const q of this.queue) {
      if (this.frame >= q.end) {
        done++;
        out += q.to;
      } else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) q.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        out += `<span style="color:var(--color-teal);opacity:.65">${q.char}</span>`;
      } else {
        out += q.from;
      }
    }
    this.setOut(out);
    if (done === this.queue.length) {
      this.resolve?.();
    } else {
      this.frame++;
      this.req = requestAnimationFrame(this.update);
    }
  }

  stop() {
    cancelAnimationFrame(this.req);
  }
}

type Props = {
  phrases: string[];
  loop?: boolean;
  holdMs?: number;
  className?: string;
};

export default function ScrambleText({ phrases, loop = false, holdMs = 2200, className }: Props) {
  const [html, setHtml] = useState(phrases[0]);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const s = new Scrambler(setHtml);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const run = async () => {
      let i = 0;
      // Decode the first phrase in from scratch.
      s.text = '';
      await s.setText(phrases[0]);
      if (!loop) return;
      while (!cancelled) {
        await new Promise<void>((r) => {
          timer = setTimeout(r, holdMs);
        });
        if (cancelled) break;
        i = (i + 1) % phrases.length;
        await s.setText(phrases[i]);
      }
    };
    run();

    return () => {
      cancelled = true;
      s.stop();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
