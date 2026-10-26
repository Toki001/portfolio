import type { Project, ProjectMedia } from "../../content/projects";

function Screen({
  media,
  priority,
  className,
}: {
  media: ProjectMedia;
  priority: boolean;
  className: string;
}) {
  return (
    <div className={`composition-screen ${className}`}>
      <div className="screen-topbar" aria-hidden="true">
        <span className="screen-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{media.label}</span>
      </div>
      <img
        src={media.src}
        srcSet={media.srcSet}
        sizes="(max-width:600px) 75vw, (max-width:1024px) 50vw, 850px"
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </div>
  );
}

export function ProjectArtwork({
  project,
  decorative = false,
  priority = false,
}: {
  project: Project;
  decorative?: boolean;
  priority?: boolean;
}) {
  const cover = project.media[0];
  if (project.artwork && project.media.length >= 3) {
    const { variant, title, detail } = project.artwork;
    const primary =
      project.media[variant === "tools" ? 1 : variant === "finance" ? 2 : 0];
    const secondary =
      project.media[
        variant === "tools"
          ? 2
          : variant === "support" || variant === "finance"
            ? 1
            : 2
      ];
    return (
      <div
        className={`work-artwork product-composition composition-${variant}`}
        aria-hidden={decorative || undefined}
      >
        <div className="composition-copy" aria-hidden="true">
          <span className="composition-title">{title}</span>
          <span className="composition-detail">{detail}</span>
        </div>
        <Screen
          media={primary}
          priority={priority}
          className="composition-primary"
        />
        <Screen
          media={secondary}
          priority={false}
          className="composition-secondary"
        />
        <span className="composition-footnote">
          {project.id === "reimagined"
            ? "Actual app / original fixture"
            : project.kind === "Systems"
              ? "Actual app / demo data"
              : "Actual application views"}
        </span>
      </div>
    );
  }
  if (project.id === "peso-flow")
    return (
      <div
        className="work-artwork mobile-artwork"
        aria-hidden={decorative || undefined}
      >
        <div className="mobile-artwork-copy" aria-hidden="true">
          <span>
            Own your
            <br />
            everyday.
          </span>
          <small>Local-first personal finance</small>
        </div>
        <div className="app-screen screen-secondary" aria-hidden="true">
          <img
            src={project.media[1].src}
            srcSet="/projects/peso-flow-budgets-195.webp 195w, /projects/peso-flow-budgets.webp 390w"
            sizes="(max-width:600px) 35vw, 22vw"
            alt=""
            width={390}
            height={1600}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
          />
        </div>
        <div className="app-screen screen-primary">
          <img
            src={project.media[0].src}
            srcSet="/projects/peso-flow-home-195.webp 195w, /projects/peso-flow-home.webp 390w"
            sizes="(max-width:600px) 35vw, 22vw"
            alt={project.media[0].alt}
            width={390}
            height={1447}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
          />
        </div>
        <span className="artwork-caption">
          App interface / test fixture data
        </span>
      </div>
    );
  if (cover)
    return (
      <div
        className={`work-artwork web-artwork ${project.id === "pokechamp" ? "work-artwork-navy" : "work-artwork-slate"}`}
        aria-hidden={decorative || undefined}
      >
        <img
          src={cover.src}
          srcSet={
            project.id === "pokechamp"
              ? "/projects/pokechamp-800.webp 800w, /projects/pokechamp.webp 1440w"
              : project.id === "pixeltools"
                ? "/projects/pixeltools-640.webp 640w, /projects/pixeltools.webp 960w"
                : cover.srcSet
          }
          sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 600px"
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
        <span className="artwork-caption">
          {project.id === "pokechamp"
            ? "Actual team builder / sample roster"
            : project.id === "pixeltools"
              ? "Browser-based image tools"
              : cover.caption}
        </span>
      </div>
    );
  return (
    <div
      className="work-artwork note-artwork"
      aria-hidden={decorative || undefined}
    >
      <span className="note-title">{project.title}</span>
      <span>Facial recognition</span>
      <span className="artwork-caption">Project note</span>
    </div>
  );
}
