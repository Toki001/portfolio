import { projects } from '../../content/projects';
import type { Project } from '../../content/projects';
import { Arrow } from './Arrow';
import { ProjectArtwork } from './ProjectArtwork';
import { MediaGallery } from './MediaGallery';

export function ProjectPage({ project }: { project: Project }) {
  const next = projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length];
  return <article className={`case-study case-${project.id}`}>
    <div className="container section case-opening">
      <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li><a href="/projects">Projects</a></li><li aria-current="page">{project.title}</li></ol></nav>
      <div className="page-intro"><p className="work-meta">{project.kind} / {project.statusLabel}</p><h1>{project.title}<span className="heading-period">.</span></h1><p>{project.description}</p></div>
      <dl className="case-facts"><div><dt>Focus</dt><dd>{project.category.toLowerCase()}</dd></div><div><dt>Built with</dt><dd>{project.tags.join(', ')}</dd></div>{project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}<div><dt>Explore</dt><dd className="case-external">{project.links.source && <a className="text-link" href={project.links.source} target="_blank" rel="noopener noreferrer">Repository <Arrow /></a>}{project.links.live && <a className="text-link" href={project.links.live} target="_blank" rel="noopener noreferrer">Visit project <Arrow /></a>}</dd></div></dl>
      <div className="case-cover" data-reveal><ProjectArtwork project={project} /></div>
    </div>
    <div className="container case-reading">
      <section className="case-chapter" data-reveal><h2>The problem</h2><p>{project.problem}</p></section>
      <section className="case-chapter" data-reveal><h2>The approach</h2><div><p>{project.solution}</p>{project.keyFeatures.length > 0 && <ul className="feature-list">{project.keyFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>}</div></section>
    </div>
    {project.architecture.length > 0 && <section className="case-architecture" aria-labelledby="architecture-title"><div className="container"><div className="section-heading" data-reveal><h2 id="architecture-title">Under the hood.</h2><p>The pieces behind the experience, and how they fit together.</p></div><ol className="architecture-flow">{project.architecture.map((part,i) => <li key={part.title} data-reveal><span className="architecture-step">{String(i+1).padStart(2,'0')}</span><h3>{part.title}</h3><p>{part.description}</p>{i < project.architecture.length - 1 && <span className="architecture-arrow" aria-hidden="true">→</span>}</li>)}</ol></div></section>}
    <div className="container case-reading"><MediaGallery project={project} /><section className="case-chapter" data-reveal><h2>Decisions & constraints</h2><p>{project.challenges}</p></section><section className="case-chapter" data-reveal><h2>What’s there today</h2><p>{project.results}</p></section></div>
    <nav className="next-project container" aria-label="Next project"><span>Keep exploring</span><a href={`/projects/${next.slug}`}><span>{next.title}</span><Arrow /></a><a className="text-link" href="/projects">Back to all projects</a></nav>
  </article>;
}
