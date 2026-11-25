import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SITE, ABOUT } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const Fb = 26;
const Ib = 70;
const Lb = 0.38;
const Rb = 9e-4;

const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

export const HangingPhoto: React.FC = () => {
  const rigRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rig = rigRef.current;
    const swing = swingRef.current;
    if (!rig || !swing) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    let angle = 0;
    let angularVel = 0;
    let roll = 0;
    let targetAngle = 0;
    let isDragging = false;
    let activePointerId = -1;
    let prevPointerX = 0;
    let lastTime = performance.now();
    let isIntersecting = true;
    let animId = 0;

    const getPivot = () => {
      const rect = rig.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + 8 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.008);
      const vx = (e.clientX - prevPointerX) / dt;
      prevPointerX = e.clientX;
      lastTime = now;

      if (isDragging && e.pointerId === activePointerId) {
        const pivot = getPivot();
        targetAngle = clamp(Math.atan2(-(e.clientX - pivot.x), Math.max(e.clientY - pivot.y, 60)), Lb);
        return;
      }

      if (prefersReducedMotion || isCoarse || !isIntersecting) return;
      const rect = rig.getBoundingClientRect();
      const dist =
        Math.abs(e.clientX - (rect.left + rect.width / 2)) +
        Math.max(0, Math.abs(e.clientY - (rect.top + rect.height / 2)) - rect.height / 2);
      const influence = Math.max(0, 1 - dist / 900);
      angularVel += clamp(-vx * Rb * influence, 0.25);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      activePointerId = e.pointerId;
      swing.setPointerCapture?.(e.pointerId);
      swing.style.cursor = 'grabbing';
      prevPointerX = e.clientX;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId === activePointerId) {
        isDragging = false;
        activePointerId = -1;
        targetAngle = 0;
        swing.style.cursor = '';
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { rootMargin: '200px' }
    );
    observer.observe(rig);

    let prevFrameTime = performance.now();
    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      const dt = Math.min((now - prevFrameTime) / 1000, 0.05);
      prevFrameTime = now;
      if (!isIntersecting && !isDragging) return;

      const stiffness = isDragging ? Ib : Fb;
      const target = isDragging ? targetAngle : 0;
      angularVel += -stiffness * (angle - target) * dt;
      angularVel *= Math.exp(-3.2 * dt);
      angle += angularVel * dt;
      if (Math.abs(angle) > Lb) {
        angle = Math.sign(angle) * Lb;
        angularVel *= -0.3;
      }
      roll += (angularVel * 0.6 - roll) * (1 - Math.exp(-6 * dt));
      const deg = (angle * 180) / Math.PI;
      swing.style.transform = `rotateZ(${deg}deg) rotateY(${clamp(roll, 0.4) * 30}deg)`;
      if (shadowRef.current) {
        shadowRef.current.style.transform = `translateX(${-deg * 2.2}px) rotateZ(${deg * 0.8}deg)`;
      }
    };

    animId = requestAnimationFrame(tick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    swing.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      swing.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div ref={rigRef} className="hang-rig" data-no-ripple={true}>
      <span className="hang-nail" aria-hidden="true" />
      <div ref={shadowRef} className="hang-shadow" aria-hidden="true" />
      <div ref={swingRef} className="hang-swing">
        <svg className="hang-strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="50" y1="0" x2="12" y2="100" />
          <line x1="50" y1="0" x2="88" y2="100" />
        </svg>
        <div className="hang-frame glow-frame relative border-2 border-[#C084FC]/35 rounded-2xl shadow-[0_0_35px_rgba(123,44,255,0.4)]">
          {/* Floating Badges */}
          <div className="absolute -top-3.5 -right-3.5 z-20 px-3.5 py-1.5 rounded-full bg-[#1B1035] border-2 border-[#C084FC]/40 text-[#C084FC] text-[11px] font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(168,85,247,0.5)]">
            AI & DS 2027
          </div>
          <div className="absolute -bottom-3.5 -left-3.5 z-20 px-3.5 py-1.5 rounded-full bg-[#1B1035] border-2 border-[#7B2CFF]/40 text-purple-200 text-[11px] font-extrabold uppercase tracking-wider shadow-[0_0_16px_rgba(123,44,255,0.45)]">
            Full Stack
          </div>

          <span className="hang-ring hang-ring-l" aria-hidden="true" />
          <span className="hang-ring hang-ring-r" aria-hidden="true" />
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/40 ring-2 ring-[#C084FC]/40 shadow-[0_0_35px_rgba(123,44,255,0.45)]">
            <img
              src={ABOUT.portrait}
              alt={ABOUT.portraitAlt}
              draggable={false}
              className="w-full h-full object-cover object-top transition-all duration-700 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090014]/90 via-transparent to-transparent pointer-events-none" />
            <div className="hang-glare" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-white text-base md:text-xl font-black uppercase tracking-wider block drop-shadow-md">
                <span className="text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]">B</span>ALAKRISHNAN S
              </span>
              <span className="text-[#C084FC] text-xs md:text-sm uppercase font-bold tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                {ABOUT.portraitCaption}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const STACK = ABOUT.technologies;
const FOCUS = ABOUT.focus;

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const photoCardRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

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
        .fromTo(headRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
        .fromTo(bioRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo(
          photoCardRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.6'
        )
        .fromTo(
          stackRef.current?.children || [],
          { scale: 0.7, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'back.out(1.5)' },
          '-=0.6'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-24 px-5 md:px-12 lg:px-20 overflow-hidden border-t border-white/5"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-14 relative z-10 w-full flex flex-col items-center text-center">
        <span className="text-[#C084FC] font-bold uppercase text-xs md:text-sm tracking-[0.2em] mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          {ABOUT.eyebrow}
        </span>
        <h2
          ref={headRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_35px_rgba(123,44,255,0.4)]"
        >
          ABOUT ME.
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] rounded-full mt-3 shadow-[0_0_12px_#A855F7]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* Left column / Narrative */}
        <div className="flex flex-col h-full w-full">
          <div className="relative h-full flex flex-col">
            <div className="purple-halo" aria-hidden="true" />
            <div className="glass glass-panel-card relative rounded-3xl p-6 sm:p-8 md:p-11 flex flex-col justify-between h-full gap-7 md:gap-8 border-2 border-[#C084FC]/35 shadow-[0_20px_60px_rgba(9,0,20,0.85)]">
              <div ref={bioRef} className="flex flex-col gap-5 md:gap-6">
                {ABOUT.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-gray-100 text-base md:text-xl leading-relaxed font-medium'
                        : 'text-[#B8A9CC] text-sm md:text-base leading-relaxed'
                    }
                  >
                    {i === 0 && text.includes('Balakrishnan S') ? (
                      <>
                        I am{' '}
                        <span className="text-white font-bold">
                          <span className="text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">B</span>alakrishnan S
                        </span>
                        , currently pursuing{' '}
                        <span className="text-white font-semibold">B.Tech in Artificial Intelligence and Data Science</span> at{' '}
                        <span className="text-[#C084FC] font-semibold">Excel Engineering College (Autonomous)</span>
                        , graduating in the class of 2027. My academic and technical foundation is rooted in engineering rigor, algorithmic problem solving, mathematical modeling, and modern data structures.
                      </>
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>

              {/* Quick Info Cards */}
              <div>
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#C084FC] mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                  Quick Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {ABOUT.infoCards.map((info) => (
                    <div
                      key={info.label}
                      className="px-5 py-4 rounded-2xl bg-[#1B1035]/80 border-2 border-[#C084FC]/30 flex flex-col gap-1 hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8A9CC]">
                        {info.label}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {info.label === 'Name' ? (
                          <>
                            <span className="text-[#A855F7] font-bold">B</span>ALAKRISHNAN S
                          </>
                        ) : (
                          info.value
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#C084FC] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                  Technologies & Skills
                </h3>
                <div ref={stackRef} className="flex flex-wrap gap-2 md:gap-2.5">
                  {STACK.map((tool) => (
                    <span
                      key={tool}
                      className="tech-pill glass-chip px-3.5 py-1.5 text-xs md:text-sm font-bold text-gray-200 rounded-full cursor-default hover:text-white hover:border-[#A855F7]/60 hover:shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-all"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas of Focus */}
              <div>
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#C084FC] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                  Key Areas of Focus
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {FOCUS.map((f) => (
                    <span
                      key={f}
                      className="px-3.5 py-1.5 text-xs md:text-sm font-semibold text-[#C084FC] rounded-full ring-1 ring-[#A855F7]/30 bg-[#7B2CFF]/15 shadow-[0_0_12px_rgba(123,44,255,0.2)]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: suspended profile card with physics swing */}
        <div className="flex flex-col items-center justify-center h-full w-full relative">
          <div ref={photoCardRef} data-photo-reveal={true} className="w-full flex justify-center items-center h-full pointer-events-auto">
            <HangingPhoto />
          </div>
        </div>
      </div>
    </section>
  );
};
