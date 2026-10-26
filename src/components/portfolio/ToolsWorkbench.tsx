import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../config/site";
import { ScrollText } from "./ScrollText";
import { TextMask } from "./TextMask";
import { ToolGlyph } from "./ToolGlyph";
import { createMotionScope } from "../../motion/animate";
export function ToolsWorkbench() {
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const previous = useRef(active);
  const illustration = useRef<HTMLDivElement>(null);
  useEffect(() => setEnhanced(true), []);
  useEffect(() => {
    if (previous.current === active) return;
    previous.current = active;
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
        <ol className="tools-list">
          {siteConfig.tools.map((tool, i) => (
            <li
              className="tool-row"
              key={tool.id}
              data-reveal="row"
              data-active={i === active || undefined}
              onPointerEnter={(event) => {
                if (
                  event.pointerType === "mouse" &&
                  matchMedia("(hover: hover) and (pointer: fine)").matches
                )
                  setActive(i);
              }}
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
                  <button
                    className="tool-select"
                    type="button"
                    disabled={!enhanced}
                    aria-pressed={i === active}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <ScrollText>{tool.name}</ScrollText>
                  </button>
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
