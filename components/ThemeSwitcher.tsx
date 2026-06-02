'use client';

import { useEffect, useState } from 'react';

type ThemeId = 'green' | 'orange' | 'blue' | 'light';

const THEMES: { id: ThemeId; label: string; swatch: string; meta: string }[] = [
  { id: 'green', label: 'Green', swatch: '#00e5a0', meta: '#090e0c' },
  { id: 'orange', label: 'Orange', swatch: '#ff8c42', meta: '#0f0a06' },
  { id: 'blue', label: 'Blue', swatch: '#3b9eff', meta: '#070a0f' },
  { id: 'light', label: 'Light', swatch: '#e6ebe8', meta: '#fafbfb' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>('blue');

  // Sync the control with whatever the no-flash boot script already applied.
  // Done post-hydration (not during render) so server/client markup matches.
  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as ThemeId) || 'blue';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  const apply = (id: ThemeId) => {
    setTheme(id);
    document.documentElement.setAttribute('data-theme', id);
    try {
      localStorage.setItem('theme', id);
    } catch {
      /* storage blocked — theme still applies for this session */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    const next = THEMES.find((t) => t.id === id);
    if (meta && next) meta.setAttribute('content', next.meta);
  };

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label="Color theme"
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => apply(t.id)}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.id}
          title={`${t.label} theme`}
          className={`w-[18px] h-[18px] rounded-full cursor-pointer transition-transform hover:scale-110 ${
            theme === t.id
              ? 'ring-2 ring-offset-2 ring-offset-bg ring-teal scale-110'
              : 'ring-1 ring-border'
          }`}
          style={{ background: t.swatch }}
        />
      ))}
    </div>
  );
}
