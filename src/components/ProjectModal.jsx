import { X, GitBranch, ExternalLink } from 'lucide-react';

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
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          background: '#111128',
          border: '1px solid #2a2a4a',
          boxShadow: '0 32px 80px rgba(124,58,237,0.15), 0 0 0 1px #2a2a4a',
          animation: 'fadeSlideIn 0.2s ease forwards',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a4a] flex-shrink-0" style={{ background: '#0d0d22' }}>
          <h3 className="text-2xl font-bold text-[#f0ede8]">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-[#8b8aaa] hover:text-[#f0ede8] hover:bg-[#1a1a35] rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Overview */}
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-[#6b6890] font-semibold mb-3">
              Project Overview
            </h4>
            <p className="text-[#a8a4c0] leading-relaxed text-base">{project.longDescription}</p>
          </div>

          {/* Key Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm uppercase tracking-wider text-[#6b6890] font-semibold mb-3">
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#a8a4c0] leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
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

          {/* CTA buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#2a2a4a] flex-wrap">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-colors text-[#080813] text-sm"
                style={{ background: '#fbbf24' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f59e0b'}
                onMouseLeave={e => e.currentTarget.style.background = '#fbbf24'}
              >
                <GitBranch size={16} />
                View on GitHub
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all text-sm border"
                style={{ color: '#fbbf24', borderColor: '#fbbf24', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

