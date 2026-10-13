import { Icon } from './Icon';
import { useRef, useState, useEffect } from 'react';
import { siteConfig } from '../../config/site';

export function Projects() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollBy = (amount: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToDot = (index: number) => {
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const clientWidth = sliderRef.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const dotScroll = (maxScroll / (siteConfig.projects.length - 1)) * index;
      sliderRef.current.scrollTo({ left: dotScroll, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const scrollRatio = scrollWidth > clientWidth ? scrollLeft / (scrollWidth - clientWidth) : 0;
        const index = Math.round(scrollRatio * (siteConfig.projects.length - 1));
        setActiveDot(index);
      }
    };
    
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section className="mb-16 scroll-mt-24" id="projects">
      <div className="bg-[#ffffff] rounded-[24px] md:rounded-[32px] p-5 md:p-8 border border-[#c1c8c4] editorial-card-shadow">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#c1c8c4]/70">
          <div className="flex items-center gap-3">
            <Icon className="text-outline text-[15px]" name="folder_open" />
            <span className="font-code-snippet text-xs text-outline tracking-wider font-mono">[ projects ]</span>
            <span className="font-code-snippet text-xs text-secondary font-bold font-mono px-2 py-0.5 rounded-full bg-[#9f4123]/10 text-[#9f4123]">
              02 // CASE STUDIES
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-label-sm font-code-snippet text-outline hidden sm:block font-mono">
              [ {siteConfig.projects.length} SPECIFICATIONS DEPLOYED ]
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollBy(-360)}
                aria-label="Previous project" 
                className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#c1c8c4] flex items-center justify-center text-primary hover:border-[#81a499] hover:bg-[#e5e2da] active:scale-[0.98] transition-all duration-150"
              >
                <Icon className="text-[18px]" name="arrow_back" />
              </button>
              <button 
                onClick={() => scrollBy(360)}
                aria-label="Next project" 
                className="w-8 h-8 rounded-lg bg-[#ffffff] border border-[#c1c8c4] flex items-center justify-center text-primary hover:border-[#81a499] hover:bg-[#e5e2da] active:scale-[0.98] transition-all duration-150"
              >
                <Icon className="text-[18px]" name="arrow_forward" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary tracking-tight mb-2">
            Featured Projects & Software
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-2xl">
            A selected portfolio of mobile applications, full-stack web platforms, and machine learning inference tools designed with technical precision.
          </p>
        </div>

        <div>
          <div className="relative">
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {siteConfig.projects.map((project) => (
                <article id={project.id} key={project.id} className="scroll-mt-28 snap-start shrink-0 w-full sm:w-[360px] lg:w-[380px] bg-[#ffffff] rounded-[20px] p-5 border border-[#c1c8c4] editorial-card-shadow editorial-hover-lift transition-all duration-200 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="h-48 rounded-xl overflow-hidden border border-[#c1c8c4] bg-surface-container relative shrink-0">
                      {project.image ? (
                        <img width={960} height={600} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={project.imageAlt} src={project.image} />
                      ) : (
                        <div className="w-full h-full bg-[#00241d] flex flex-col justify-center items-center p-6 text-center">
                          <Icon className="text-[40px] text-secondary-fixed mb-2" name="monitoring" />
                          <span className="font-code-snippet text-xs text-[#81a499] font-mono">prometheus_collector:v1.2</span>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[11px] font-code-snippet text-[#ffffff]">99.98% SLA INGESTION</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#ffffff]/95 border border-[#c1c8c4] text-[10px] font-code-snippet font-semibold text-primary">
                          [ {project.index} ]
                        </span>
                      </div>
                      
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-primary/80 backdrop-blur-sm text-[10px] font-code-snippet text-[#ffffff] flex items-center gap-1">
                        {project.statusTone === 'success' && project.image && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                        {project.versionLabel}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#c1c8c4]/50 font-code-snippet text-[11px]">
                        <span className="text-secondary font-bold px-1.5 py-0.5 rounded bg-[#9f4123]/10 text-[#9f4123]">
                          {project.categoryLabel}
                        </span>
                        <span className="text-outline font-medium flex items-center gap-1">
                          {project.statusTone === 'success' && project.image && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                          {project.footerLabel}
                        </span>
                      </div>
                      <h3 className="text-headline-sm font-headline-sm font-semibold text-primary mb-2 line-clamp-1 group-hover:text-secondary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-body-sm font-body-sm text-on-surface-variant mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full bg-surface-container border border-[#c1c8c4] text-[11px] font-code-snippet text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#c1c8c4]/60 font-code-snippet text-xs">
                    <span className="text-outline text-[11px]">{project.statusLabel}</span>
                    <div className="flex items-center gap-3">
                      {project.links.source && (
                        <a className="inline-flex items-center gap-1 text-primary hover:text-secondary font-medium transition-colors" href={project.links.source} rel="noopener noreferrer" target="_blank">
                          <span>Source</span> <span className="font-bold">↗</span>
                        </a>
                      )}
                      {project.links.demo && (
                        <a className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline" href={project.links.demo}>
                          <span>{project.links.demo.startsWith("#") ? "Request demo" : "Demo"}</span> <span className="font-bold">→</span>
                        </a>
                      )}
                      {project.links.live && (
                        <a className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline" href={project.links.live}>
                          <span>Live App</span> <span className="font-bold">→</span>
                        </a>
                      )}
                      {('docs' in project.links) && project.links.docs && (
                        <a className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline" href={project.links.docs}>
                          <span>{project.links.docs.startsWith("#") ? "Request details" : "Docs"}</span> <span className="font-bold">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#c1c8c4]/50 font-code-snippet text-xs text-outline">
              <span className="hidden sm:inline-block font-mono">← DRAG OR USE BUTTONS TO NAVIGATE CASE STUDIES →</span>
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                {siteConfig.projects.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => scrollToDot(idx)} 
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === activeDot ? "true" : undefined}
                    className="w-8 h-8 inline-flex items-center justify-center rounded-full group"
                  >
                    <span aria-hidden="true" className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === activeDot ? 'bg-primary' : 'bg-[#c1c8c4] group-hover:bg-secondary'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
