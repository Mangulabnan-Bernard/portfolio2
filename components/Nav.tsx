'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
] as const;

const linkClassName =
  'font-mono text-[11px] tracking-[0.12em] text-text-2 no-underline uppercase hover:text-teal transition-colors';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 h-[60px] bg-bg/85 backdrop-blur-[20px] border-b border-border">
      <Link href="/" className="nav-logo font-mono text-[13px] tracking-[0.08em] text-teal font-semibold flex items-center gap-2 no-underline" onClick={closeMenu}>
        <span className="text-text-2">&lt;</span>BCM<span className="text-text-2">/&gt;</span>
      </Link>

      <div className="nav-links hidden md:flex gap-8">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={linkClassName} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="mailto:mangulabnan.bernard321@gmail.com"
          className="nav-cta font-mono text-[11px] tracking-[0.1em] px-[14px] md:px-[18px] py-[6px] border border-teal-3 text-teal bg-teal/5 no-underline rounded-[8px] transition-all hover:bg-teal/12 hover:border-teal"
        >
          Hire Me →
        </a>
        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-2 border border-border rounded-[8px] bg-surface cursor-pointer"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
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
          id="mobile-nav"
          className="absolute top-[60px] left-0 right-0 flex flex-col gap-1 p-4 bg-bg/97 border-b border-border md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={`${linkClassName} py-3 px-2`} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
