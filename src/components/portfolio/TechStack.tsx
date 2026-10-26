import { useEffect, useRef } from "react";
import { createMotionScope, canAnimate } from "../../motion/animate";
import { siteConfig } from "../../config/site";
import { ScrollText, SectionLabel } from "./ScrollText";
import { projects } from "../../content/projects";
import { Arrow } from "./Arrow";
import { TechMark } from "./TechMark";
import { PixelHandoff } from "./PixelHandoff";
export function TechStack() {
  const list = useRef<HTMLDivElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const inputPointer = useRef("");
  useEffect(() => {
    const node = list.current;
    const scopes = new Map<
      HTMLDetailsElement,
      ReturnType<typeof createMotionScope>
    >();
    const toggle = (event: Event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      const detail = event.target;
      let scope = scopes.get(detail);
      if (!scope) {
        scope = createMotionScope();
        scopes.set(detail, scope);
      }
      scope.cancel();
      if (!detail.open) return;
      // Fallback exclusivity for engines without native details[name] grouping.
      node?.querySelectorAll("details").forEach((other) => {
        if (other !== detail) other.open = false;
      });
      if (!canAnimate()) return;
      const bounds = detail.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      detail
        .querySelectorAll(".capability-content p, .stack-tags li")
        .forEach((item, i) =>
          scope.play(
            item,
            [
              { transform: "translateY(9px)", opacity: 0 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: 160, delay: Math.min(i, 5) * 20, fill: "backwards" },
          ),
        );
    };
    node?.addEventListener("toggle", toggle, true);
    return () => {
      scopes.forEach((scope) => scope.cancel());
      node?.removeEventListener("toggle", toggle, true);
    };
  }, []);
  return (
    <section
      id="tech-stack"
      className="capabilities section"
      tabIndex={-1}
      aria-labelledby="capability-title"
    >
      <PixelHandoff />
      <div className="container capability-layout">
        <div className="capability-intro" data-reveal="sequence" data-handoff>
          <SectionLabel>Engineering</SectionLabel>
          <h2 id="capability-title">
            <ScrollText>From interface</ScrollText>
            <ScrollText>to infrastructure.</ScrollText>
          </h2>
          <p>
            I care about what a product feels like — and what keeps it working
            underneath.
          </p>
          <div className="engineering-map" aria-label="Product layers">
            <span className="engineering-connector" aria-hidden="true" />
            {[
              ["01", "Interface", "React / Flutter"],
              ["02", "Application", "State / APIs"],
              ["03", "Persistence", "Local / cloud"],
            ].map(([number, name, detail]) => (
              <div className="engineering-layer" key={number}>
                <span aria-hidden="true">{number}</span>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          <a className="text-link" href="/projects">
            See it in the projects <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div
          className="capability-list"
          ref={list}
          onPointerDownCapture={(event) => {
            inputPointer.current = event.pointerType;
          }}
          onPointerLeave={() => {
            lastPoint.current = null;
          }}
          onPointerMove={(event) => {
            if (
              event.pointerType !== "mouse" ||
              !matchMedia("(hover: hover) and (pointer: fine)").matches
            )
              return;
            if (
              lastPoint.current?.x === event.clientX &&
              lastPoint.current?.y === event.clientY
            )
              return;
            lastPoint.current = { x: event.clientX, y: event.clientY };
            const detail =
              event.target instanceof Element
                ? event.target.closest("details")
                : null;
            if (!(detail instanceof HTMLDetailsElement) || detail.open) return;
            // Hover must never hide a related-work link that still owns keyboard focus.
            const focused = document.activeElement?.closest(
              ".capability-content",
            );
            if (focused && !detail.contains(focused)) return;
            detail.open = true;
          }}
        >
          {siteConfig.techDomains.map((domain, i) => (
            <details
              key={domain.index}
              open={i === 0}
              name="engineering-capabilities"
              className="capability-detail"
              data-reveal="row"
            >
              <summary
                onClick={(event) => {
                  if (
                    event.detail > 0 &&
                    inputPointer.current === "mouse" &&
                    matchMedia("(hover: hover) and (pointer: fine)").matches
                  ) {
                    event.preventDefault();
                    (
                      event.currentTarget.parentElement as HTMLDetailsElement
                    ).open = true;
                  }
                }}
              >
                <span className="editorial-row-rule" aria-hidden="true" />
                <span className="capability-index">{domain.index}</span>
                <span className="capability-name">
                  <ScrollText>{domain.title}</ScrollText>
                </span>
                <span className="disclosure-plus" aria-hidden="true" />
              </summary>
              <div className="capability-content">
                <p>{domain.description}</p>
                <ul className="stack-tags" aria-label={`${domain.title} stack`}>
                  {domain.tags.map((tag) => (
                    <li key={tag}>
                      <TechMark name={tag} />
                      <span className="tech-name">{tag}</span>
                    </li>
                  ))}
                </ul>
                <a
                  className="capability-proof"
                  href={`/projects/${domain.proofProject}`}
                >
                  Related work:{" "}
                  {
                    projects.find(
                      (project) => project.slug === domain.proofProject,
                    )?.title
                  }
                  <Arrow />
                </a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
