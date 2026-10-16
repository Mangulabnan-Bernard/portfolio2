'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

type Item = { href: string; label: string };

const NAV: Item[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);
  const handleNav = (href: string) => (e: React.MouseEvent) => {
    closeMenu();
    if (href === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 h-[60px] bg-bg/85 backdrop-blur-[20px] border-b border-border">
      <Link href="/" className="nav-logo font-mono text-[13px] tracking-[0.04em] text-text font-semibold flex items-center gap-1 no-underline" onClick={handleNav('/')}>
        bcm<span className="text-teal">::</span>graph
      </Link>

      <div className="hidden lg:flex items-center gap-1">
        {NAV.map((n) => {
          const isActive = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={handleNav(n.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-[6px] px-3.5 py-2 font-sans text-[13px] font-semibold no-underline transition-colors ${
                isActive ? 'bg-teal/14 text-text' : 'text-text-2 hover:bg-surface hover:text-text'
              }`}
            >
              {n.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/BernardMangulabnan.pdf"
          download
          className="hidden md:inline-flex items-center font-mono text-[11.5px] font-semibold px-4 py-2 bg-teal/14 border border-teal text-teal rounded-[6px] no-underline transition-colors hover:bg-teal/22"
        >
          ./résumé
        </a>
        <button
          type="button"
          className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-2 border border-border rounded-[8px] bg-surface cursor-pointer transition-colors hover:border-teal-3"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block h-[2px] w-full bg-teal transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-[2px] w-full bg-teal transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-[2px] w-full bg-teal transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div
          id="nav-menu"
          className="absolute top-[66px] right-4 md:right-10 z-[110] bg-surface border border-border rounded-[12px] p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] flex flex-col gap-3 min-w-[210px]"
        >
          <div className="lg:hidden flex flex-col gap-1 pb-3 mb-1 border-b border-border">
            {NAV.map((n) => {
              const isActive = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={handleNav(n.href)}
                  className={`py-2 px-2 rounded-[6px] font-sans text-[13px] font-semibold no-underline transition-colors ${
                    isActive ? 'bg-teal/14 text-text' : 'text-text-2 hover:text-text'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <a
              href="/BernardMangulabnan.pdf"
              download
              className="mt-1 py-2 px-2 rounded-[6px] font-mono text-[12px] font-bold text-teal no-underline"
            >
              Download Résumé ↓
            </a>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">Theme</span>
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
