import { Fragment } from "react";
import { featuredProjects } from "../../content/projects";
import type { Project } from "../../content/projects";
import { TextMask } from "./TextMask";
import { Arrow } from "./Arrow";
import { ProjectArtwork } from "./ProjectArtwork";
import { useProjectScene } from "../../hooks/useProjectScene";
function FeaturedCard({
  project,
  lead = false,
}: {
  project: Project;
  lead?: boolean;
}) {
  return (
    <>
      <span className="scene-marker" aria-hidden="true" />
      <article
        id={project.id}
        tabIndex={-1}
        className={`featured-card${lead ? " featured-card-lead" : ""}`}
        style={{ zIndex: project.featuredRank }}
      >
        <a
          href={`/projects/${project.slug}`}
          className="work-media-link"
          data-pointer-surface="card"
          data-reveal="media"
        >
          <div className="project-tilt" data-pointer-layer>
            <ProjectArtwork project={project} decorative />
          </div>
          <span className="sr-only">Read {project.title} case study</span>
          <span className="work-open" aria-hidden="true">
            <Arrow />
          </span>
        </a>
        <div className="work-caption" data-reveal="heading">
          <div>
            <p className="work-meta">
              <span>{project.index}</span>
              <span>{project.category.toLowerCase()}</span>
            </p>
            <h3>
              <a href={`/projects/${project.slug}`}>
                <TextMask>{project.title}</TextMask>
              </a>
            </h3>
          </div>
          <p className="work-summary">{project.description}</p>
          <ul className="scene-stack" aria-label={`${project.title} stack`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <a href={`/projects/${project.slug}`} className="work-case-link">
            Read case study <Arrow />
          </a>
        </div>
      </article>
    </>
  );
}
export function Projects() {
  const scene = useProjectScene();
  return (
    <section
      id="projects"
      className="section container selected-work"
      tabIndex={-1}
      aria-labelledby="selected-title"
    >
      <div className="section-heading" data-reveal="heading">
        <h2 id="selected-title">
          <TextMask>
            Selected work<span className="heading-period">.</span>
          </TextMask>
        </h2>
        <p>From local-first mobile apps to useful tools in your browser.</p>
      </div>
      <div
        ref={scene.ref}
        className="project-deck"
        data-spatial={scene.enabled ? "true" : undefined}
      >
        <div className="scene-toolbar">
          <nav
            className="scene-controls"
            aria-label="Featured project navigation"
            hidden={!scene.enabled}
          >
            <span className="scene-count" aria-live="polite">
              {String(scene.active + 1).padStart(2, "0")} /{" "}
              {String(featuredProjects.length).padStart(2, "0")}
            </span>
            {featuredProjects.map((p, index) => (
              <button
                key={p.id}
                aria-label={`Show ${p.index} ${p.title}`}
                aria-pressed={scene.active === index}
                onClick={(event) => scene.select(index, event.detail === 0)}
              >
                <span aria-hidden="true">{p.index}</span> {p.title}
              </button>
            ))}
          </nav>
        </div>
        <FeaturedCard project={featuredProjects[0]} lead />
        <div className="work-pair">
          {featuredProjects.slice(1).map((project) => (
            <Fragment key={project.id}>
              <FeaturedCard project={project} />
            </Fragment>
          ))}
        </div>
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
