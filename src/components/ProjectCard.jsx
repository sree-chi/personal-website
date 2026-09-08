import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => (
  <button
    onClick={onClick}
    className="text-left w-full h-full p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-[#111128]/70 border-[#2a2a4a] hover:border-amber-400/40 group flex flex-col"
    style={{ boxShadow: 'none' }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 40px rgba(251,191,36,0.08)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
  >
    <div className="flex justify-between items-start mb-4 w-full">
      <h3 className="text-lg font-bold text-[#f0ede8] group-hover:text-amber-400 transition-colors">
        {project.title}
      </h3>
      <ExternalLink size={18} className="text-[#8b8aaa] group-hover:text-amber-400 transition-colors flex-shrink-0 ml-2" />
    </div>
    <p className="text-[#a8a4c0] mb-6 text-sm leading-relaxed">{project.description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tech.map((t) => (
        <span key={t} className="text-xs font-mono text-[#8b8aaa]">
          #{t}
        </span>
      ))}
    </div>
  </button>
);

export default ProjectCard;
