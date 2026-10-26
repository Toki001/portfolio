import { useEffect, useState } from "react";
import { siteConfig } from "../../config/site";
import { Arrow } from "./Arrow";
export function Contact() {
  const [message, setMessage] = useState("");
  const [canCopy, setCanCopy] = useState(false);
  const { contact, socials, availability } = siteConfig;
  useEffect(() => {
    setCanCopy(Boolean(navigator.clipboard?.writeText));
  }, []);
  return (
    <section
      id="contact"
      className="contact-section section"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact-top" data-reveal>
          <p>Have something in mind?</p>
          {availability && <p>{availability}</p>}
        </div>
        <a
          className="contact-invitation"
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subjectPrefix)}`}
          data-reveal
        >
          <h2 id="contact-title">
            Let’s build
            <br />
            something together.
          </h2>
          <Arrow />
        </a>
        <div className="contact-bottom">
          <div className="direct-email">
            <a className="contact-email" href={`mailto:${contact.email}`}>
              <span>{contact.email}</span>
              <Arrow />
            </a>
            {canCopy && (
              <button
                className="copy-email"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(contact.email);
                    setMessage("Email address copied.");
                  } catch {
                    setMessage(
                      "Couldn’t copy. Select the email address above, or open your email app.",
                    );
                  }
                }}
              >
                Copy email
              </button>
            )}
            <p className="copy-status" role="status">
              {message}
            </p>
            <p className="email-note">Opens a draft in your email app.</p>
          </div>
          <nav className="contact-socials" aria-label="Social profiles">
            {Object.values(socials)
              .filter((s) => s.url)
              .map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <Arrow />
                </a>
              ))}
            <p>
              Discord <span>{socials.discord.handle}</span>
            </p>
          </nav>
        </div>
      </div>
    </section>
  );
}
