import type { ReactNode } from 'react';

type ContactItemProps = {
  icon: string;
  label: string;
  children: ReactNode;
};

export default function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="contact-item flex items-center gap-3 mb-4">
      <div className="contact-item-icon w-[36px] h-[36px] rounded-[8px] bg-teal/8 border border-border flex items-center justify-center text-[1rem] flex-shrink-0">
        {icon}
      </div>
      <div className="contact-item-detail">
        <div className="contact-item-label font-mono text-[10px] text-muted tracking-[0.1em] uppercase">
          {label}
        </div>
        <div className="contact-item-value text-[13px] text-text-2">{children}</div>
      </div>
    </div>
  );
}
