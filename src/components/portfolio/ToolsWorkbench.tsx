import { siteConfig } from '../../config/site';
export function ToolsWorkbench() {
  return <section id="tools" className="container section tools-section" tabIndex={-1} aria-labelledby="tools-title">
    <div className="section-heading" data-reveal><h2 id="tools-title">The workbench<span className="heading-period">.</span></h2><p>A few familiar tools, from the first sketch to the last test.</p></div>
    <ol className="tools-list">{siteConfig.tools.map((tool,i) => <li className="tool-row" key={tool.id} data-reveal><span className="tool-index">{String(i+1).padStart(2,'0')}</span><div><span className="tool-category">{tool.categoryLabel.toLowerCase()}</span><h3>{tool.name}</h3></div><p>{tool.description}</p></li>)}</ol>
  </section>;
}
