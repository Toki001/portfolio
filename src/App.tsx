import React from 'react';
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

function App() {
  const activeSection = useActiveSection(['home', 'projects', 'tech-stack', 'tools', 'about', 'contact']);

  return (
    <div className="bg-[#fcf9f0] text-primary antialiased font-body-md text-body-md selection:bg-secondary-fixed selection:text-secondary relative min-h-screen">
      <FluidBackground />
      <Header activeSection={activeSection} />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
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
