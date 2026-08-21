import { useState } from 'react';
import { Briefcase, Code, Users } from 'lucide-react';

import { useScrollSpy } from './hooks/useScrollSpy';
import projects from './data/projects';

import NavHero from './components/NavHero';
import SectionHeader from './components/SectionHeader';
import SectionDivider from './components/SectionDivider';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ClubCard from './components/ClubCard';

const Portfolio = () => {
  const { scrolled, activeSection, langIndex, scrollToSection } = useScrollSpy();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-900">

      <NavHero
        scrolled={scrolled}
        activeSection={activeSection}
        langIndex={langIndex}
        scrollToSection={scrollToSection}
      />

      <main className="pt-[100vh] relative z-10">
        <div className="container mx-auto px-6 pb-24 max-w-5xl">

          {/* About / Intro Text */}
          <div className="py-24 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-slate-300">
              I'm a <span className="text-cyan-400 font-semibold">Computer Science student</span> passionate
              about building scalable web applications and solving complex data problems. Currently exploring
              distributed systems.
            </h2>
          </div>

          <SectionDivider />

          {/* Internships */}
          <section id="internships" className="scroll-mt-28 mb-24">
            <SectionHeader icon={<Briefcase className="text-cyan-400" />} title="Internships" />
            <div className="grid gap-8">
              <ExperienceCard
                role="Software Engineering Intern"
                company="CarMax"
                date="June 2026 - August 2026"
                description=""
                skills={['Azure', 'React']}
              />
              <ExperienceCard
                role="Computer Vision Research Intern"
                company="NYU Stern Department of Economics"
                date="December 2025 - February 2026"
                description=""
                skills={['Python', 'OpenCV', 'PaddleOCR', 'TesseractOCR']}
              />
              <ExperienceCard
                role="Software Development Intern"
                company="APS Data Technologies"
                date="May 2025 - December 2025"
                description=""
                skills={['Python', 'React']}
              />
              <ExperienceCard
                role="AI Engineering Intern"
                company="eAlliance"
                date="May 2024 - May 2025"
                description=""
                skills={['Python', 'n8n.io', 'LangChain']}
              />
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="scroll-mt-28 mb-24">
            <SectionHeader icon={<Code className="text-cyan-400" />} title="Projects" />
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </section>

          {/* Clubs */}
          <section id="clubs" className="scroll-mt-28 mb-32">
            <SectionHeader icon={<Users className="text-cyan-400" />} title="Clubs & Leadership" />
            <div className="grid gap-6">
              <ClubCard
                name="Computer Science Society"
                role="President"
                date="Sept 2023 - Present"
                description="Organized weekly technical workshops attended by 50+ students. Lead a team of 10 officers to host the annual university Hackathon with over 500 participants and $10k in sponsorship."
              />
              <ClubCard
                name="Robotics Team"
                role="Lead Programmer"
                date="Jan 2022 - May 2023"
                description="Designed the autonomous navigation system for the competition rover. Implemented PID controllers for precise arm movement and computer vision for object detection."
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-12 border-t border-slate-800 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Sreehaas Chinnala. Built with React & Tailwind.</p>
          </footer>

        </div>
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Portfolio;