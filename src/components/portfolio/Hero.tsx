import { siteConfig } from "../../config/site";
import { Arrow } from "./Arrow";
import { TextMask } from "./TextMask";
import { useHeroHandoff } from "../../hooks/useHeroHandoff";
export function Hero() {
  const { identity, location } = siteConfig;
  const hero = useHeroHandoff();
  const [givenName, ...familyName] = identity.name.split(" ");
  return (
    <section
      ref={hero}
      id="home"
      className="hero container"
      tabIndex={-1}
      aria-labelledby="identity-title"
    >
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-introduction">
            <span aria-hidden="true">01 /</span> Hello, I’m
          </p>
          <h1 id="identity-title" className="hero-title">
            <TextMask>{givenName}</TextMask>
            <TextMask>
              {familyName.join(" ")}
              <span className="name-period">.</span>
            </TextMask>
          </h1>
          <div className="hero-positioning">
            <p className="hero-role">{identity.title}</p>
            <p className="hero-description">{identity.heroStatement}</p>
          </div>
          <div className="hero-actions">
            <a
              className="button"
              href="#projects"
              data-pointer-surface="magnetic"
            >
              <span className="magnetic-content" data-pointer-layer>
                Explore my work <Arrow diagonal={false} />
              </span>
            </a>
            <a className="text-link" href="#contact">
              Get in touch <Arrow />
            </a>
          </div>
        </div>
        <figure className="hero-portrait" data-hero-depth>
          <div className="portrait-stage" data-pointer-surface="portrait">
            <div className="portrait-image" data-pointer-layer>
              <picture>
                <source
                  type="image/avif"
                  srcSet={identity.profileAvifSrcSet}
                  sizes="(max-width:600px) min(68vw, 304px), (max-width:1024px) 34vw, 400px"
                />
                <img
                  width={480}
                  height={576}
                  srcSet={identity.profileSrcSet}
                  sizes="(max-width:600px) min(68vw, 304px), (max-width:1024px) 34vw, 400px"
                  fetchPriority="high"
                  decoding="async"
                  src={identity.profileImage}
                  alt={`${identity.name} in his graduation gown`}
                />
              </picture>
            </div>
            <span className="portrait-curtain" aria-hidden="true" />
            <span
              className="portrait-light"
              data-pointer-light
              aria-hidden="true"
            />
          </div>
          <figcaption>
            <span>
              {location.country}
              <br />
              <span className="muted">Code with purpose.</span>
            </span>
            <a href="#about" className="portrait-about">
              A little about me <Arrow />
            </a>
          </figcaption>
        </figure>
      </div>
      <div className="hero-colophon">
        <span>
          {location.country}{" "}
          <span className="muted">/ {location.timeZoneLabel}</span>
        </span>
        <span className="hero-disciplines">
          Mobile <span aria-hidden="true">/</span> Web{" "}
          <span aria-hidden="true">/</span> Machine learning
        </span>
        <a href="#projects">
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
