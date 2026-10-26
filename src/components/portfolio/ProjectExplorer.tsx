import { useEffect, useState } from 'react';
import { projects } from '../../content/projects';
import { ProjectArtwork } from './ProjectArtwork';
import { Arrow } from './Arrow';
const categories = ['All', ...new Set(projects.map(p => p.kind))];
function readCategory() {
  const value = new URLSearchParams(location.search).get('category') ?? 'All';
  return categories.includes(value) ? value : 'All';
}
export function ProjectExplorer() {
  const [category, setCategory] = useState('All');
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true); setCategory(readCategory());
    const sync = () => setCategory(readCategory());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  const filtered = projects.filter(p => category === 'All' || p.kind === category);
  return <div className="container section project-explorer">
    <div className="page-intro"><a className="text-link" href="/#projects">Back to selected work</a><h1>Project index<span className="heading-period">.</span></h1><p>Mobile applications, web tools and experiments in machine learning.</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects" hidden={!enhanced}>
      {categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => {
        setCategory(value);
        const url = new URL(location.href);
        if (value === 'All') url.searchParams.delete('category'); else url.searchParams.set('category', value);
        history.pushState(null, '', url.pathname + url.search);
      }}>{value}</button>)}
    </div>
    <p className="filter-result" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
    <div className="explorer-grid">{filtered.map(project => <article key={project.id} className="explorer-card">
      <a className="work-media-link" href={`/projects/${project.slug}`}><ProjectArtwork project={project} decorative /><span className="sr-only">Explore {project.title}</span></a>
      <div className="explorer-caption"><div><span className="work-meta">{project.kind} / {project.statusLabel}</span><h2><a href={`/projects/${project.slug}`}>{project.title}</a></h2></div><Arrow /></div><p className="work-summary">{project.description}</p>
    </article>)}</div>
  </div>;
}
