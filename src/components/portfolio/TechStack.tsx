import { siteConfig } from "../../config/site";
import { TextMask } from "./TextMask";
import { PixelHandoff } from "./PixelHandoff";
export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="capabilities section"
      tabIndex={-1}
      aria-labelledby="capability-title"
    >
      <PixelHandoff />
      <div className="container capability-layout">
        <div className="capability-intro" data-reveal>
          <h2 id="capability-title">
            <TextMask>From interface</TextMask>
            <TextMask>to infrastructure.</TextMask>
          </h2>
          <p>
            I care about what a product feels like — and what keeps it working
            underneath.
          </p>
          <a className="text-link" href="/projects">
            See it in the projects <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="capability-list">
          {siteConfig.techDomains.map((domain, i) => (
            <details
              key={domain.index}
              open={i === 0}
              className="capability-detail"
            >
              <summary>
                <span className="capability-index">{domain.index}</span>
                <span className="capability-name">{domain.title}</span>
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
