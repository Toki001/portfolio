import { siteConfig } from "../../config/site";
import { ScrollText, SectionLabel } from "./ScrollText";
export function About() {
  const { about, location, currentFocus } = siteConfig;
  return (
    <section
      id="about"
      className="about-section section"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <div className="container about-layout">
        <div className="about-heading" data-reveal="sequence" data-handoff>
          <SectionLabel>About</SectionLabel>
          <h2 id="about-title">
            <ScrollText>The person</ScrollText>
            <ScrollText accentEnd>behind the code.</ScrollText>
          </h2>
          <p>
            {siteConfig.identity.name}
            <br />
            <span>
              {location.region}, {location.country}
            </span>
          </p>
        </div>
        <div className="about-story">
          {about.paragraphs
            .filter((_, i) => i !== 1)
            .map((paragraph, i) => (
              <p key={paragraph}>
                {i === 0 ? (
                  <ScrollText variant="body">{paragraph}</ScrollText>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          <dl className="about-facts">
            <div>
              <dt>Education</dt>
              <dd>
                {about.education.degree}
                <span>{about.education.school}</span>
              </dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>
                {currentFocus.architecture}
                <span>{currentFocus.tags.join(", ")}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
