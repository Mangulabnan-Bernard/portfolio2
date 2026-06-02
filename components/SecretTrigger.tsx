'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Type this word anywhere on the site to unlock the private dashboard.
// (The password on /insights is the real security — this is the hidden door.)
const SECRET_WORD = 'schneizel';
export const INSIGHTS_UNLOCK_KEY = 'insights-open';

export default function SecretTrigger() {
  const router = useRouter();

  useEffect(() => {
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Ignore keystrokes while typing in form fields.
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-SECRET_WORD.length);
        if (buffer === SECRET_WORD) {
          try {
            sessionStorage.setItem(INSIGHTS_UNLOCK_KEY, '1');
          } catch {
            /* storage blocked — page will still load via the word this session */
          }
          router.push('/insights');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  return null;
}
