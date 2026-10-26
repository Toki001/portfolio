import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../config/site";
import { Arrow } from "./Arrow";
import { ScrollText } from "./ScrollText";
import { createMotionScope, motion } from "../../motion/animate";
export function Contact() {
  const [message, setMessage] = useState("");
  const [canCopy, setCanCopy] = useState(false);
  const { contact, socials, availability } = siteConfig;
  const status = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!message || !status.current) return;
    const scope = createMotionScope();
    scope.play(
      status.current,
      [
        { transform: "translateY(4px)", opacity: 0.5 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { duration: motion.micro },
    );
    return () => scope.cancel();
  }, [message]);
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
        <div className="contact-top">
          <p>Have something in mind?</p>
          {availability && <p>{availability}</p>}
        </div>
        <a
          className="contact-invitation"
          data-pointer-surface="magnetic"
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subjectPrefix)}`}
          data-reveal="sequence"
        >
          <h2 id="contact-title">
            <ScrollText>Let’s build</ScrollText>
            <ScrollText>something together.</ScrollText>
          </h2>
          <span className="contact-arrow" data-pointer-layer>
            <Arrow />
          </span>
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
            <p ref={status} className="copy-status" role="status">
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
