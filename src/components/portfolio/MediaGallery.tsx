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
  const touch = useRef<{ id: number; x: number; y: number } | null>(null);
  const pages = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = pages.current,
      button = rail?.querySelector<HTMLButtonElement>(
        'button[aria-pressed="true"]',
      );
    if (rail && button)
      rail.scrollLeft =
        button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2;
  }, [active, enhanced]);
  const count = project.media.length;
  const mobileShowcase = project.kind === "Mobile" && count >= 3;
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
          className={`gallery-image ${mobileShowcase ? "mobile-gallery-showcase" : project.kind === "Mobile" ? "gallery-image-mobile" : "gallery-image-web"}`}
          data-reveal={mobileShowcase ? "gallery" : undefined}
          style={
            project.kind === "Mobile"
              ? undefined
              : {
                  aspectRatio: Math.max(
                    0.9,
                    Math.min(
                      1.7,
                      ...project.media.map((m) => m.width / m.height),
                    ),
                  ),
                }
          }
          onPointerDown={(e) => {
            if (e.pointerType === "touch" && e.isPrimary) {
              touch.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
              e.currentTarget.setPointerCapture(e.pointerId);
            }
          }}
          onPointerCancel={() => {
            touch.current = null;
          }}
          onPointerUp={(e) => {
            const start = touch.current;
            touch.current = null;
            if (!start || start.id !== e.pointerId || count < 2) return;
            const dx = e.clientX - start.x,
              dy = e.clientY - start.y;
            if (Math.abs(dx) > 50 && Math.abs(dy) < Math.abs(dx) * 0.5)
              change(active + (dx < 0 ? 1 : -1));
          }}
        >
          {mobileShowcase ? (
            project.media.map((item, i) => (
              <div
                className="mobile-preview-card"
                key={item.src}
                data-active={i === active || undefined}
              >
                <button
                  type="button"
                  className="mobile-preview-select"
                  disabled={!enhanced}
                  aria-label={`Select ${item.label ?? `screen ${i + 1}`} preview`}
                  aria-pressed={i === active}
                  onClick={() => change(i)}
                >
                  <img
                    ref={i === active ? image : undefined}
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(max-width:768px) 75vw, 340px"
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                <div className="mobile-preview-label" aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                  {i === active && (
                    <span className="mobile-preview-status">Selected</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <img
              ref={image}
              src={media.src}
              srcSet={media.srcSet}
              sizes="(max-width:600px) 90vw, (max-width:1024px) 85vw, 1100px"
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
            />
          )}
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
            ref={pages}
            role="group"
            aria-label="Choose screenshot"
          >
            {project.media.map((item, i) => (
              <button
                key={i}
                aria-label={`Screenshot ${String(i + 1).padStart(2, "0")}: ${item.label ?? `View ${i + 1}`}`}
                className="gallery-thumb"
                aria-pressed={active === i}
                onClick={() => change(i)}
              >
                <img
                  src={item.thumbnail ?? item.src}
                  width={160}
                  height={100}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <span>{String(i + 1).padStart(2, "0")}</span>{" "}
                  {item.label ?? `View ${i + 1}`}
                </span>
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
