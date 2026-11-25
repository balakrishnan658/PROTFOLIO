import React, { useEffect, useRef, useState } from 'react';
import { LOADER, ABOUT, HERO } from '../data/portfolioData';

interface GlitchLoaderProps {
  onComplete: () => void;
}

const STATEMENT = LOADER.statement;
const WORDS = STATEMENT.split(' ');
const ACCENT_WORDS = new Set(LOADER.accentWords || (LOADER as { redWords?: string[] }).redWords || []);
const PRELOAD_ASSETS = [
  ABOUT.portrait,
  HERO.image,
];
const TIMEOUT_MS = 6000;
const REVEAL_DELAY_MS = 400;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function trackPreload(onProgress: (ratio: number) => void) {
  const total = PRELOAD_ASSETS.length + 3;
  let loaded = 0;
  let cancelled = false;

  const tick = () => {
    if (!cancelled) {
      loaded += 1;
      onProgress(Math.min(1, loaded / total));
    }
  };

  PRELOAD_ASSETS.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = tick;
    img.src = src;
  });

  (document.fonts?.ready ?? Promise.resolve()).then(tick, tick);

  if (document.readyState === 'complete') {
    tick();
  } else {
    window.addEventListener('load', tick, { once: true });
  }

  let sceneChecks = 0;
  const checkScene = () => {
    if (cancelled) return;
    if (document.querySelector('[data-scene-ready]') || sceneChecks > 50) {
      tick();
    } else {
      sceneChecks += 1;
      window.setTimeout(checkScene, 100);
    }
  };
  checkScene();

  return () => {
    cancelled = true;
    window.removeEventListener('load', tick);
  };
}

export const GlitchLoader: React.FC<GlitchLoaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const tensStripRef = useRef<HTMLSpanElement>(null);
  const onesStripRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const cancelPreload = trackPreload((ratio) => {
      targetRef.current = ratio;
    });

    const maxTimer = window.setTimeout(() => {
      targetRef.current = 1;
    }, TIMEOUT_MS);

    const timeouts: number[] = [];
    let animId = 0;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(64, now - lastTime);
      lastTime = now;

      const targetVal = targetRef.current * 100;
      const nextVal = Math.min(
        targetVal,
        currentRef.current + Math.max(0.2, (targetVal - currentRef.current) * 0.008 * dt)
      );
      currentRef.current = nextVal;
      setPercent(Math.floor(nextVal));

      const v = currentRef.current;
      if (tensStripRef.current) {
        tensStripRef.current.style.transform = `translateY(${-(v / 10)}em)`;
      }
      if (onesStripRef.current) {
        onesStripRef.current.style.transform = `translateY(${-(9 - (v % 10))}em)`;
      }

      if (nextVal >= 99.999) {
        setPercent(100);
        timeouts.push(
          window.setTimeout(() => setPhase('reveal'), REVEAL_DELAY_MS),
          window.setTimeout(() => {
            document.body.style.overflow = '';
            onCompleteRef.current();
          }, 1400)
        );
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelPreload();
      cancelAnimationFrame(animId);
      window.clearTimeout(maxTimer);
      timeouts.forEach(window.clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  const progressFraction = percent / 100;

  return (
    <div
      className={`glitch-loader ${phase === 'reveal' ? 'is-revealing' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={STATEMENT}
    >
      <div className="glitch-loader__veil" />
      <div className="glitch-loader__count text-[#C084FC] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" aria-hidden="true">
        {percent >= 100 ? (
          <span className="glitch-loader__final">100</span>
        ) : (
          <>
            <span className="glitch-loader__digit">
              <span ref={tensStripRef} className="glitch-loader__digit-strip">
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
            <span className="glitch-loader__digit">
              <span ref={onesStripRef} className="glitch-loader__digit-strip">
                {[...DIGITS].reverse().map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          </>
        )}
      </div>

      <div className="glitch-loader__center">
        <p
          className="glitch-loader__statement"
          style={{ filter: `blur(${(1 - progressFraction) * 6}px)` }}
          aria-hidden="true"
        >
          {WORDS.map((w, idx) => {
            const wordOffset = idx / WORDS.length;
            const wordOpacity = Math.max(0, Math.min(1, (progressFraction - wordOffset * 0.7) * 3));
            return (
              <span
                key={idx}
                className={`glitch-loader__word${ACCENT_WORDS.has(w) ? ' glitch-loader__word--purple' : ''}`}
                style={{ opacity: wordOpacity }}
              >
                {w === 'BALAKRISHNAN' ? (
                  <>
                    <span className="text-[#C084FC] drop-shadow-[0_0_10px_#A855F7]">B</span>ALAKRISHNAN
                  </>
                ) : (
                  w
                )}
              </span>
            );
          })}
        </p>

        {[0, 1, 2, 3, 4].map((idx) => (
          <p key={idx} className={`glitch-loader__frag glitch-loader__frag--${idx}`} aria-hidden="true">
            {STATEMENT}
          </p>
        ))}

        {/* Purple Galaxy Progress Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-1.5 rounded-full bg-[#1B1035] overflow-hidden border border-[#C084FC]/30 shadow-[0_0_15px_rgba(123,44,255,0.4)]">
          <div
            className="h-full bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-[#C084FC] shadow-[0_0_12px_#A855F7] transition-all duration-150 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
