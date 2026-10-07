import React from 'react';
import { siteConfig } from '../../config/site';

export function Footer() {
  const { footer, identity } = siteConfig;
  
  return (
    <footer className="w-full border-t border-[#c1c8c4] pt-10 pb-8 text-on-surface-variant text-body-sm font-body-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-code-snippet text-xs font-mono text-secondary font-bold">[ {identity.initials} ]</span>
            <span className="text-headline-sm font-headline-sm font-semibold text-primary tracking-tight block">
              {identity.name}
            </span>
          </div>
          <p className="text-xs font-code-snippet text-outline mt-1 font-mono">
            {identity.title} • {footer.craftedWith}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-5 font-code-snippet text-xs">
          {siteConfig.navigation.map(nav => (
            <a key={nav.href} className="text-on-surface-variant hover:text-secondary transition-colors duration-150" href={nav.href}>
              [ {nav.index} ] {nav.label === 'About' ? 'Bio' : (nav.label === 'Tech Stack' ? 'Stack' : nav.label)}
            </a>
          ))}
        </div>
      </div>
      
      <div className="pt-6 border-t border-[#c1c8c4]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-code-snippet text-outline">
        <p>© {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="font-mono text-primary font-medium">[ SYSTEM STATUS: {footer.systemStatus} ]</span>
        </div>
      </div>
    </footer>
  );
}
