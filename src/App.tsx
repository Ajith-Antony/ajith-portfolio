import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { KineticTicker } from './components/KineticTicker';
import { HeroSection } from './components/HeroSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { MiniGames } from './components/MiniGames';
import { EngineeringPhilosophy } from './components/EngineeringPhilosophy';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>
      {/* Amber custom cursor */}
      <CustomCursor />

      {/* Left side gutter — vertical "AJITH" label */}
      <div className="side-gutter">
        <span className="side-gutter-text">AJITH · APA · FE</span>
      </div>

      {/* All content pushed right of the 48px gutter */}
      <div style={{ marginLeft: '48px' }}>
        {/* Fixed top nav */}
        <Navbar
          onOpenContact={() => setContactOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Live data ticker — sits just below nav */}
        <div style={{ paddingTop: '48px' }}>
          <KineticTicker />
        </div>

        {/* Main Sections */}
        <main>
          <HeroSection
            onOpenContact={() => setContactOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
          />
          <ProjectShowcase />
          <SkillsSection />
          <ExperienceTimeline />
          <MiniGames />
          <EngineeringPhilosophy />
        </main>

        <Footer />
      </div>

      {/* Modals */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

export default App;
