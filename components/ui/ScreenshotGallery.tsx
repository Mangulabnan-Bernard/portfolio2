'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ScreenshotGalleryProps = {
  images: string[];
  label: string;
  accent?: string;
};

export default function ScreenshotGallery({ images, label, accent = '#00e5a0' }: ScreenshotGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = useCallback((delta: number) => setIndex((p) => (p + delta + count) % count), [count]);

  // Keyboard nav + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go]);

  const open0 = () => {
    setIndex(0);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={open0}
        className="project-link font-mono text-[10px] tracking-[0.08em] px-3 py-1 border border-teal-3 text-teal bg-teal/8 rounded-[6px] cursor-pointer transition-colors hover:bg-teal/15 inline-flex items-center gap-1.5"
      >
        <span aria-hidden="true">🖼</span> Screenshots
        <span className="text-text-3">({count})</span>
      </button>

      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${label} screenshots`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white text-xl cursor-pointer transition-colors hover:bg-white/20"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous screenshot"
              className="absolute left-3 sm:left-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl cursor-pointer transition-colors hover:bg-white/20"
            >
              ‹
            </button>

            {/* Image + counter (clicks here don't close) */}
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4">
              <div className="relative w-[min(86vw,340px)] h-[76vh]">
                <Image
                  src={images[index]}
                  alt={`${label} screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 86vw, 340px"
                  priority
                  className="object-contain rounded-[18px]"
                />
              </div>
              <div className="flex items-center gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setIndex(idx)}
                    aria-label={`Go to screenshot ${idx + 1}`}
                    aria-current={idx === index}
                    className="h-1.5 rounded-full transition-all cursor-pointer"
                    style={{
                      width: idx === index ? 20 : 7,
                      background: idx === index ? accent : 'rgba(255,255,255,0.35)',
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-white/70 tracking-[0.1em]">
                {index + 1} / {count}
              </span>
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next screenshot"
              className="absolute right-3 sm:right-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl cursor-pointer transition-colors hover:bg-white/20"
            >
              ›
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
