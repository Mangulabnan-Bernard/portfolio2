'use client';

import { useEffect, useState } from 'react';

/**
 * Site-wide scroll affordances:
 *  - a thin teal progress bar pinned to the very top showing how far down the
 *    page you've scrolled, and
 *  - a back-to-top button that fades in once you've scrolled a screenful.
 *
 * Both are driven by a single passive scroll listener and respect the user's
 * reduced-motion preference for the scroll-to-top animation.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const scrolled = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      setProgress(scrolled);
      setShowTop(doc.scrollTop > doc.clientHeight * 0.6);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* Progress bar — sits above the nav's top edge. */}
      <div className="fixed top-0 left-0 right-0 z-[120] h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-teal origin-left transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${progress})`,
            boxShadow: '0 0 8px -1px var(--color-teal)',
          }}
        />
      </div>

      {/* Back-to-top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-teal-3 bg-surface/80 text-teal backdrop-blur-md transition-all duration-300 hover:border-teal hover:-translate-y-0.5 ${
          showTop ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 16V5" />
          <path d="m5 10 5-5 5 5" />
        </svg>
      </button>
    </>
  );
}
