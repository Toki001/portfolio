import type { Project } from '../../content/projects';
import { Arrow } from './Arrow';
import { ProjectArtwork } from './ProjectArtwork';
export function ProjectPage({ project }: { project: Project }) {
  return <article className="container section">
    <nav aria-label="Breadcrumb"><a className="text-link" href="/projects">All projects</a> / <span aria-current="page">{project.title}</span></nav>
    <div className="page-intro"><p className="work-meta">{project.kind} / {project.statusLabel}</p><h1>{project.title}<span className="heading-period">.</span></h1><p>{project.description}</p></div>
    <ProjectArtwork project={project} />
    <div className="case-summary"><h2>The project</h2><p>{project.solution}</p><div className="hero-actions">{project.links.source && <a className="button" href={project.links.source} target="_blank" rel="noopener noreferrer">View repository <Arrow /></a>}{project.links.live && <a className="text-link" href={project.links.live} target="_blank" rel="noopener noreferrer">Visit project <Arrow /></a>}</div></div>
  </article>;
}
