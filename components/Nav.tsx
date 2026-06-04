'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

type Item = { href: string; label: string; icon: 'home' | 'user' | 'work' | 'code' | 'grid' | 'mail' };

const NAV: Item[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/about', label: 'About', icon: 'user' },
  { href: '/experience', label: 'Experience', icon: 'work' },
  { href: '/skills', label: 'Skills', icon: 'code' },
  { href: '/projects', label: 'Projects', icon: 'grid' },
  { href: '/contact', label: 'Contact', icon: 'mail' },
];

function Icon({ name }: { name: Item['icon'] }) {
  const c = {
    width: 22,
    height: 22,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'home':
      return (<svg {...c}><path d="M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1V9.5Z" /></svg>);
    case 'user':
      return (<svg {...c}><circle cx="10" cy="7" r="3" /><path d="M4.5 16a5.5 5.5 0 0 1 11 0" /></svg>);
    case 'work':
      return (<svg {...c}><rect x="3" y="6.5" width="14" height="9.5" rx="1.5" /><path d="M7 6.5V5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" /></svg>);
    case 'code':
      return (<svg {...c}><path d="m7 7-3 3 3 3" /><path d="m13 7 3 3-3 3" /></svg>);
    case 'grid':
      return (<svg {...c}><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="11" y="3" width="6" height="6" rx="1" /><rect x="3" y="11" width="6" height="6" rx="1" /><rect x="11" y="11" width="6" height="6" rx="1" /></svg>);
    case 'mail':
      return (<svg {...c}><rect x="3" y="5" width="14" height="10" rx="1.5" /><path d="m3.5 6 6.5 5 6.5-5" /></svg>);
  }
}

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
      <Link href="/" className="nav-logo font-mono text-[13px] tracking-[0.08em] text-teal font-semibold flex items-center gap-2 no-underline" onClick={handleNav('/')}>
        <span className="text-text-2">&lt;</span>BCM<span className="text-text-2">/&gt;</span>
      </Link>

      {/* Centered dock nav */}
      <div className="hidden md:flex items-center gap-3.5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {NAV.map((n) => {
          const isActive = pathname === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={handleNav(n.href)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={n.label}
              className={`group flex items-center gap-2 rounded-full transition-all duration-300 ease-out no-underline ${
                isActive ? 'bg-teal text-bg px-6 py-3' : 'text-text-2 hover:text-teal px-4 py-3'
              }`}
              style={isActive ? { boxShadow: '0 0 18px -5px var(--color-teal)' } : undefined}
            >
              <Icon name={n.icon} />
              {isActive && <span className="font-mono text-[13px] tracking-[0.06em] font-bold">{n.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className="flex flex-col justify-center gap-[5px] w-9 h-9 p-2 border border-border rounded-[8px] bg-surface cursor-pointer transition-colors hover:border-teal-3"
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
          {/* Page links — mobile only (desktop has the centered nav) */}
          <div className="md:hidden flex flex-col gap-1 pb-3 mb-1 border-b border-border">
            {NAV.map((n) => {
              const isActive = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={handleNav(n.href)}
                  className={`flex items-center gap-3 py-2 px-1 font-mono text-[11px] tracking-[0.12em] uppercase no-underline transition-colors ${
                    isActive ? 'text-teal' : 'text-text-2 hover:text-teal'
                  }`}
                >
                  <Icon name={n.icon} />
                  {n.label}
                </Link>
              );
            })}
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
