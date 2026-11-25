import React, { useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { SERVICES_PRICING } from '../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
        .fromTo(
          '.service-item',
          { y: 25, opacity: 0, x: -10 },
          { y: 0, opacity: 1, x: 0, duration: 0.45, stagger: 0.07, ease: 'back.out(1.4)' },
          '-=0.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-24 px-5 md:px-14 lg:px-20 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-16 z-10">
        <span className="text-[#C084FC] font-bold uppercase text-xs md:text-sm tracking-[0.2em] mb-2 flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          What I Provide
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_35px_rgba(123,44,255,0.4)]">
          SERVICES &amp; EXPERTISE.
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] mt-3 rounded-full shadow-[0_0_12px_#A855F7]" />
      </div>

      {/* Service cards: 6 comprehensive cards stacked one by one */}
      <ul ref={listRef} className="grid-blur relative list-none p-0 m-0 w-full max-w-4xl flex flex-col gap-7 md:gap-9 z-10">
        {SERVICES_PRICING.map((service, i) => {
          const featured = 'featured' in service && service.featured;
          return (
            <li key={service.id} className="service-item">
              <a
                href="#contact"
                className="glass glass-grid-card group relative flex flex-col justify-between gap-6 p-7 md:p-10 rounded-3xl outline-none border-2 border-[#C084FC]/35 hover:border-[#A855F7] shadow-[0_12px_40px_rgba(9,0,20,0.85)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] transition-all duration-300 h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="glass-chip w-10 h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-black tabular-nums text-purple-200 border border-[#C084FC]/30 group-hover:text-white group-hover:border-[#A855F7]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {featured ? (
                      <span className="glass-chip-purple text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                        Core Specialty
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8A9CC]">
                        {service.price}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xl md:text-2xl text-white group-hover:text-[#C084FC] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-[#B8A9CC] text-sm mt-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  {service.deliverables && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-2.5 py-1 rounded-lg bg-[#1B1035]/80 border border-[#C084FC]/20 text-gray-300 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A855F7] group-hover:text-[#C084FC] transition-colors">
                    Start a Project →
                  </span>
                  <span
                    aria-hidden="true"
                    className="glass-chip w-9 h-9 rounded-full flex items-center justify-center text-gray-300
                      group-hover:bg-[#7B2CFF] group-hover:text-white group-hover:shadow-[0_0_15px_#A855F7] transition-all"
                  >
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
