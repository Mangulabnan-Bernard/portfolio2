'use client';

import { useEffect } from 'react';

export default function Pwa() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Only run the PWA service worker in production. In dev it caches
    // JS/CSS chunks behind the scenes, so edits can keep showing stale
    // output in the browser even after the dev server has the new code.
    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((error) => console.error('Service worker registration failed:', error));
    });
  }, []);

  return null;
}
