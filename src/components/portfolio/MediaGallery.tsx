import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "../../content/projects";
import { Arrow } from "./Arrow";
import { createMotionScope, motion } from "../../motion/animate";

export function MediaGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const zoom = useRef<HTMLButtonElement>(null);
  const image = useRef<HTMLImageElement>(null),
    userChange = useRef(false),
    direction = useRef(1),
    scope = useRef(createMotionScope());
  useEffect(() => () => scope.current.cancel(), []);
  useEffect(() => {
    if (!userChange.current || !image.current) return;
    userChange.current = false;
    const current = getComputedStyle(image.current).transform;
    scope.current.play(
      image.current,
      [
        {
          transform:
            current === "none"
              ? `translateX(${direction.current * 20}px) scale(.985)`
              : current,
          opacity: 0.6,
        },
        { transform: "translateX(0) scale(1)", opacity: 1 },
      ],
      { duration: 180 },
    );
  }, [active]);
  const titleId = useId();
  const count = project.media.length;
  useEffect(() => {
    setEnhanced(true);
    const sync = () => {
      const value = Number(new URLSearchParams(location.search).get("media"));
      setActive(
        Number.isInteger(value) && value > 0 && value <= count ? value - 1 : 0,
      );
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [count]);
  if (!count) return null;
  const media = project.media[active];
  const change = (index: number) => {
    const next = (index + count) % count;
    direction.current = index > active ? 1 : -1;
    userChange.current = true;
    setActive(next);
    const url = new URL(location.href);
    if (next === 0) url.searchParams.delete("media");
    else url.searchParams.set("media", String(next + 1));
    history.replaceState(null, "", url.pathname + url.search + url.hash);
  };
  return (
    <section
      className="case-gallery"
      aria-label={`${project.title} screenshots`}
      aria-roledescription={count > 1 && enhanced ? "carousel" : undefined}
      tabIndex={count > 1 && enhanced ? 0 : undefined}
      onKeyDown={(e) => {
        if (dialog.current?.open) return;
        if (count > 1 && ["ArrowLeft", "ArrowRight"].includes(e.key)) {
          e.preventDefault();
          change(active + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="gallery-heading">
        <h2>Inside the interface</h2>
        {enhanced ? (
          <button
            ref={zoom}
            className="text-button"
            onClick={() => {
              if (!dialog.current) return;
              dialog.current.showModal();
              scope.current.play(
                dialog.current,
                [
                  { transform: "translateY(12px) scale(.97)", opacity: 0.6 },
                  { transform: "translateY(0) scale(1)", opacity: 1 },
                ],
                { duration: motion.ui },
              );
            }}
          >
            View larger <Arrow />
          </button>
        ) : (
          <a className="text-button" href={media.src}>
            View larger <Arrow />
          </a>
        )}
      </div>
      <figure>
        <div
          className={`gallery-image ${project.kind === "Mobile" ? "gallery-image-mobile" : ""}`}
        >
          <img
            ref={image}
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption aria-live="polite">
          {count > 1 ? `${active + 1} of ${count}. ` : ""}
          {media.caption}
        </figcaption>
      </figure>
      {count > 1 && enhanced && (
        <div className="gallery-controls">
          <button
            className="gallery-step"
            onClick={() => change(active - 1)}
            aria-label="Previous screenshot"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div
            className="gallery-pages"
            role="group"
            aria-label="Choose screenshot"
          >
            {project.media.map((_, i) => (
              <button
                key={i}
                aria-label={`Screenshot ${String(i + 1).padStart(2, "0")}`}
                aria-pressed={active === i}
                onClick={() => change(i)}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <button
            className="gallery-step"
            onClick={() => change(active + 1)}
            aria-label="Next screenshot"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
      <noscript>
        <p className="no-script-gallery">
          {project.media.map((item, i) => (
            <a key={item.src} href={item.src}>
              Open screenshot {i + 1}
            </a>
          ))}
        </p>
      </noscript>
      <dialog
        ref={dialog}
        className="media-dialog"
        aria-labelledby={titleId}
        onClose={() => {
          scope.current.cancel();
          zoom.current?.focus();
        }}
      >
        <div className="dialog-heading">
          <h3 id={titleId}>{project.title} — interface detail</h3>
          <button onClick={() => dialog.current?.close()}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
        />
        <p>{media.caption}</p>
      </dialog>
    </section>
  );
}
