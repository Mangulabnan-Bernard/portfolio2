'use client';

import { useState } from 'react';

const SIZES = {
  sm: { box: 'w-7 h-7 rounded-[7px]', px: 18, text: 'text-[10px]' },
  md: { box: 'w-12 h-12 rounded-[11px]', px: 28, text: 'text-[13px]' },
  lg: { box: 'w-16 h-16 rounded-[14px]', px: 36, text: 'text-[16px]' },
} as const;

// Maps a Simple Icons slug → devicon icon path ("folder/file" without extension).
// Devicon (https://devicon.dev) ships full-color brand logos. Anything not listed
// here (PWA, ChatGPT/OpenAI, Hostinger, AWS, …) falls back to Simple Icons.
const DEVICON: Record<string, string> = {
  html5: 'html5/html5-original',
  css: 'css3/css3-original',
  javascript: 'javascript/javascript-original',
  typescript: 'typescript/typescript-original',
  react: 'react/react-original',
  nextdotjs: 'nextjs/nextjs-original',
  tailwindcss: 'tailwindcss/tailwindcss-original',
  flutter: 'flutter/flutter-original',
  dart: 'dart/dart-original',
  nodedotjs: 'nodejs/nodejs-original',
  express: 'express/express-original',
  prisma: 'prisma/prisma-original',
  mysql: 'mysql/mysql-original',
  php: 'php/php-original',
  tensorflow: 'tensorflow/tensorflow-original',
  git: 'git/git-original',
  github: 'github/github-original',
  vercel: 'vercel/vercel-original',
};

const deviconUrl = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;
const simpleIconsUrl = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

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
 * Renders a brand logo inside a light tile so even dark logos (Next.js, Vercel)
 * stay visible on the dark theme. Tries devicon first, then the Simple Icons CDN,
 * then falls back to monogram initials.
 */
export default function TechIcon({ slug, name, size = 'sm' }: TechIconProps) {
  const s = SIZES[size];

  // Ordered list of logo URLs to try: devicon → Simple Icons.
  const sources: string[] = [];
  if (slug && DEVICON[slug]) sources.push(deviconUrl(DEVICON[slug]));
  if (slug) sources.push(simpleIconsUrl(slug));

  const [idx, setIdx] = useState(0);
  const src = sources[idx];

  return (
    <span className={`grid place-items-center ${s.box} bg-white/95 shrink-0 shadow-sm ring-1 ring-black/5`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          width={s.px}
          height={s.px}
          loading="lazy"
          onError={() => setIdx((i) => i + 1)}
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
