import { siteConfig } from "../../config/site";
import { ScrollText } from "./ScrollText";
import { TextMask } from "./TextMask";
export function ToolsWorkbench() {
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
      <ol className="tools-list">
        {siteConfig.tools.map((tool, i) => (
          <li className="tool-row" key={tool.id} data-reveal="row">
            <span className="editorial-row-rule" aria-hidden="true" />
            <span className="tool-index">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <span className="tool-category">
                {tool.categoryLabel.toLowerCase()}
              </span>
              <h3>
                <ScrollText>{tool.name}</ScrollText>
              </h3>
            </div>
            <p data-row-copy>{tool.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
