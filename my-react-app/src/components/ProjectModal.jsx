import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <h3 className="text-2xl font-bold text-slate-100">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">
              Project Overview
            </h4>
            <p className="text-slate-300 leading-relaxed text-lg">{project.longDescription}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-800">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
