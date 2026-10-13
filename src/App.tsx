import { FluidBackground } from './components/portfolio/FluidBackground';
import { Header } from './components/portfolio/Header';
import { Hero } from './components/portfolio/Hero';
import { Projects } from './components/portfolio/Projects';
import { TechStack } from './components/portfolio/TechStack';
import { ToolsWorkbench } from './components/portfolio/ToolsWorkbench';
import { About } from './components/portfolio/About';
import { Contact } from './components/portfolio/Contact';
import { Footer } from './components/portfolio/Footer';
import { useActiveSection } from './hooks/useActiveSection';

const sectionIds = ['home', 'projects', 'tech-stack', 'tools', 'about', 'contact'];

function App() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="bg-[#fcf9f0] text-primary antialiased font-body-md text-body-md selection:bg-secondary-fixed selection:text-secondary relative min-h-screen">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <FluidBackground />
      <Header activeSection={activeSection} />
      
      <main id="main-content" tabIndex={-1} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <Hero />
        <Projects />
        <TechStack />
        <ToolsWorkbench />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
