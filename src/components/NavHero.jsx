import { Mail } from 'lucide-react';

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
    style={{
      background: '#1a1a35',
      color: '#8b8aaa',
      border: '1px solid #2a2a4a',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = '#fbbf24';
      e.currentTarget.style.color = '#080813';
      e.currentTarget.style.borderColor = '#fbbf24';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#1a1a35';
      e.currentTarget.style.color = '#8b8aaa';
      e.currentTarget.style.borderColor = '#2a2a4a';
    }}
    aria-label={label}
  >
    {icon}
  </a>
);

/**
 * NavHero — combined hero + nav bar.
 *
 * Hero layout (home):
 *   Top bar (h-20): nav links right-aligned
 *   Remaining height: Telugu name → English name → bio → social links
 *
 * Compact layout (section active):
 *   Top bar (h-20): sliding Telugu/English name left, nav links right
 */
const NavHero = ({ isCompact, activeSection, langIndex, onNavClick, isTransitioning }) => (
  <nav
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isCompact
        ? 'h-20'
        : 'h-screen bg-transparent'
    }`}
    style={isCompact ? {
      background: 'rgba(8,8,19,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #2a2a4a',
    } : {}}
  >
    {/* ── Top bar row — always 80px tall ───────── */}
    <div className="h-20 flex items-center px-8 relative">

      {/* Compact name — slides between Telugu ↔ English */}
      {isCompact && (
        <div
          onClick={() => onNavClick('home')}
          className="cursor-pointer pointer-events-auto group"
          style={{ height: 44, overflow: 'visible', minWidth: 120 }}
        >
          {/* Slide between Telugu ↔ English using a clipping wrapper */}
          <div style={{ width: 320, height: 44, overflow: 'hidden', position: 'relative' }}>
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${langIndex * 50}%)`, width: '200%', height: '100%' }}
            >
              {/* Telugu */}
              <div className="flex-shrink-0 flex items-center text-xl font-bold text-[#f0ede8] whitespace-nowrap" style={{ width: '50%' }}>
                <span className="flex items-center">
                  శ్రీ
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 text-amber-400">
                    హాస్
                  </span>
                </span>
                <span className="mx-2"> </span>
                <span className="flex items-center">
                  చిన్
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 text-amber-400">
                    నాల
                  </span>
                </span>
              </div>
              {/* English */}
              <div className="flex-shrink-0 flex items-center text-xl font-bold text-[#f0ede8] whitespace-nowrap" style={{ width: '50%' }}>
                <span className="flex whitespace-nowrap">
                  Sree
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 text-amber-400">
                    haas
                  </span>
                </span>
                <span className="mx-2"> </span>
                <span className="flex whitespace-nowrap">
                  Chi
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 text-amber-400">
                    nnala
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav links — always top right */}
      <div className="ml-auto flex gap-8 pointer-events-auto">
        {['Internships', 'Projects', 'Research'].map((item) => {
          const id = item.toLowerCase();
          const isActive = activeSection === id;
          return (
            <button
              key={item}
              id={`nav-${id}`}
              onClick={() => onNavClick(id)}
              disabled={isTransitioning}
              className="text-sm font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                color: isActive ? '#fbbf24' : '#8b8aaa',
                textShadow: isActive ? '0 0 12px rgba(251,191,36,0.5)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#f0ede8'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#8b8aaa'; }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>

    {/* ── Hero center content — only on home ───── */}
    {!isCompact && (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] gap-6 px-6 pointer-events-none">

        {/* Name block — clickable */}
        <div
          onClick={() => onNavClick('home')}
          className="flex flex-col items-center gap-3 cursor-pointer group pointer-events-auto"
        >
          {/* 1. Telugu (large) — Science Gothic display */}
          <h1
            className="hero-display text-6xl md:text-7xl flex items-center whitespace-nowrap"
            style={{ color: '#f0ede8', margin: 0 }}
          >
            <span className="flex items-center">
              శ్రీ
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out" style={{ color: '#fbbf24' }}>
                హాస్
              </span>
            </span>
            <span className="mx-3"> </span>
            <span className="flex items-center">
              చిన్
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out" style={{ color: '#fbbf24' }}>
                నాల
              </span>
            </span>
          </h1>

          {/* 2. English (medium, below) — Science Gothic display */}
          <h2
            className="hero-display text-2xl md:text-3xl flex items-center whitespace-nowrap"
            style={{ color: '#8b8aaa', margin: 0, fontVariationSettings: "'wdth' 100, 'wght' 300" }}
          >
            <span className="flex items-center">
              Sree
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out" style={{ color: '#fbbf24' }}>
                haas
              </span>
            </span>
            <span className="mx-2"> </span>
            <span className="flex items-center">
              Chi
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 ease-in-out" style={{ color: '#fbbf24' }}>
                nnala
              </span>
            </span>
          </h2>
        </div>

        {/* 3. Bio text */}
        <p className="text-lg md:text-xl font-light leading-relaxed text-center max-w-xl mt-2" style={{ color: '#a8a4c0' }}>
          I'm a{' '}
          <span className="font-semibold" style={{ color: '#fbbf24' }}>Computer Science student</span>{' '}
          passionate about building scalable web applications and solving complex problems.
        </p>

        {/* 4. Social / contact links */}
        <div className="flex gap-4 pointer-events-auto">
          <SocialLink href="mailto:schin68.edu" icon={<Mail size={20} />} label="Email" />
        </div>

      </div>
    )}
  </nav>
);

export default NavHero;
