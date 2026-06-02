'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProjectCoverProps = {
  title: string;
  badge: string;
  accent?: string;
  /** Explicit cover image; takes priority over a live screenshot. */
  image?: string;
  /** Live site URL — used to auto-generate a screenshot when no image is set. */
  liveUrl?: string;
  /** Screenshots to fan out as tilted phones on the cover (mobile projects). */
  collage?: string[];
  /** Hide the gradient-fallback title (when the caller renders its own). */
  hideTitle?: boolean;
  /** Hide the corner badge (for small thumbnails). */
  hideBadge?: boolean;
  className?: string;
};

// Microlink's free screenshot endpoint returns the rendered screenshot image
// directly (via ?embed=screenshot.url), so it can be used straight as an <img>.
function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url`;
}

function Phone({
  src,
  alt,
  style,
  className = '',
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={style}
      className={`relative w-[100px] sm:w-[116px] aspect-[9/19.5] rounded-[20px] border-[5px] border-bg-3 bg-bg-3 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] overflow-hidden ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="120px" className="object-cover object-top" />
    </div>
  );
}

export default function ProjectCover({
  title,
  badge,
  accent = '#00e5a0',
  image,
  liveUrl,
  collage,
  hideTitle = false,
  hideBadge = false,
  className = '',
}: ProjectCoverProps) {
  const [failed, setFailed] = useState(false);
  const src = image ?? (liveUrl ? screenshotUrl(liveUrl) : undefined);
  const showImage = Boolean(src) && !failed;
  const phones = collage?.slice(0, 3) ?? [];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accent}26, transparent 55%), var(--color-bg-3)`,
      }}
    >
      {/* Phone collage takes priority for mobile-app projects */}
      {phones.length > 0 ? (
        <>
          {/* faint grid + accent glow behind the phones */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          <div
            className="absolute right-[14%] bottom-[-30%] w-64 h-64 rounded-full blur-3xl opacity-40"
            style={{ background: accent }}
          />
          <div className="absolute inset-0 flex items-end justify-center md:justify-end md:pr-14 transition-transform duration-500 group-hover:-translate-y-1">
            {phones[1] && (
              <Phone
                src={phones[1]}
                alt={`${title} screenshot 2`}
                className="-mr-5 z-10"
                style={{ transform: 'rotate(-9deg) translateY(48px)', transformOrigin: 'bottom center' }}
              />
            )}
            {phones[0] && (
              <Phone
                src={phones[0]}
                alt={`${title} screenshot 1`}
                className="z-20"
                style={{ transform: 'translateY(30px)' }}
              />
            )}
            {phones[2] && (
              <Phone
                src={phones[2]}
                alt={`${title} screenshot 3`}
                className="-ml-5 z-10"
                style={{ transform: 'rotate(9deg) translateY(48px)', transformOrigin: 'bottom center' }}
              />
            )}
          </div>
        </>
      ) : showImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${title} preview`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/15 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />
          {!hideTitle && (
            <span className="absolute bottom-3 left-4 right-4 z-10 font-mono text-[15px] font-bold text-text/85 leading-tight">
              {title}
            </span>
          )}
        </>
      )}

      {!hideBadge && (
        <span
          className="absolute top-3 left-3 z-30 font-mono text-[9px] tracking-[0.15em] px-2 py-1 rounded-[20px] uppercase backdrop-blur-sm"
          style={{ background: `${accent}24`, border: `1px solid ${accent}45`, color: accent }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
