import { Mail } from 'lucide-react';

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300 hover:scale-110 border border-slate-700 hover:border-cyan-400"
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
        ? 'h-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800'
        : 'h-screen bg-transparent'
    }`}
  >
    {/* ── Top bar row — always 80px tall ───────── */}
    <div className="h-20 flex items-center px-8 relative">

      {/* Compact name — slides between Telugu ↔ English */}
      {isCompact && (
        <div
          onClick={() => onNavClick('home')}
          className="cursor-pointer pointer-events-auto group overflow-hidden"
          style={{ width: 240, height: 44 }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${langIndex * 50}%)`, width: '200%' }}
          >
            {/* Telugu */}
            <div className="flex-shrink-0 flex items-center text-xl font-bold text-slate-100" style={{ width: '50%' }}>
              <span className="flex whitespace-nowrap items-center">
                శ్రీ
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2em] group-hover:opacity-100 transition-all duration-500 text-cyan-400">
                  హాస్
                </span>
              </span>
              <span className="mx-2"> </span>
              <span className="flex whitespace-nowrap items-center">
                చిన్
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2em] group-hover:opacity-100 transition-all duration-500 text-cyan-400">
                  నాల
                </span>
              </span>
            </div>
            {/* English */}
            <div className="flex-shrink-0 flex items-center text-xl font-bold text-slate-100" style={{ width: '50%' }}>
              <span className="flex whitespace-nowrap">
                Sree
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 text-cyan-400">
                  haas
                </span>
              </span>
              <span className="mx-2"> </span>
              <span className="flex whitespace-nowrap">
                Chi
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 text-cyan-400">
                  nnala
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nav links — always top right */}
      <div className="ml-auto flex gap-8 pointer-events-auto">
        {['Internships', 'Projects', 'Clubs'].map((item) => {
          const id = item.toLowerCase();
          return (
            <button
              key={item}
              id={`nav-${id}`}
              onClick={() => onNavClick(id)}
              disabled={isTransitioning}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed ${
                activeSection === id
                  ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                  : 'text-slate-400'
              }`}
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
          {/* 1. Telugu (large) */}
          <h1 className="text-6xl md:text-7xl font-bold text-slate-100 flex items-center whitespace-nowrap">
            <span className="flex items-center">
              శ్రీ
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                హాస్
              </span>
            </span>
            <span className="mx-3"> </span>
            <span className="flex items-center">
              చిన్
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                నాల
              </span>
            </span>
          </h1>

          {/* 2. English (medium, below) */}
          <h2 className="text-2xl md:text-3xl font-light text-slate-400 flex items-center whitespace-nowrap">
            <span className="flex items-center">
              Sree
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                haas
              </span>
            </span>
            <span className="mx-2"> </span>
            <span className="flex items-center">
              Chi
              <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                nnala
              </span>
            </span>
          </h2>
        </div>

        {/* 3. Bio text */}
        <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 text-center max-w-xl mt-2">
          I'm a{' '}
          <span className="text-cyan-400 font-semibold">Computer Science student</span>{' '}
          passionate about building scalable web applications and solving complex problems.
        </p>

        {/* 4. Social / contact links */}
        <div className="flex gap-4 pointer-events-auto">
          <SocialLink href="mailto:sc8583@nyu.edu" icon={<Mail size={20} />} label="Email" />
        </div>

      </div>
    )}
  </nav>
);

export default NavHero;
