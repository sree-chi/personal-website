import { useState, useEffect, useRef } from 'react';
import { Briefcase, Code, Users } from 'lucide-react';

import projects from './data/projects';

import NavHero from './components/NavHero';
import SectionHeader from './components/SectionHeader';
import SectionDivider from './components/SectionDivider';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ClubCard from './components/ClubCard';
import QuantumTransition from './components/QuantumTransition';



/* ─────────────────────────────────────────────────
   Main Portfolio Component
───────────────────────────────────────────────── */
const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [langIndex, setLangIndex] = useState(0);

  // Quantum transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionSource, setTransitionSource] = useState('home');
  const [transitionTarget, setTransitionTarget] = useState(null);

  // Whether the nav should be in compact (top-bar) mode
  const isCompact = activeSection !== 'home' || isTransitioning;

  // Language cycling — only when nav is compact
  useEffect(() => {
    if (!isCompact) { setLangIndex(0); return; }
    const interval = setInterval(() => setLangIndex(prev => (prev + 1) % 2), 2000); // Telugu ↔ English
    return () => clearInterval(interval);
  }, [isCompact]);

  const handleNavClick = (section) => {
    if (section === activeSection || isTransitioning) return;

    setTransitionSource(activeSection);
    setTransitionTarget(section);
    setIsTransitioning(true);

    // Switch content after the full 2500ms animation
    setTimeout(() => {
      setActiveSection(section);
      setIsTransitioning(false);
      setTransitionTarget(null);
    }, 2500);
  };

  const contentRef = useRef(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">

      {/* ── Nav / Hero ─────────────────────────── */}
      <NavHero
        isCompact={isCompact}
        activeSection={activeSection}
        langIndex={langIndex}
        onNavClick={handleNavClick}
        isTransitioning={isTransitioning}
      />

      {/* ── Quantum Transition Overlay ──────────── */}
      {isTransitioning && (
        <QuantumTransition source={transitionSource} target={transitionTarget} />
      )}

      {/* ── Main Content ────────────────────────── */}
      <main
        ref={contentRef}
        className="relative z-10"
        style={{ paddingTop: isCompact ? '5rem' : '100vh' }}
      >

        {/* ── SECTION content ──────────────────── */}
        {isCompact && !isTransitioning && (
          <div
            className="container mx-auto px-6 pb-24 max-w-5xl"
            style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}
          >
            {/* Internships */}
            {activeSection === 'internships' && (
              <section className="mb-24">
                <SectionHeader icon={<Briefcase className="text-cyan-400" />} title="Internships" />
                <div className="grid gap-8">
                  <ExperienceCard
                    role="Software Engineering Intern"
                    company="CarMax"
                    date="June 2026 – August 2026"
                    description=""
                    skills={['Azure', 'React']}
                  />
                  <ExperienceCard
                    role="Computer Vision Research Intern"
                    company="NYU Stern Department of Economics"
                    date="December 2025 – February 2026"
                    description=""
                    skills={['Python', 'OpenCV', 'PaddleOCR', 'TesseractOCR']}
                  />
                  <ExperienceCard
                    role="Software Development Intern"
                    company="APS Data Technologies"
                    date="May 2025 – December 2025"
                    description=""
                    skills={['Python', 'React']}
                  />
                  <ExperienceCard
                    role="AI Engineering Intern"
                    company="eAlliance"
                    date="May 2024 – May 2025"
                    description=""
                    skills={['Python', 'n8n.io', 'LangChain']}
                  />
                </div>
              </section>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <section className="mb-24">
                <SectionHeader icon={<Code className="text-cyan-400" />} title="Projects" />
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Clubs */}
            {activeSection === 'clubs' && (
              <section className="mb-24">
                <SectionHeader icon={<Users className="text-cyan-400" />} title="Clubs & Leadership" />
                <div className="grid gap-6">
                  <ClubCard
                    name="Computer Science Society"
                    role="President"
                    date="Sept 2023 – Present"
                    description="Organized weekly technical workshops attended by 50+ students. Led a team of 10 officers to host the annual university Hackathon with over 500 participants and $10k in sponsorship."
                  />
                  <ClubCard
                    name="Robotics Team"
                    role="Lead Programmer"
                    date="Jan 2022 – May 2023"
                    description="Designed the autonomous navigation system for the competition rover. Implemented PID controllers for precise arm movement and computer vision for object detection."
                  />
                </div>
              </section>
            )}

            <footer className="text-center pt-12 border-t border-slate-800 text-slate-500 text-sm">
              <p>© {new Date().getFullYear()} Sreehaas Chinnala. Built with React.</p>
            </footer>
          </div>
        )}
      </main>

      {/* ── Project Modal ────────────────────────── */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* ── Keyframe for content fade-in ─────────── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;