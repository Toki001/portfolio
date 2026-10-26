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

function App() {
  const activeSection = useActiveSection(sectionIds);
  const progress = useEditorialMotion();

  return (
    <div className="app-shell">
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>

      <Header activeSection={activeSection} />
      
      <main id="main-content" tabIndex={-1} >
        <Hero />
        <div className="container legacy-sections">
        <Projects />
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
