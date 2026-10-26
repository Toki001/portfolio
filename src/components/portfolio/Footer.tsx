import { siteConfig } from "../../config/site";
export function Footer({ innerPage = false }: { innerPage?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <a href={innerPage ? "/" : "#home"} className="footer-name">
          {siteConfig.identity.name}
        </a>
        <span>
          {siteConfig.identity.title} / {siteConfig.location.country}
        </span>
        <a href="#main-content">Back to top ↑</a>
      </div>
      <div className="container footer-bottom">
        <span>
          © {siteConfig.footer.copyrightYear} {siteConfig.identity.name}
        </span>
        <a href="/projects">All projects</a>
        {siteConfig.resumeUrl && (
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        )}
        <span>{siteConfig.footer.craftedWith}</span>
      </div>
    </footer>
  );
}
