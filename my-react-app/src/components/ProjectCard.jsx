import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => (
  <button
    onClick={onClick}
    className="text-left w-full h-full p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-slate-800/40 border-slate-700 hover:border-cyan-500/30 group flex flex-col"
  >
    <div className="flex justify-between items-start mb-4 w-full">
      <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>
      <ExternalLink size={18} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
    </div>
    <p className="text-slate-300 mb-6 text-sm leading-relaxed">{project.description}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tech.map((t) => (
        <span key={t} className="text-xs font-mono text-slate-400">
          #{t}
        </span>
      ))}
    </div>
  </button>
);

export default ProjectCard;
