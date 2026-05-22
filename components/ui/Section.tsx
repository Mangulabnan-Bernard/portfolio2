import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
};

export default function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="max-w-[1080px] mx-auto px-8 py-28 scroll-mt-[80px]">
      {children}
    </section>
  );
}
