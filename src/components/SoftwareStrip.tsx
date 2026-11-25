import React from 'react';
import { TECH_ICONS } from './techIcons';
import { TECH_STACK } from '../data/portfolioData';

const TOOLS = TECH_STACK.map((label) => {
  const icon = TECH_ICONS.find((i) => i.label.toLowerCase() === label.toLowerCase());
  return { label, color: icon?.color ?? '#A855F7', path: icon?.path ?? '' };
});

export const SoftwareStrip: React.FC = () => (
  <div className="relative w-full max-w-7xl mt-24 z-10 flex flex-col items-center">
    <div className="purple-halo" aria-hidden="true" />
    <span className="relative text-[#C084FC] font-bold uppercase text-sm md:text-base tracking-[0.2em] mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
      Languages &amp; Tools
    </span>
    <h3 className="relative text-4xl md:text-6xl font-black tracking-tight uppercase text-white mb-12 drop-shadow-[0_0_30px_rgba(123,44,255,0.35)]">
      MY TECH STACK.
    </h3>
    <ul className="grid-blur relative flex flex-wrap justify-center gap-5 md:gap-7 list-none p-0 m-0">
      {TOOLS.map((tool) => (
        <li
          key={tool.label}
          className="matrix-item glass glass-grid-card group w-[138px] h-[198px] md:w-[156px] md:h-[224px] xl:w-[162px] xl:h-[232px] rounded-3xl flex flex-col items-center justify-center gap-5 px-3 border-2 border-[#C084FC]/35 hover:border-[#A855F7] shadow-[0_10px_30px_rgba(9,0,20,0.85)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all"
        >
          <svg
            viewBox="0 0 24 24"
            role="img"
            aria-label={tool.label}
            className="shrink-0 w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110"
            style={{ fill: tool.color, filter: `drop-shadow(0 0 10px ${tool.color}66)` }}
          >
            {tool.path ? (
              <path d={tool.path} />
            ) : (
              <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="800" fill="#C084FC">
                {tool.label.charAt(0).toUpperCase()}
              </text>
            )}
          </svg>
          <span className="text-xs md:text-sm font-semibold text-gray-300 group-hover:text-white transition-colors text-center leading-tight whitespace-pre-line">
            {tool.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
