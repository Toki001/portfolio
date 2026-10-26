import { useEffect, useRef } from "react";
import { createMotionScope, canAnimate } from "../../motion/animate";
import { siteConfig } from "../../config/site";
import { ScrollText, SectionLabel } from "./ScrollText";
import { PixelHandoff } from "./PixelHandoff";
export function TechStack() {
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = list.current;
    const scope = createMotionScope();
    const toggle = (event: Event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      scope.cancel();
      if (!event.target.open || !canAnimate()) return;
      const bounds = event.target.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      event.target
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
      scope.cancel();
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
          <a className="text-link" href="/projects">
            See it in the projects <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="capability-list" ref={list}>
          {siteConfig.techDomains.map((domain, i) => (
            <details
              key={domain.index}
              open={i === 0}
              className="capability-detail"
              data-reveal="row"
            >
              <summary>
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
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
