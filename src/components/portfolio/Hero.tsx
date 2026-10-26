import { siteConfig } from '../../config/site';
import { Arrow } from './Arrow';

export function Hero() {
  const { identity, location } = siteConfig;
  const [givenName, ...familyName] = identity.name.split(" ");
  return <section id="home" className="hero container" tabIndex={-1} aria-labelledby="identity-title">
    <div className="hero-grid">
      <div className="hero-copy">
        <p className="hero-introduction">Hello, I’m</p>
        <h1 id="identity-title" className="hero-title"><span>{givenName}</span><span>{familyName.join(" ")}<span className="name-period">.</span></span></h1>
        <div className="hero-positioning">
          <p className="hero-role">{identity.title}</p>
          <p className="hero-description">{identity.heroStatement}</p>
        </div>
        <div className="hero-actions">
          <a className="button" href="#projects">Explore my work <Arrow diagonal={false} /></a>
          <a className="text-link" href="#contact">Get in touch <Arrow /></a>
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-stage">
          <span className="portrait-arc" aria-hidden="true" />
          <span className="portrait-word" aria-hidden="true">&lt;/&gt;</span>
          <img width={384} height={384} fetchPriority="high" decoding="async" src={identity.profileImage} alt={`${identity.name} in his graduation gown`} />
          <a href="#about" className="portrait-about">A little about me <Arrow /></a>
        </div>
        <figcaption><span>Code with purpose.</span><span>Build with care.</span></figcaption>
      </figure>
    </div>
    <div className="hero-colophon">
      <span>{location.country} <span className="muted">/ GMT+8</span></span>
      <span className="hero-disciplines">Mobile <span aria-hidden="true">/</span> Web <span aria-hidden="true">/</span> Machine learning</span>
      <a href="#projects">Scroll to explore <span aria-hidden="true">↓</span></a>
    </div>
  </section>;
}
