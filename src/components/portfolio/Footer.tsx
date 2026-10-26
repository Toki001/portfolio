import { siteConfig } from '../../config/site';
export function Footer({ innerPage = false }: { innerPage?: boolean }) {
  return <footer className="site-footer"><div className="container footer-top"><a href={innerPage ? '/' : '#home'} className="footer-name">{siteConfig.identity.name}</a><span>Software engineer / Philippines</span><a href="#main-content">Back to top ↑</a></div><div className="container footer-bottom"><span>© {siteConfig.footer.copyrightYear} {siteConfig.footer.copyrightName}</span><a href="/projects">All projects</a><span>{siteConfig.footer.craftedWith}</span></div></footer>;
}
