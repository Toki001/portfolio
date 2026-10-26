import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../config/site';
import { Arrow } from './Arrow';

export function Header({ activeSection, innerPage = false }: { activeSection: string; innerPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const sectionHref = (href: string) => `${innerPage ? '/' : ''}${href}`;
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector('a')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    const closeOnOutside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth > 1024) setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('pointerdown', closeOnOutside);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('pointerdown', closeOnOutside);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <a href={sectionHref('#home')} className="wordmark" aria-label={`jd — ${siteConfig.identity.name}, home`}>jd<span aria-hidden="true">.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {siteConfig.navigation.filter(n => n.href !== '#home').map(nav => <a key={nav.href} href={sectionHref(nav.href)} aria-current={activeSection === nav.href.slice(1) ? 'location' : undefined}>{nav.label}</a>)}
      </nav>
      <a className="header-contact" href={sectionHref('#contact')}>Let’s talk <Arrow /></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span className={open ? 'menu-icon is-open' : 'menu-icon'} aria-hidden="true"><i /><i /></span></button>
    </div>
    <nav ref={menu} id="mobile-navigation" className="mobile-nav container" aria-label="Mobile navigation" hidden={!open} onBlur={e => {
      if (!e.currentTarget.contains(e.relatedTarget as Node) && e.relatedTarget !== toggle.current) setOpen(false);
    }}>
      {siteConfig.navigation.map(nav => <a key={nav.href} href={sectionHref(nav.href)} onClick={() => {
        setOpen(false);
        if (!innerPage) requestAnimationFrame(() => { const section = document.querySelector<HTMLElement>(nav.href); section?.focus({preventScroll:true}); });
      }} aria-current={activeSection === nav.href.slice(1) ? 'location' : undefined}><span>{nav.label}</span><Arrow /></a>)}
    </nav>
    <noscript><nav className="no-script-nav container" aria-label="Navigation without scripting">{siteConfig.navigation.map(nav => <a key={nav.href} href={sectionHref(nav.href)}>{nav.label}</a>)}</nav></noscript>
  </header>;
}
