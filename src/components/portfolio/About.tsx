import { siteConfig } from "../../config/site";
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
        <div className="about-heading" data-reveal>
          <h2 id="about-title">
            The person
            <br />
            behind the code<span className="heading-period">.</span>
          </h2>
          <p>
            {siteConfig.identity.name}
            <br />
            <span>
              {location.region}, {location.country}
            </span>
          </p>
        </div>
        <div className="about-story" data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
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
