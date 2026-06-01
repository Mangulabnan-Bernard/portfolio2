'use client';

import { useState } from 'react';

const SIZES = {
  sm: { box: 'w-7 h-7 rounded-[7px]', px: 18, text: 'text-[10px]' },
  md: { box: 'w-12 h-12 rounded-[11px]', px: 28, text: 'text-[13px]' },
  lg: { box: 'w-16 h-16 rounded-[14px]', px: 36, text: 'text-[16px]' },
} as const;

type TechIconProps = {
  /** Simple Icons slug, e.g. "nextdotjs". Omit for skills with no brand logo. */
  slug?: string;
  name: string;
  size?: keyof typeof SIZES;
};

function initials(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9+#]/g, '');
  return cleaned.slice(0, 2).toUpperCase() || '•';
}

/**
 * Renders a brand logo from the Simple Icons CDN inside a light tile so even
 * dark logos (Next.js, Vercel) stay visible on the dark theme. Falls back to
 * monogram initials when there's no slug or the icon fails to load.
 */
export default function TechIcon({ slug, name, size = 'sm' }: TechIconProps) {
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];

  return (
    <span className={`grid place-items-center ${s.box} bg-white/95 shrink-0 shadow-sm ring-1 ring-black/5`}>
      {slug && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${slug}`}
          alt={`${name} logo`}
          width={s.px}
          height={s.px}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: s.px, height: s.px }}
        />
      ) : (
        <span className={`font-mono ${s.text} font-bold text-bg leading-none`}>
          {initials(name)}
        </span>
      )}
    </span>
  );
}
