'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PhotoGallery({ images, label = 'Photo' }: { images: string[]; label?: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = useCallback((d: number) => setIndex((p) => (p + d + count) % count), [count]);

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

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="group relative aspect-[4/3] rounded-[12px] overflow-hidden border border-border cursor-pointer"
          >
            <Image
              src={src}
              alt={`${label} ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/15 transition-colors" />
          </button>
        ))}
      </div>

      {open &&
        createPortal(
          <div
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${label} gallery`}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          >
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute top-4 right-4 z-10 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white text-xl cursor-pointer transition-colors hover:bg-white/20">
              ✕
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="absolute left-3 sm:left-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl cursor-pointer transition-colors hover:bg-white/20">
              ‹
            </button>
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3">
              <div className="relative w-[min(92vw,1000px)] h-[80vh]">
                <Image src={images[index]} alt={`${label} ${index + 1}`} fill sizes="92vw" priority className="object-contain rounded-[10px]" />
              </div>
              <span className="font-mono text-[11px] text-white/70 tracking-[0.1em]">{index + 1} / {count}</span>
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="absolute right-3 sm:right-6 z-10 w-11 h-11 grid place-items-center rounded-full bg-white/10 text-white text-2xl cursor-pointer transition-colors hover:bg-white/20">
              ›
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
