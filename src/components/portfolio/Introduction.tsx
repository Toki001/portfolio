import { siteConfig } from "../../config/site";
import { ScrollText, SectionLabel } from "./ScrollText";
export function Introduction() {
  return (
    <section
      className="container editorial-introduction"
      aria-label="My approach"
    >
      <div data-reveal="sequence" data-handoff>
        <SectionLabel>My approach</SectionLabel>
        <p className="intro-statement">
          <ScrollText>{siteConfig.about.paragraphs[1]}</ScrollText>
        </p>
      </div>
    </section>
  );
}
