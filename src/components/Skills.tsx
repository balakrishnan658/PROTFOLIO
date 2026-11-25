import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SoftwareStrip } from './SoftwareStrip';
import { SKILL_CARDS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(
          '.matrix-item',
          { y: 25, opacity: 0, x: -10 },
          { y: 0, opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.4)' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillsData = SKILL_CARDS;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#C084FC] font-bold uppercase text-sm md:text-base tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          What I Work With
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_35px_rgba(123,44,255,0.4)]">
          TECHNICAL SKILLS.
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] mt-3 rounded-full shadow-[0_0_12px_#A855F7]" />
      </div>

      {/* Skills Matrix Cards - One by One (Single Column Stack) */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="purple-halo" aria-hidden="true" />
        <div className="grid-blur relative flex flex-col gap-7 md:gap-9">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="matrix-item glass glass-grid-card group p-7 md:p-10 rounded-3xl flex flex-col justify-between gap-6 border-2 border-[#C084FC]/35 hover:border-[#A855F7] shadow-[0_12px_40px_rgba(9,0,20,0.85)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-bold text-xl md:text-2xl text-gray-100 group-hover:text-[#C084FC] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs md:text-sm font-semibold text-[#B8A9CC] uppercase tracking-wider block mt-1">
                    {skill.category}
                  </span>
                </div>
                <span className="glass-chip text-xs md:text-sm font-black uppercase tracking-wider px-4 py-1.5 text-purple-200 shrink-0 group-hover:text-white rounded-full border-2 border-[#C084FC]/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  {skill.level}
                </span>
              </div>

              {/* Skill items badges */}
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
                {skill.skills?.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-xl bg-[#1B1035]/90 border border-[#C084FC]/30 text-gray-200 font-semibold group-hover:border-[#A855F7] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Software & tools capsules */}
      <SoftwareStrip />
    </section>
  );
};
