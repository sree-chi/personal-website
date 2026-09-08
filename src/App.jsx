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
import IntroAnimation from './components/IntroAnimation';
import CardDetailPanel from './components/CardDetailPanel';



/* ─────────────────────────────────────────────────
   Main Portfolio Component
───────────────────────────────────────────────── */
const Portfolio = () => {
  // Intro animation — skip if already played this session
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem('introPlayed') === '1'
  );
  const handleIntroComplete = () => {
    sessionStorage.setItem('introPlayed', '1');
    setIntroComplete(true);
  };

  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [langIndex, setLangIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null); // { title, subtitle, bullets }

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

    // Only skip the timeout when going TO home — IntroAnimation's onComplete handles it.
    // All other transitions (home→section, section→section) use the 2500ms Bloch sphere timeout.
    if (section !== 'home') {
      setTimeout(() => {
        setActiveSection(section);
        setIsTransitioning(false);
        setTransitionTarget(null);
      }, 1800);
    }
  };

  const contentRef = useRef(null);

  // Determine which transition overlay to show
  const isHomeTrans = transitionTarget === 'home';
  const showDotTrans = isTransitioning && isHomeTrans;
  const showBlochTrans = isTransitioning && !isHomeTrans;

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className="min-h-screen text-[#f0ede8] font-sans overflow-x-hidden"
        style={{
          background: '#080813',
          // Subtle violet nebula radial behind the hero
          backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, transparent 70%)',
          fontFamily: "'Space Grotesk', 'Noto Sans Telugu', system-ui, sans-serif",
        }}
      >

        {/* ── Nav / Hero ─────────────────────────── */}
        <NavHero
          isCompact={isCompact}
          activeSection={activeSection}
          langIndex={langIndex}
          onNavClick={handleNavClick}
          isTransitioning={isTransitioning}
        />

        {/* ── Home transition: particle dot animation ── */}
        {showDotTrans && (
          <IntroAnimation
            fast
            onComplete={() => {
              setActiveSection(transitionTarget ?? 'home');
              setIsTransitioning(false);
              setTransitionTarget(null);
            }}
          />
        )}

        {/* ── Section→section: Bloch sphere ────────── */}
        {showBlochTrans && (
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
              className="container mx-auto px-6 pt-10 pb-24 max-w-5xl"
              style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}
            >
              {/* Internships */}
              {activeSection === 'internships' && (
                <section className="mb-24">
                  <SectionHeader icon={<Briefcase className="text-amber-400" />} title="Internships" />
                  <div className="grid gap-8">
                    <ExperienceCard
                      role="Software Engineering Intern"
                      company="CarMax"
                      date="June 2026 – August 2026"
                      description=""
                      skills={['Azure', 'React', 'Python', 'APIs', 'REST']}
                      bullets={[
                        "Analyzed user experiences and modified CarMax's online Sell My Car pipeline to increase user retention and engagement - ultimately improving totals by \$60 million of online appraisals annually",
                        "Constructed, trained, and tested client-side (sub-200 ms) machine learning and deep learning blur detection models to improve buyer-side efficiency in appraising submitted images",
                        "Won 3rd place out of 37 competing teams at the CarMax company-wide hackathon, by developing an Azure-powered application that tracks store shipments and alerts in-store employees of real-time supply issues"
                      ]}
                      onHoverChange={setHoveredCard}
                    />
                    <ExperienceCard
                      role="Computer Vision Research Intern"
                      company="NYU Stern Department of Economics"
                      date="December 2025 – February 2026"
                      description=""
                      skills={['Python', 'OpenCV', 'PaddleOCR', 'TesseractOCR']}
                      bullets={[
                        "Accomplished automated newspaper layout segmentation, as measured by >95% detection of long page divider lines, by combining OpenCV morphological line extraction with PaddleOCR for structure-aware OCR preprocessing",
                        "Improved OCR accuracy on historical scans, as measured by ~40% reduction in text misclassification across column boundaries, by masking and segmenting page regions using detected layout rules before OCR",
                        "Scaled document parsing pipeline, measured by consistent processing across multi-decade newspaper scans, by integrating OpenCV-based vision preprocessing with PaddleOCR for text–image–layout association"
                      ]}
                      onHoverChange={setHoveredCard}
                    />
                    <ExperienceCard
                      role="Software Development Intern"
                      company="APS Data Technologies"
                      date="May 2025 – December 2025"
                      description=""
                      skills={['Python', 'React']}
                      bullets={[
                        "Facilitated community incident management as measured by 50,000+ active users, by developing a full-stack reporting system with Next.js and Firebase Firestore",
                        "Accelerated ward-based data retrieval as measured by a 40% reduction in load times, by implementing optimized Firestore indexes and RESTful endpoints",
                        "Scaled reporting capabilities as measured by a 99% system uptime across 6 categories, by designing a secure data pipeline with environment-safe Firebase configurations"
                      ]}
                      onHoverChange={setHoveredCard}
                    />
                    <ExperienceCard
                      role="AI Engineering Intern"
                      company="eAlliance"
                      date="May 2024 – May 2025"
                      description=""
                      skills={['Python', 'n8n.io', 'LangChain']}
                      bullets={[
                        "Delivered accelerated AI-driven question answering, as measured by roughly 200% gains in response efficiency, by deploying Retrieval-Augmented Generation (RAG) pipelines and refined prompt optimization techniques",
                        "Enabled over 10+ end-to-end business workflow automation for 20+ corporate clients by leveraging LLM APIs integrated with retrieval systems and structured prompting frameworks",
                      ]}
                      onHoverChange={setHoveredCard}
                    />
                  </div>
                </section>
              )}

              {/* Projects */}
              {activeSection === 'projects' && (
                <section className="mb-24">
                  <SectionHeader icon={<Code className="text-amber-400" />} title="Projects" />
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

              {/* Research */}
              {activeSection === 'research' && (
                <section className="mb-24">
                  <SectionHeader icon={<Users className="text-amber-400" />} title="Research" />
                  <div className="grid gap-6">
                    <ClubCard
                      name="Computer Science Society"
                      role="President"
                      date="Sept 2023 – Present"
                      description="Organized weekly technical workshops attended by 50+ students. Led a team of 10 officers to host the annual university Hackathon with over 500 participants and $10k in sponsorship."
                      bullets={[]}
                      onHoverChange={setHoveredCard}
                    />
                    <ClubCard
                      name="Robotics Team"
                      role="Lead Programmer"
                      date="Jan 2022 – May 2023"
                      description="Designed the autonomous navigation system for the competition rover. Implemented PID controllers for precise arm movement and computer vision for object detection."
                      bullets={[]}
                      onHoverChange={setHoveredCard}
                    />
                  </div>
                </section>
              )}

              <footer className="text-center pt-12 text-[#6b6890] text-sm" style={{ borderTop: '1px solid #2a2a4a' }}>
                <p>© {new Date().getFullYear()} Sreehaas Chinnala. Built with React.</p>
              </footer>
            </div>
          )}
        </main>

        {/* ── Project Modal ────────────────────────── */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

        {/* ── Card Detail Panel (hover) ─────────────── */}
        <CardDetailPanel card={hoveredCard} />

        {/* ── Keyframe for content fade-in ─────────── */}
        <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
      </div>
    </>
  );
};

export default Portfolio;