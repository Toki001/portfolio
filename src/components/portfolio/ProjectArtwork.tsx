import type { Project } from '../../content/projects';

export function ProjectArtwork({ project, decorative = false, priority = false }: { project: Project; decorative?: boolean; priority?: boolean }) {
  if (project.id === 'peso-flow') return <div className="work-artwork mobile-artwork" aria-hidden={decorative || undefined}>
    <div className="mobile-artwork-copy" aria-hidden="true"><span>Own your<br />everyday.</span><small>Local-first personal finance</small></div>
    <div className="app-screen screen-secondary" aria-hidden="true"><img src={project.media[1].src} srcSet="/projects/peso-flow-budgets-195.webp 195w, /projects/peso-flow-budgets.webp 390w" sizes="(max-width:600px) 35vw, 22vw" alt="" width={390} height={1600} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" /></div>
    <div className="app-screen screen-primary"><img src={project.media[0].src} srcSet="/projects/peso-flow-home-195.webp 195w, /projects/peso-flow-home.webp 390w" sizes="(max-width:600px) 35vw, 22vw" alt={project.media[0].alt} width={390} height={1447} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" /></div>
    <span className="artwork-caption">App interface / test fixture data</span>
  </div>;
  if (project.image) return <div className={`work-artwork web-artwork ${project.id === 'pokechamp' ? 'work-artwork-navy' : 'work-artwork-slate'}`} aria-hidden={decorative || undefined}>
    <img src={project.image} srcSet={project.id === 'pokechamp' ? '/projects/pokechamp-800.webp 800w, /projects/pokechamp.webp 1440w' : project.id === 'pixeltools' ? '/projects/pixeltools-640.webp 640w, /projects/pixeltools.webp 960w' : undefined} sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 600px" alt={project.media[0]?.alt ?? project.imageAlt} width={project.media[0]?.width ?? 960} height={project.media[0]?.height ?? 782} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
    <span className="artwork-caption">{project.id === 'pokechamp' ? 'Actual team builder / sample roster' : 'Browser-based image tools'}</span>
  </div>;
  return <div className="work-artwork note-artwork" aria-hidden={decorative || undefined}><span className="note-title">{project.title}</span><span>Facial recognition</span><span className="artwork-caption">Project note</span></div>;
}
