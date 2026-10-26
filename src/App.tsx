import { ProjectExplorer } from './components/portfolio/ProjectExplorer';
import { ProjectPage } from './components/portfolio/ProjectPage';
import { NotFound } from './components/portfolio/NotFound';
import { getProject } from './content/projects';
import { siteConfig } from './config/site';
import { Header } from './components/portfolio/Header';
import { Hero } from './components/portfolio/Hero';
import { Projects } from './components/portfolio/Projects';
import { TechStack } from './components/portfolio/TechStack';
import { ToolsWorkbench } from './components/portfolio/ToolsWorkbench';
import { About } from './components/portfolio/About';
import { Contact } from './components/portfolio/Contact';
import { Footer } from './components/portfolio/Footer';
import { useEditorialMotion } from './hooks/useEditorialMotion';
import { useActiveSection } from './hooks/useActiveSection';

const sectionIds = ['home', 'projects', 'tech-stack', 'tools', 'about', 'contact'];

function App({ pathname }: { pathname?: string } = {}) {
  const path = pathname ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const activeSection = useActiveSection(sectionIds);
  const progress = useEditorialMotion();

  if (path !== '/') {
    const match = path.match(/^\/projects\/([a-z0-9-]+)\/?$/);
    const project = match ? getProject(match[1]) : undefined;
    return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><Header activeSection="projects" innerPage /><main id="main-content" tabIndex={-1}>{path === '/projects' || path === '/projects/' ? <ProjectExplorer /> : project ? <ProjectPage project={project} /> : <NotFound />}</main><footer className="inner-footer"><div className="container"><span>{siteConfig.identity.name}</span><a href="/#contact">Let’s build something together</a><a href="/">Back to home</a></div></footer></div>;
  }
  return (
    <div className="app-shell">
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <Header activeSection={activeSection} />
      
      <main id="main-content" tabIndex={-1} >
        <Hero />
        <Projects />
        <div className="container legacy-sections">
        <TechStack />
        <ToolsWorkbench />
        <About />
        <Contact />
        <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
