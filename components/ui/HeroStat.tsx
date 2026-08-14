'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type HeroStatProps = {
  value: number | string;
  label: string;
  /** Animate numeric values on scroll into view. */
  animate?: boolean;
};

export default function HeroStat({ value, label, animate = true }: HeroStatProps) {
  const { ref, isVisible } = useScrollReveal();
  const [display, setDisplay] = useState<number | string>(
    typeof value === 'number' && animate ? 0 : value
  );

  useEffect(() => {
    if (typeof value !== 'number' || !animate || !isVisible) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, isVisible, value]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-num font-mono text-[1.8rem] font-bold text-teal leading-none">{display}</div>
      <div className="stat-label text-[12px] text-muted mt-1">{label}</div>
    </div>
  );
}
