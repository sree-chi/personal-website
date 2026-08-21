import { ChevronDown } from 'lucide-react';

const NavHero = ({ scrolled, activeSection, langIndex, scrollToSection }) => (
  <nav
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
      scrolled
        ? 'h-20 bg-slate-900/90 backdrop-blur-md border-slate-800'
        : 'h-screen bg-transparent border-transparent pointer-events-none'
    }`}
  >
    <div className="container mx-auto h-full flex flex-col items-center justify-center relative px-6">

      {/* Animated Name Container */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] absolute flex flex-col items-center group cursor-pointer pointer-events-auto ${
          scrolled
            ? 'top-1/2 left-6 -translate-y-1/2 scale-75 origin-left items-start'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 md:scale-[2.5] origin-center'
        }`}
      >
        <h1
          className={`font-bold text-3xl md:text-4xl text-slate-100 transition-all duration-500 relative ${
            scrolled ? 'w-[350px] h-[80px] overflow-hidden' : 'w-auto h-auto'
          }`}
        >
          <div
            className={`transition-transform duration-500 ease-in-out flex ${
              scrolled ? 'flex-row' : 'flex-col items-center'
            }`}
            style={{
              transform: scrolled ? `translateX(-${langIndex * 100}%)` : 'none',
              width: scrolled ? '100%' : 'auto',
            }}
          >
            {/* Telugu (Index 0) */}
            <div
              className={`h-[80px] flex items-center pr-1 ${
                scrolled ? 'flex-shrink-0 justify-start overflow-hidden' : 'w-auto justify-center'
              }`}
              style={{ width: scrolled ? '350px' : 'auto' }}
            >
              <span className="flex whitespace-nowrap items-center">
                శ్రీ
                <span className="max-w-0 overflow-hidden py-4 -my-4 opacity-0 group-hover:max-w-[3.0em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  హాస్
                </span>
              </span>
              <span className="mx-1.5"> </span>
              <span className="flex whitespace-nowrap items-center">
                చిన్
                <span className="max-w-0 overflow-hidden py-4 -my-4 opacity-0 group-hover:max-w-[3.0em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  నాల
                </span>
              </span>
            </div>

            {/* English (Index 1) */}
            <div
              className={`h-[80px] flex items-center ${
                scrolled ? 'flex-shrink-0 justify-start overflow-hidden' : 'hidden'
              }`}
              style={{ width: scrolled ? '350px' : 'auto' }}
            >
              <span className="flex whitespace-nowrap">
                Sree
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  haas
                </span>
              </span>
              <span className="mx-1.5"> </span>
              <span className="flex whitespace-nowrap">
                Chi
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3.0em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  nnala
                </span>
              </span>
            </div>

            {/* Hindi (Index 2) */}
            <div
              className={`h-[80px] flex items-center ${
                scrolled ? 'flex-shrink-0 justify-start overflow-hidden' : 'hidden'
              }`}
              style={{ width: scrolled ? '350px' : 'auto' }}
            >
              <span className="flex whitespace-nowrap">
                श्री
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  हास
                </span>
              </span>
              <span className="mx-1.5"> </span>
              <span className="flex whitespace-nowrap">
                चिन्
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">
                  नाल
                </span>
              </span>
            </div>
          </div>
        </h1>

        {/* English subtitle — visible when NOT scrolled */}
        <h2 className={`font-mono text-xs md:text-sm text-slate-400 flex items-center transition-all duration-500 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mt-1'}`}>
          <span className="flex">
            Sree
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">haas</span>
          </span>
          <span className="mx-1"> </span>
          <span className="flex">
            Chi
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[3.0em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">nnala</span>
          </span>
        </h2>

        {/* Hindi subtitle — visible when NOT scrolled */}
        <h2 className={`font-mono text-xs md:text-sm text-slate-400 flex items-center transition-all duration-500 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mt-0.5'}`}>
          <span className="flex">
            श्री
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">हास</span>
          </span>
          <span className="mx-1"> </span>
          <span className="flex">
            चिन्
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[2.5em] group-hover:opacity-100 transition-all duration-500 ease-in-out text-cyan-400">नाल</span>
          </span>
        </h2>
      </div>

      {/* Navigation Links — visible when scrolled */}
      <div
        className={`absolute right-6 top-1/2 -translate-y-1/2 flex gap-6 transition-all duration-500 ${
          scrolled ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {['Internships', 'Projects', 'Clubs'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
              activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-slate-400'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Scroll Indicator — visible when NOT scrolled */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100 animate-bounce'
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-slate-500">Scroll to Explore</span>
        <ChevronDown className="w-6 h-6 text-cyan-400" />
      </div>
    </div>
  </nav>
);

export default NavHero;
