import React, { useState, useEffect } from 'react';
import { SITE } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Projects', 'Services', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 md:px-6 pt-3">
      <div
        className={`glass max-w-7xl mx-auto rounded-2xl px-5 md:px-8 flex items-center justify-between transition-all duration-300 border border-[#C084FC]/25 ${
          scrolled ? 'py-2.5 !bg-[#120B20]/90 shadow-[0_10px_35px_rgba(9,0,20,0.8)]' : 'py-3.5 bg-[#120B20]/70'
        }`}
      >
        {/* Brand */}
        <a
          href="#hero"
          className="text-white text-xl sm:text-2xl font-black tracking-tight uppercase group flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7] animate-pulse" />
          <span className="text-white font-extrabold group-hover:text-[#C084FC] transition-colors duration-300">
            <span className="text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]">B</span>ALAKRISHNAN S
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-xs md:text-sm font-bold text-[#B8A9CC] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white group py-1"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A855F7] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_10px_#A855F7]" />
            </a>
          ))}
        </div>

        {/* Right Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <a
              href="#contact"
              className="glass-purple inline-block px-5 py-2 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_18px_rgba(123,44,255,0.45)] hover:shadow-[0_0_24px_rgba(168,85,247,0.7)] transition-all duration-300"
            >
              GET IN TOUCH
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-purple-200 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl glass p-5 flex flex-col gap-4 border border-[#C084FC]/30 bg-[#120B20]/95 shadow-[0_15px_40px_rgba(9,0,20,0.9)] animate-fadeIn">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-widest text-[#B8A9CC] hover:text-white hover:text-[#C084FC] py-2 border-b border-white/5 transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="glass-purple text-center py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider mt-2 shadow-[0_0_18px_rgba(123,44,255,0.5)]"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </nav>
  );
};
