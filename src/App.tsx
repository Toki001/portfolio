import { Header } from "./components/portfolio/Header";
import { Hero } from "./components/portfolio/Hero";
import { Projects } from "./components/portfolio/Projects";
import { TechStack } from "./components/portfolio/TechStack";
import { ToolsWorkbench } from "./components/portfolio/ToolsWorkbench";
import { About } from "./components/portfolio/About";
import { Contact } from "./components/portfolio/Contact";
import { Footer } from "./components/portfolio/Footer";
import { ProjectExplorer } from "./components/portfolio/ProjectExplorer";
import { ProjectPage } from "./components/portfolio/ProjectPage";
import { NotFound } from "./components/portfolio/NotFound";
import { getProject } from "./content/projects";
import { useActiveSection } from "./hooks/useActiveSection";
import { useEditorialMotion } from "./hooks/useEditorialMotion";
import { usePointerMotion } from "./hooks/usePointerMotion";
const sectionIds = [
  "home",
  "projects",
  "tech-stack",
  "tools",
  "about",
  "contact",
];
function App({ pathname }: { pathname?: string } = {}) {
  const path =
    pathname ??
    (typeof window === "undefined" ? "/" : window.location.pathname);
  const activeSection = useActiveSection(sectionIds);
  const progress = useEditorialMotion();
  usePointerMotion();
  const isHome = path === "/";
  const isIndex = path === "/projects" || path === "/projects/";
  const match = path.match(/^\/projects\/([a-z0-9-]+)\/?$/);
  const project = match ? getProject(match[1]) : undefined;
  return (
    <div className="app-shell">
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header
        activeSection={
          isHome ? activeSection : isIndex || project ? "projects" : ""
        }
        innerPage={!isHome}
      />
      <main id="main-content" tabIndex={-1}>
        {isHome ? (
          <>
            <Hero />
            <Projects />
            <TechStack />
            <ToolsWorkbench />
            <About />
            <Contact />
          </>
        ) : isIndex ? (
          <ProjectExplorer />
        ) : project ? (
          <ProjectPage project={project} />
        ) : (
          <NotFound />
        )}
      </main>
      <Footer innerPage={!isHome} />
    </div>
  );
}
export default App;
