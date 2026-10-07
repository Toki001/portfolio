import React from 'react';
import { siteConfig } from '../../config/site';

export function ToolsWorkbench() {
  return (
    <section className="mb-16 scroll-mt-24" id="tools">
      <div className="rounded-[24px] md:rounded-[32px] p-5 md:p-8 border border-[#c1c8c4] bg-[#ffffff] editorial-card-shadow">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#c1c8c4]/70">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-outline text-[15px]">build</span>
            <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ tools ]</span>
            <span className="font-code-snippet text-xs text-secondary font-bold font-mono">
              04 // WORKBENCH
            </span>
          </div>
          <span className="text-label-sm font-code-snippet text-outline hidden sm:block font-mono">
            [ DAILY INSTRUMENTATION ]
          </span>
        </div>

        <div className="bg-[#ffffff] rounded-[20px] border border-[#c1c8c4] p-6 md:p-8 editorial-card-shadow divide-y divide-[#c1c8c4]/70">
          {siteConfig.tools.map((tool) => {
            const isSpecial = tool.categoryLabel === 'SYNTHESIS';
            
            return (
              <div key={tool.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-surface-container border border-[#c1c8c4] flex items-center justify-center text-primary">
                    <span className={`material-symbols-outlined text-[18px] ${isSpecial ? 'bg-[#e5e2da] text-secondary border border-[#c1c8c4]/70' : (tool.id === 'editor' || tool.id === 'design' ? 'text-secondary' : 'text-outline')}`}>
                      {tool.icon}
                    </span>
                  </span>
                  <div>
                    <h4 className="text-primary font-headline-sm font-medium">{tool.name}</h4>
                    <p className="text-xs text-on-surface-variant">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-code-snippet text-xs">
                  <span className="text-outline">[ {tool.categoryLabel} ]</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
