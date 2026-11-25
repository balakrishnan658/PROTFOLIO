import React from 'react';
import { SITE, SOCIALS } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="glass-bar w-full text-white py-14 px-6 md:px-16 border-t border-[#C084FC]/20 bg-[#090014]/90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="#hero" className="text-2xl font-black tracking-tight uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7]" />
            <span className="text-white hover:text-[#C084FC] transition-colors">
              <span className="text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]">B</span>ALAKRISHNAN S
            </span>
          </a>
          <p className="text-[11px] text-[#B8A9CC] font-mono tracking-widest uppercase">
            {SITE.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-chip px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-purple-200 hover:text-white border border-[#C084FC]/25 hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
            >
              {social.label}
            </a>
          ))}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="glass-chip w-9 h-9 rounded-full flex items-center justify-center text-purple-200 hover:text-white border border-[#C084FC]/25 hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all hover:scale-105"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#B8A9CC] uppercase tracking-widest font-bold">
            <a href="#about" className="hover:text-[#C084FC] transition-colors">About</a>
            <a href="#skills" className="hover:text-[#C084FC] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#C084FC] transition-colors">Projects</a>
            <a href="#services" className="hover:text-[#C084FC] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#C084FC] transition-colors">Contact</a>
          </div>
          <div className="text-[11px] text-[#B8A9CC]/70 font-mono uppercase tracking-wider">
            &copy; 2026 <span className="text-[#A855F7] font-semibold">B</span>ALAKRISHNAN S. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
