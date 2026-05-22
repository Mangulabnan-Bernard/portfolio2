import type { ReactNode } from 'react';

type SectionHeaderProps = {
  label: string;
  title: ReactNode;
};

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <>
      <div className="section-label font-mono text-[11px] tracking-[0.2em] text-teal-3 uppercase mb-[0.6rem] flex items-center gap-2">
        <span className="w-[20px] h-[1px] bg-teal-3"></span>
        {label}
      </div>
      <h2 className="section-title font-mono text-[2rem] font-bold text-text leading-[1.2] mb-12">
        {title}
      </h2>
    </>
  );
}
