import { Icon } from './Icon';
import { siteConfig } from '../../config/site';

export function TechStack() {
  return (
    <section className="mb-16 scroll-mt-24" id="tech-stack">
      <div className="bg-[#ffffff] rounded-[24px] p-6 md:p-8 border border-[#c1c8c4] editorial-card-shadow mb-6">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c1c8c4]/60">
          <div className="flex items-center gap-3">
            <Icon className="text-outline text-[15px]" name="layers" />
            <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ tech stack ]</span>
            <span className="font-code-snippet text-xs text-secondary font-bold font-mono">
              03 // ARCHITECTURE & SKILLS
            </span>
          </div>
          <span className="text-label-sm font-code-snippet text-outline font-mono hidden sm:block">
            [ {siteConfig.techDomains.length} CORE DOMAINS ]
          </span>
        </div>
        
        <h2 className="text-headline-md md:text-headline-lg font-headline-md text-primary tracking-tight mb-3">
          Technological Competencies & Ecosystem
        </h2>
        <p className="text-body-md font-body-md text-on-surface-variant max-w-3xl leading-relaxed mb-8">
          A structured inventory of development runtimes, libraries, databases, and deployment toolchains I utilize to craft performant digital products.
        </p>

        {/* Grid of Bento Taxonomy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siteConfig.techDomains.map((domain) => (
            <div key={domain.index} className="bg-surface-container-low rounded-xl p-6 border border-[#c1c8c4] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c1c8c4]/60">
                  <span className="text-secondary font-code-snippet text-xs font-bold">
                    [ {domain.index} ] {domain.category}
                  </span>
                  <Icon className="text-outline text-[18px]" name={domain.icon} />
                </div>
                <h3 className="text-headline-sm font-headline-sm font-semibold text-primary mb-2">
                  {domain.title}
                </h3>
                <p className="text-xs font-body-sm text-on-surface-variant mb-5 leading-relaxed">
                  {domain.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {domain.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-[#ffffff] border border-[#c1c8c4] text-xs font-code-snippet text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[#c1c8c4]/60 text-xs font-code-snippet text-outline">
                {domain.footer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
