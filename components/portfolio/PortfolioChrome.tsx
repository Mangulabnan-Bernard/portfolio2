'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NAV = [
  { href: '/', label: 'HOME', key: 'home' },
  { href: '/profile#experience', label: 'WORK', key: 'experience' },
  { href: '/work', label: 'PROJECTS', key: 'work' },
  { href: '/profile', label: 'PROFILE', key: 'profile' },
  { href: '/contact', label: 'CONTACT', key: 'contact' },
];

type HeartState = { count: number; hearted: boolean };

function sectionFor(pathname: string) {
  if (pathname === '/') return 'home';
  if (pathname === '/work' || pathname.startsWith('/projects')) return 'work';
  if (pathname === '/profile' || pathname === '/about' || pathname === '/experience') return 'profile';
  if (pathname === '/systems' || pathname === '/skills') return 'systems';
  if (pathname === '/contact') return 'contact';
  return '';
}

function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLight(document.documentElement.dataset.theme === 'light');
    });
    const onStorage = (event: StorageEvent) => {
      if (event.key !== 'portfolio-v4-theme') return;
      const next = event.newValue === 'light';
      document.documentElement.dataset.theme = next ? 'light' : 'dark';
      setLight(next);
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = () => {
    const next = !light;
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    setLight(next);
    try { localStorage.setItem('portfolio-v4-theme', next ? 'light' : 'dark'); } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#f7f8f3' : '#0b1112');
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={light ? 'Dark mode' : 'Light mode'} aria-pressed={light} title={light ? 'Switch to dark mode' : 'Switch to light mode'}>
      <svg className="theme-icon-sun" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>
      <svg className="theme-icon-moon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z"/></svg>
    </button>
  );
}

function HeartDock() {
  const [state, setState] = useState<HeartState>({ count: 178, hearted: false });
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [status, setStatus] = useState('');
  const dockRef = useRef<HTMLElement>(null);
  const openedAt = useRef(0);

  useEffect(() => {
    let active = true;
    fetch('/api/hearts', { cache: 'no-store', credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw new Error('Heart counter unavailable');
        return response.json();
      })
      .then((next: HeartState) => {
        if (!active || !Number.isSafeInteger(next.count)) return;
        setState(next);
        setAvailable(true);
      })
      .catch(() => setStatus('Heart counter is temporarily unavailable.'));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const outside = (event: MouseEvent) => {
      if (open && dockRef.current && !dockRef.current.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    const scroll = () => { if (open && window.scrollY > openedAt.current + 12) setOpen(false); };
    document.addEventListener('click', outside);
    document.addEventListener('keydown', escape);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      document.removeEventListener('click', outside);
      document.removeEventListener('keydown', escape);
      window.removeEventListener('scroll', scroll);
    };
  }, [open]);

  const toggleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!open) openedAt.current = window.scrollY;
    setOpen((value) => !value);
  };

  const addHeart = async () => {
    if (!available || state.hearted) return;
    setStatus('Adding your heart…');
    try {
      const response = await fetch('/api/hearts', { method: 'POST', cache: 'no-store', credentials: 'same-origin' });
      if (!response.ok) throw new Error('Heart counter unavailable');
      const next = (await response.json()) as HeartState;
      setState(next);
      setStatus(`Thank you. The portfolio now has ${next.count} hearts.`);
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 760);
    } catch {
      setStatus('Heart counter is temporarily unavailable.');
    }
  };

  const count = new Intl.NumberFormat().format(state.count);
  return (
    <aside ref={dockRef} id="appreciation" className={`appreciation-dock${open ? ' is-open' : ''}${celebrating ? ' is-celebrating' : ''}`} aria-label="Portfolio appreciation">
      <button className={`heart-design-two-toggle${state.hearted ? ' is-hearted' : ''}`} type="button" aria-expanded={open} aria-controls="appreciation-panel" aria-label={open ? 'Close appreciation panel' : 'Open appreciation panel'} onClick={toggleOpen}>
        <span aria-hidden="true">♥</span><strong>{count}</strong><small>HEART</small>
      </button>
      <button id="appreciation-panel" className={`heart-button${state.hearted ? ' is-hearted' : ''}`} type="button" onClick={addHeart} aria-label={state.hearted ? `${state.count} hearts. You hearted this portfolio.` : `Heart this portfolio. ${state.count} hearts.`} aria-pressed={state.hearted} aria-hidden={!open} tabIndex={open ? 0 : -1} disabled={!available || state.hearted}>
        <span className="heart-symbol"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></span>
        <span className="heart-copy"><span className="heart-kicker">{state.hearted ? 'THANK YOU' : 'LEAVE A HEART'}</span><span className="heart-total"><strong>{count}</strong><small>HEARTS</small></span></span>
        <span className="heart-spark" aria-hidden="true">✦</span>
      </button>
      <span className="heart-design-two-caption" aria-hidden="true"><span>YOUR HEART COUNTS :)</span></span>
      <span className="sr-only" role="status">{status}</span>
    </aside>
  );
}

export default function PortfolioChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locationHash, setLocationHash] = useState('');
  const active = pathname === '/profile' && locationHash === '#experience' ? 'experience' : sectionFor(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setLocationHash(window.location.hash);
    const frame = window.requestAnimationFrame(syncHash);
    window.addEventListener('hashchange', syncHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', syncHash);
    };
  }, [pathname]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMenuOpen(false));
    const pageClass = `page-${active || 'interior'}`;
    document.body.className = pageClass;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return () => window.cancelAnimationFrame(frame);
    document.body.classList.add('motion-ready');
    const nodes = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    nodes.forEach((node) => observer.observe(node));
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname, active]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header"><div className="header-inner shell">
        <Link className="brand" href="/" aria-label="Bernard Mangulabnan, home"><span className="brand-monogram">BM<span>↗</span></span><span className="brand-note">FULL STACK WEB &amp; MOBILE DEVELOPER<br/>PAMPANGA, PHILIPPINES</span></Link>
        <button className="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((value) => !value)}><span>{menuOpen ? 'CLOSE' : 'MENU'}</span><i></i><i></i></button>
        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-nav" aria-label="Primary navigation">
          {NAV.map((item) => <Link key={item.key} href={item.href} aria-current={active === item.key ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="header-actions"><ThemeToggle/><Link className="header-link" href="/contact">LET&apos;S CONNECT <span aria-hidden="true">↗</span></Link></div>
      </div></header>
      <HeartDock />
      {children}
      <footer className="site-footer"><div className="shell footer-inner"><span>© {new Date().getFullYear()} BERNARD C. MANGULABNAN</span><span>BUILT BY BERNARD / PAMPANGA, PH</span><a href="#main">BACK TO TOP ↑</a></div></footer>
    </>
  );
}
