import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../config/site";
import { ScrollText } from "./ScrollText";
import { TextMask } from "./TextMask";
import { ToolGlyph } from "./ToolGlyph";
import { createMotionScope } from "../../motion/animate";
export function ToolsWorkbench() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const illustration = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = [...(list.current?.children ?? [])];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        // A reading band, not a scroll handler or a per-frame React update.
        const first = rows.findIndex((row) => visible.has(row));
        if (first >= 0) setActive(first);
      },
      { rootMargin: "-20% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const scope = createMotionScope();
    if (illustration.current)
      scope.play(
        illustration.current,
        [
          { transform: "translateY(12px) scale(.98)", opacity: 0.4 },
          { transform: "translateY(0) scale(1)", opacity: 1 },
        ],
        { duration: 220 },
      );
    return () => scope.cancel();
  }, [active]);
  const current = siteConfig.tools[active];
  return (
    <section
      id="tools"
      className="container section tools-section"
      tabIndex={-1}
      aria-labelledby="tools-title"
    >
      <div className="section-heading" data-reveal>
        <h2 id="tools-title">
          <TextMask>
            The workbench<span className="heading-period">.</span>
          </TextMask>
        </h2>
        <p>A few familiar tools, from the first sketch to the last test.</p>
      </div>
      <div className="workbench-layout">
        <aside className="workbench-stage" aria-hidden="true">
          <div className="workbench-stage-top">
            <span>In the workflow</span>
            <span>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(siteConfig.tools.length).padStart(2, "0")}
            </span>
          </div>
          <div className="workbench-illustration" ref={illustration}>
            <ToolGlyph kind={current.id} />
          </div>
          <div className="workbench-stage-bottom">
            <span>{current.categoryLabel.toLowerCase()}</span>
            <p>{current.name}</p>
          </div>
          <div className="workbench-markers">
            {siteConfig.tools.map((tool, i) => (
              <span
                key={tool.id}
                className={i === active ? "is-current" : undefined}
              />
            ))}
          </div>
        </aside>
        <ol className="tools-list" ref={list}>
          {siteConfig.tools.map((tool, i) => (
            <li
              className="tool-row"
              key={tool.id}
              data-reveal="row"
              data-active={i === active || undefined}
            >
              <span className="editorial-row-rule" aria-hidden="true" />
              <span className="tool-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="tool-identity">
                <span className="tool-category">
                  {tool.categoryLabel.toLowerCase()}
                </span>
                <h3>
                  <ScrollText>{tool.name}</ScrollText>
                </h3>
              </div>
              <span className="tool-symbol">
                <ToolGlyph kind={tool.id} />
              </span>
              <p data-row-copy>{tool.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
