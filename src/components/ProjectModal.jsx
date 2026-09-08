import { X } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm transition-opacity"
        style={{ background: 'rgba(8,8,19,0.85)' }}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: '#111128',
          border: '1px solid #2a2a4a',
          boxShadow: '0 32px 80px rgba(124,58,237,0.15), 0 0 0 1px #2a2a4a',
          animation: 'fadeSlideIn 0.2s ease forwards',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a4a]" style={{ background: '#0d0d22' }}>
          <h3 className="text-2xl font-bold text-[#f0ede8]">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#8b8aaa] hover:text-[#f0ede8] hover:bg-[#1a1a35] rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-[#6b6890] font-semibold mb-3">
              Project Overview
            </h4>
            <p className="text-[#a8a4c0] leading-relaxed text-lg">{project.longDescription}</p>
          </div>

          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-[#6b6890] font-semibold mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-amber-400/10 text-amber-300 text-sm font-medium rounded-full border border-amber-400/25">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-[#2a2a4a]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors text-[#080813]"
              style={{ background: '#fbbf24' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.background = '#fbbf24'}
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
