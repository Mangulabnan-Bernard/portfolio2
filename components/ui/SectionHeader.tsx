import type { ReactNode } from 'react';

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
  /** Optional section number (e.g. "01") shown before the label. */
  number?: string;
};

export default function SectionHeader({ label, title, number }: SectionHeaderProps) {
  return (
    <>
      <div className="section-label font-mono text-[10.5px] tracking-[0.08em] text-teal uppercase mb-3">
        {'// '}{number && <span className="text-teal-2">{number} </span>}{label}
      </div>
      <h2 className="section-title font-sans text-[2rem] font-black text-text leading-[1.15] tracking-[-0.01em] mb-12">
        {title}
      </h2>
    </>
  );
}
