import React from 'react';
import { siteConfig } from '../../config/site';

export function About() {
  const { about } = siteConfig;
  
  return (
    <section className="mb-16 scroll-mt-24" id="about">
      <div className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#c1c8c4] editorial-card-shadow mb-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c1c8c4]/60">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-outline text-[15px]">history_edu</span>
            <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ background ]</span>
            <span className="font-code-snippet text-xs text-secondary font-bold font-mono">
              05 // {about.sectionTitle}
            </span>
          </div>
          <span className="text-label-sm font-code-snippet text-outline font-mono hidden sm:block">
            [ IDENTITY: {siteConfig.identity.name.toUpperCase()} ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-4 text-body-md font-body-md text-on-surface-variant leading-relaxed">
            <h3 className="text-headline-md font-headline-md text-primary tracking-tight">
              {about.introHeading}
            </h3>
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#c1c8c4]/60 font-code-snippet text-xs">
              {about.chips.map((chip, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-surface-container-low border border-[#c1c8c4]">
                  <span className="text-outline block mb-1">[ {chip.label} ]</span>
                  <span className="text-primary font-semibold">{chip.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Credentials */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-surface-container-low rounded-xl p-5 border border-[#c1c8c4]">
              <span className="font-code-snippet text-xs text-outline tracking-wider font-mono mb-3 block">[ CREDENTIALS & EDUCATION ]</span>
              <div className="space-y-3 font-body-sm">
                <div className="pb-2.5 border-b border-[#c1c8c4]/60">
                  <span className="text-xs font-code-snippet text-secondary font-semibold">ACADEMIC DEGREE</span>
                  <h4 className="text-primary font-semibold text-body-md">{about.education.degree}</h4>
                  <p className="text-xs text-on-surface-variant">{about.education.school}</p>
                </div>
                <div className="pb-2.5 border-b border-[#c1c8c4]/60">
                  <span className="text-xs font-code-snippet text-secondary font-semibold">FOCUS AREAS</span>
                  <p className="text-xs text-on-surface-variant font-code-snippet">
                    {about.focusAreas.join(' • ')}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-code-snippet text-secondary font-semibold">AVAILABILITY</span>
                  <p className="text-xs text-primary font-semibold flex items-center gap-1.5 mt-0.5">
                    {about.availability}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-[#c1c8c4] font-code-snippet text-xs text-primary">
              <div className="flex items-center justify-between text-outline text-[11px] mb-2 font-mono">
                <span>[ PHILOSOPHY ]</span>
                <span>SPEC v1.0</span>
              </div>
              <span className="text-secondary">const</span> engineeringPrinciple = {'{'}
              <br />
              {about.identityCodeLines.map((line, idx) => (
                <React.Fragment key={idx}>
                  &nbsp;&nbsp;{line.key}: <span className="text-primary-container font-semibold">"{line.value}"</span>
                  {idx < about.identityCodeLines.length - 1 ? ',' : ''}<br />
                </React.Fragment>
              ))}
              {'}'};
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#c1c8c4] bg-surface-container-low p-4 divide-y divide-[#c1c8c4]/60">
          {about.roles.map((role, idx) => (
            <div key={idx} className={`py-3 ${idx === 0 ? 'first:pt-1' : ''} ${idx === about.roles.length - 1 ? 'last:pb-1' : ''} flex flex-col sm:flex-row sm:items-center justify-between gap-1`}>
              <div className="flex items-center gap-2">
                <span className="font-code-snippet text-xs text-secondary font-bold">[ {role.index} ]</span>
                <span className="text-headline-sm font-headline-sm font-semibold text-primary">{role.title}</span>
              </div>
              <span className="text-xs font-code-snippet text-outline">{role.stack}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
