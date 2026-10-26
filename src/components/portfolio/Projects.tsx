import { featuredProjects, projects } from "../../content/projects";
import type { Project } from "../../content/projects";
import { ScrollText, SectionLabel } from "./ScrollText";
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
        <div className="work-caption" data-reveal="sequence">
          <div>
            <p className="work-meta">
              <span>{project.index}</span>
              <span>{project.category.toLowerCase()}</span>
            </p>
            <h3>
              <a href={`/projects/${project.slug}`}>
                <ScrollText>{project.title}</ScrollText>
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
      <div className="section-heading" data-reveal="sequence" data-handoff>
        <div>
          <SectionLabel>Selected projects</SectionLabel>
          <h2 id="selected-title">
            <ScrollText accentEnd>Selected work.</ScrollText>
          </h2>
        </div>
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
            <FeaturedCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <div className="spotlight-work">
        <div className="spotlight-intro" data-reveal="sequence" data-handoff>
          <SectionLabel>Systems & tools</SectionLabel>
          <h2>
            <ScrollText accentEnd>Systems, in detail.</ScrollText>
          </h2>
          <p>
            Support workflows, invoice reconciliation and a visual development
            workspace.
          </p>
        </div>
        {projects
          .filter((p) => p.spotlight)
          .map((project) => (
            <article
              className={`spotlight-card spotlight-${project.id}`}
              key={project.id}
              id={project.id}
            >
              <a
                className="work-media-link spotlight-media"
                href={`/projects/${project.slug}`}
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
              <div className="spotlight-copy" data-reveal="sequence">
                <p className="work-meta">
                  <span>{project.index}</span>
                  {project.category.toLowerCase()}
                </p>
                <h3>
                  <ScrollText>{project.title}</ScrollText>
                </h3>
                <p className="spotlight-description">{project.description}</p>
                <ul>
                  {project.keyFeatures.slice(0, 2).map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="spotlight-stack">{project.tags.join(" / ")}</p>
                <a
                  className="work-case-link"
                  href={`/projects/${project.slug}`}
                >
                  Read case study <Arrow />
                </a>
              </div>
            </article>
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
