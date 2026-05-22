'use client';

import type { HTMLAttributes } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type RevealSectionProps = HTMLAttributes<HTMLDivElement>;

export default function RevealSection({ children, className = '', ...props }: RevealSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
