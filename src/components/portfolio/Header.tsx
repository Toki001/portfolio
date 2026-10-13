import { Icon } from './Icon';
import { useState, useEffect } from 'react';
import { siteConfig } from '../../config/site';

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fcf9f0]/90 backdrop-blur-md border-b border-[#c1c8c4] transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <a className="flex items-center gap-2 sm:gap-3.5 group min-w-0" href="#home" onClick={() => setIsDrawerOpen(false)}>
          <div className="relative w-10 h-10 rounded-xl bg-primary-container text-primary-fixed border border-white/15 flex items-center justify-center font-bold text-sm font-headline-sm shadow-sm shrink-0 overflow-hidden">
            {siteConfig.identity.profileImage ? (
              <img width={40} height={40} decoding="async" src={siteConfig.identity.profileImage} alt={siteConfig.identity.name} className="w-full h-full object-cover" />
            ) : (
              siteConfig.identity.initials
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-headline-sm font-headline-sm font-semibold text-primary tracking-tight leading-none group-hover:text-secondary transition-colors">
                {siteConfig.identity.name}
              </span>
            </div>
            <p className="text-xs text-outline tracking-tight mt-0.5 font-code-snippet">
              {siteConfig.identity.shortRole}
            </p>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-[#ffffff]/90 border border-[#c1c8c4] shadow-sm">
          {siteConfig.navigation.map((nav) => {
            const isActive = activeSection === nav.href.replace('#', '') || (activeSection === '' && nav.href === '#home');
            return (
              <a
                key={nav.href}
                aria-current={isActive ? "location" : undefined}
                href={nav.href}
                className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-all duration-150 ${
                  isActive
                    ? 'text-primary font-bold bg-[#e5e2da]'
                    : 'text-on-surface-variant font-medium hover:bg-[#e5e2da] hover:text-primary'
                }`}
              >
                {nav.label}
              </a>
            );
          })}
        </nav>

        {/* Far Right Socials & Contact CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden 2xl:flex items-center gap-1.5 pr-2 border-r border-[#c1c8c4]">
            {Object.values(siteConfig.socials).map((social) => {
              if (!social.url) return null;
              // Hardcoded SVGs for common socials based on the original template
              let iconSvg = null;
              if (social.label === 'GitHub') {
                iconSvg = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
              } else if (social.label === 'LinkedIn') {
                iconSvg = <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
              } else if (social.label === 'Facebook') {
                iconSvg = <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
              } else if (social.label === 'Discord') {
                iconSvg = <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>;
              }

              return (
                <a
                  key={social.label}
                  aria-label={`${social.label} Profile`}
                  className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#c1c8c4] flex items-center justify-center text-primary hover:border-[#81a499] hover:bg-[#e5e2da] transition-colors duration-150 active:scale-[0.98]"
                  href={social.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {iconSvg}
                </a>
              );
            })}
          </div>

          <a
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#ffffff] rounded-lg text-label-md font-label-md font-medium hover:bg-secondary transition-colors duration-150 active:scale-[0.98] shadow-sm"
            href="#contact"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span>Get in Touch</span>
            <span className="text-secondary-fixed text-xs font-semibold">↗</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="xl:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#ffffff] border border-[#c1c8c4] text-primary"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle menu"
            aria-expanded={isDrawerOpen}
            aria-controls="topNavDrawer"
          >
            <Icon className="text-[20px]" name={isDrawerOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Menu Drawer */}
      <div
        id="topNavDrawer"
        className={`${isDrawerOpen ? 'flex' : 'hidden'} xl:hidden bg-[#ffffff] border-b border-[#c1c8c4] px-6 py-5 shadow-lg flex-col`}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-2 font-code-snippet text-xs">
          {siteConfig.navigation.map((nav) => {
            const isActive = activeSection === nav.href.replace('#', '') || (activeSection === '' && nav.href === '#home');
            return (
              <a
                key={nav.href}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary font-medium bg-[#e5e2da]'
                    : 'text-on-surface-variant hover:text-primary hover:bg-[#e5e2da]'
                }`}
                href={nav.href}
                onClick={() => setIsDrawerOpen(false)}
              >
                <span>[ {nav.index} ] {nav.label}</span>
                <span className="text-xs font-mono">→</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
