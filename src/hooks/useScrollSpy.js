import { useState, useEffect, useRef } from 'react';

/**
 * Tracks scroll position, active nav section, and language index.
 * Returns: { scrolled, activeSection, langIndex, scrollToSection, containerRef }
 */
export function useScrollSpy() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [langIndex, setLangIndex] = useState(0); // 0: Telugu, 1: English, 2: Hindi
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Scroll detection with requestAnimationFrame throttle
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const isScrolled = currentScroll > 50;

      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

      const sections = ['internships', 'projects', 'clubs'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language cycling — only when scrolled, resets to Telugu at top
  useEffect(() => {
    let interval;
    if (scrolled) {
      interval = setInterval(() => {
        setLangIndex((prev) => (prev + 1) % 3);
      }, 2000);
    } else {
      setLangIndex(0);
    }
    return () => clearInterval(interval);
  }, [scrolled]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return { scrolled, activeSection, langIndex, scrollToSection, containerRef };
}
