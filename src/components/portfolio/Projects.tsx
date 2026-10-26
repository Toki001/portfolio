import { featuredProjects } from "../../content/projects";
import type { Project } from "../../content/projects";
import { Arrow } from "./Arrow";
import { ProjectArtwork } from "./ProjectArtwork";

function FeaturedCard({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  return (
    <article
      id={project.id}
      tabIndex={-1}
      className={`featured-card${lead ? " featured-card-lead" : ""}`}
      data-reveal
    >
      <a href={`/projects/${project.slug}`} className="work-media-link">
        <ProjectArtwork project={project} decorative />
        <span className="sr-only">Read {project.title} case study</span>
        <span className="work-open" aria-hidden="true">
          <Arrow />
        </span>
      </a>
      <div className="work-caption">
        <div>
          <p className="work-meta">
            <span>{project.index}</span>
            <span>{project.category.toLowerCase()}</span>
          </p>
          <h3>
            <a href={`/projects/${project.slug}`}>{project.title}</a>
          </h3>
        </div>
        <p className="work-summary">{project.description}</p>
        <a href={`/projects/${project.slug}`} className="work-case-link">
          Read case study <Arrow />
        </a>
      </div>
    </article>
  );
}
export function Projects() {
  return (
    <section
      id="projects"
      className="section container selected-work"
      tabIndex={-1}
      aria-labelledby="selected-title"
    >
      <div className="section-heading" data-reveal>
        <h2 id="selected-title">
          Selected work<span className="heading-period">.</span>
        </h2>
        <p>From local-first mobile apps to useful tools in your browser.</p>
      </div>
      <FeaturedCard project={featuredProjects[0]} lead />
      <div className="work-pair">
        {featuredProjects.slice(1).map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}
      </div>
      <div className="work-index-link" data-reveal>
        <p>There’s more behind the interface.</p>
        <div className="work-index-actions">
          <a className="text-link" href="/projects">
            Explore all projects <Arrow diagonal={false} />
          </a>
          <a id="guest-reco" className="text-link" href="/projects/guest-reco">
            GuestReco project note <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
