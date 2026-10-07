import React from 'react';
import { siteConfig } from '../../config/site';

export function Hero() {
  const { identity, location, currentFocus, currentlyBuilding, disciplines } = siteConfig;

  return (
    <section className="mb-16 pt-2" id="home">
      {/* Top Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        
        {/* Main Left Profile Card */}
        <div className="lg:col-span-8 bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#c1c8c4] editorial-card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c1c8c4]/60">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-outline text-[15px]">person</span>
                <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ profile ]</span>
                <span className="font-code-snippet text-xs text-secondary font-bold font-mono px-2 py-0.5 rounded-full bg-[#9f4123]/10 text-[#9f4123]">
                  00 // PROFILE
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
              {/* Left Column: Avatar & Name */}
              <div className="flex flex-col items-start shrink-0">
                <div className="w-40 h-40 md:w-[192px] md:h-[192px] rounded-[24px] bg-primary-container text-primary-fixed flex items-center justify-center font-bold text-6xl md:text-[5rem] font-headline-md shadow-sm mb-4 border border-[#c1c8c4]/30 overflow-hidden">
                  {identity.profileImage ? (
                    <img src={identity.profileImage} alt={`${identity.name} Profile`} className="w-full h-full object-cover" />
                  ) : (
                    identity.initials
                  )}
                </div>
                <h1 className="text-xl md:text-[22px] font-headline-lg font-bold text-primary tracking-tight">
                  {identity.name}
                </h1>
                <p className="text-[13px] md:text-sm font-label-md text-secondary font-semibold tracking-wide mt-1">
                  {identity.title}
                </p>
              </div>

              {/* Right Column: Statement & Description */}
              <div className="flex flex-col justify-center md:pt-4">
                <h2 className="text-[28px] md:text-[36px] font-headline-lg font-bold text-primary tracking-tight leading-[1.15] mb-4">
                  {identity.heroStatement}
                </h2>
                <p className="text-[15px] font-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                  {identity.heroDescription}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#c1c8c4]/50">
            <div className="flex flex-wrap items-center gap-3">
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-[#ffffff] text-label-md font-label-md font-medium hover:bg-secondary transition-colors shadow-sm active:scale-[0.98]" href="#projects">
                View Projects
              </a>
              <a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffffff] text-primary border border-[#c1c8c4] text-label-md font-label-md font-medium hover:bg-[#e5e2da] transition-colors active:scale-[0.98]" href="#contact">
                Get in Touch
              </a>
            </div>
            
            <div className="flex items-center gap-2">
              {Object.values(siteConfig.socials).map((social) => {
                if (!social.url) return null;
                let iconSvg = null;
                if (social.label === 'GitHub') {
                  iconSvg = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
                } else if (social.label === 'LinkedIn') {
                  iconSvg = <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
                } else if (social.label === 'Facebook') {
                  iconSvg = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
                } else if (social.label === 'Discord') {
                  iconSvg = <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>;
                }
                return (
                  <a
                    key={social.label}
                    aria-label={`${social.label} Profile`}
                    className="w-9 h-9 rounded-full bg-surface-container border border-[#c1c8c4] flex items-center justify-center text-primary hover:bg-[#e5e2da] hover:border-[#81a499] transition-colors"
                    href={social.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {iconSvg}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column Bento Cards */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3.5 h-full">
          
          <div className="bg-[#ffffff] rounded-[20px] p-5 border border-[#c1c8c4] editorial-card-shadow flex flex-col justify-between flex-1 transition-all duration-150 hover:border-[#81a499]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#c1c8c4]/50">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[15px]">location_on</span>
                <span className="font-code-snippet text-[11px] text-outline font-mono tracking-wider">[ LOCATION ]</span>
              </div>
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-headline-sm font-headline-sm font-semibold text-primary tracking-tight leading-tight">{location.country}</h3>
                <span className="font-code-snippet text-[10px] text-outline font-mono">{location.coordinatesLabel}</span>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm mt-0.5">
                {location.region}
              </p>
            </div>
          </div>
          
          <div className="bg-[#ffffff] rounded-[20px] p-5 border border-[#c1c8c4] editorial-card-shadow flex flex-col justify-between flex-1 transition-all duration-150 hover:border-[#81a499]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#c1c8c4]/50">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[15px]">bolt</span>
                <span className="font-code-snippet text-[11px] text-outline font-mono tracking-wider">[ CURRENT FOCUS ]</span>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {currentFocus.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-surface-container border border-[#c1c8c4] text-xs font-code-snippet text-primary font-medium hover:bg-[#e5e2da] transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="border-t border-[#c1c8c4]/70 my-3"></div>
              <div className="space-y-2 text-xs font-code-snippet">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-outline font-mono text-[11px]">Architecture</span>
                  <span className="text-primary font-medium text-right text-[11px]">{currentFocus.architecture}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-outline font-mono text-[11px]">Research</span>
                  <span className="text-primary font-medium text-right text-[11px]">{currentFocus.research}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#ffffff] rounded-[20px] p-5 border border-[#c1c8c4] editorial-card-shadow flex flex-col justify-between flex-1 group transition-all duration-150 hover:border-[#81a499]">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#c1c8c4]/50">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-outline">rocket_launch</span>
                <span className="font-code-snippet text-[11px] text-outline font-mono tracking-wider">[ CURRENTLY BUILDING ]</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-headline-sm font-headline-sm font-semibold text-primary group-hover:text-secondary transition-colors">{currentlyBuilding.title}</h3>
                </div>
                <a className="text-xs font-code-snippet font-medium text-[#9f4123] hover:text-secondary transition-colors inline-flex items-center gap-1 hover:underline" href={currentlyBuilding.href}>
                  <span>View</span> <span className="font-mono">→</span>
                </a>
              </div>
              <p className="text-xs text-on-surface-variant font-body-sm">{currentlyBuilding.description}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bento Disciplines / About Card */}
      <div className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#c1c8c4] editorial-card-shadow">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c1c8c4]/60">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-outline text-[15px]">info</span>
            <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ about ]</span>
            <span className="font-code-snippet text-xs text-secondary font-bold font-mono px-2 py-0.5 rounded-full bg-[#9f4123]/10 text-[#9f4123]">
              01 // DISCIPLINES
            </span>
          </div>
        </div>
        
        <h2 className="text-headline-md md:text-headline-lg font-headline-md text-primary tracking-tight mb-3">
          I like building products that solve real problems.
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-4xl leading-relaxed mb-8">
          My work spans the entire lifecycle from foundational machine learning architectures to intuitive mobile and responsive web client interfaces. Rather than assembling generic templates, I design purpose-built systems optimized for user ergonomics and predictable runtime performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {disciplines.map((discipline) => (
            <div key={discipline.index} className="bg-surface-container-low rounded-xl p-5 md:p-6 border border-[#c1c8c4] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-secondary text-xs font-code-snippet font-bold">[ {discipline.index} ]</span>
                  <span className="text-[10px] font-code-snippet text-outline tracking-wider font-medium uppercase">{discipline.category}</span>
                </div>
                <h3 className="text-headline-sm font-headline-sm font-semibold text-primary mb-2">{discipline.title}</h3>
                <p className="text-xs md:text-body-sm font-body-sm text-on-surface-variant leading-relaxed mb-6">
                  {discipline.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#c1c8c4]/60 text-xs font-code-snippet text-outline">
                {discipline.stackSummary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
