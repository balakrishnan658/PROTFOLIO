import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VenomButton } from './VenomButton';
import { SITE, WHATSAPP_URL, SOCIALS, GOOGLE_APPS_SCRIPT_WEB_APP_URL } from '../data/portfolioData';
import { Mail, Phone, Github, Linkedin, MapPin, Sparkles, Loader2, CheckCircle2, AlertCircle, RefreshCw, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const params = new URLSearchParams();
      params.append('name', formData.name.trim());
      params.append('email', formData.email.trim());
      params.append('phone', formData.phone.trim());
      params.append('mobile', formData.phone.trim());
      params.append('message', formData.message.trim());
      params.append('description', formData.message.trim());

      // mode: 'no-cors' allows browser to submit to Google Apps Script
      // without CORS preflight rejection or cross-origin redirect errors
      await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Submission successfully dispatched to Google Apps Script backend
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        'Submission encountered a network issue. Please check your connection or send a direct email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full text-gray-100 py-28 px-5 md:px-16 lg:px-24 flex flex-col items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Section Title */}
      <div ref={titleRef} className="flex flex-col items-center text-center mb-14 z-10">
        <span className="text-[#C084FC] font-bold uppercase text-xs md:text-sm tracking-[0.2em] mb-2 flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          Get In Touch
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white drop-shadow-[0_0_35px_rgba(123,44,255,0.4)]">
          LET'S CONNECT.
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#7B2CFF] to-[#A855F7] mt-3 rounded-full shadow-[0_0_12px_#A855F7]" />
      </div>

      {/* Quick Contact & Social Cards */}
      <div className="relative w-full max-w-4xl z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 relative z-10">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${SITE.name} on WhatsApp`}
            className="whatsapp-card glass glass-hover flex items-center gap-4 rounded-3xl px-6 py-5 border-2 border-[#C084FC]/30 hover:border-[#A855F7] shadow-[0_10px_30px_rgba(9,0,20,0.7)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
          >
            <span className="whatsapp-icon grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8A9CC]">WhatsApp</span>
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">+91 9360264849</span>
            </span>
          </a>

          <a
            href={`tel:+${SITE.phone}`}
            className="glass glass-hover flex items-center gap-4 rounded-3xl px-6 py-5 border-2 border-[#C084FC]/30 hover:border-[#A855F7] shadow-[0_10px_30px_rgba(9,0,20,0.7)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
          >
            <span className="glass-chip grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[#A855F7] border border-[#C084FC]/30">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8A9CC]">Call</span>
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">+91 9360264849</span>
            </span>
          </a>

          <a
            href={SOCIALS.find((s) => s.id === 'github')?.href || 'https://github.com/balakrishnan658'}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover flex items-center gap-4 rounded-3xl px-6 py-5 border-2 border-[#C084FC]/30 hover:border-[#A855F7] shadow-[0_10px_30px_rgba(9,0,20,0.7)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
          >
            <span className="glass-chip grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[#A855F7] border border-[#C084FC]/30">
              <Github className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8A9CC]">GitHub</span>
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">balakrishnan658</span>
            </span>
          </a>

          <a
            href={SOCIALS.find((s) => s.id === 'linkedin')?.href || 'https://www.linkedin.com/in/balakrish658/'}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover flex items-center gap-4 rounded-3xl px-6 py-5 border-2 border-[#C084FC]/30 hover:border-[#A855F7] shadow-[0_10px_30px_rgba(9,0,20,0.7)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all"
          >
            <span className="glass-chip grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-[#A855F7] border border-[#C084FC]/30">
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8A9CC]">LinkedIn</span>
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">balakrishnan658</span>
            </span>
          </a>
        </div>

        <div className="purple-halo" style={{ inset: '-14% -10%' }} aria-hidden="true" />
        <div
          ref={cardRef}
          className="glass glass-panel-card w-full p-8 md:p-14 rounded-3xl relative z-10 border-2 border-[#C084FC]/35 shadow-[0_25px_70px_rgba(9,0,20,0.9)]"
        >
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#7B2CFF]/20 border-2 border-[#A855F7] flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(168,85,247,0.7)] animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-[#C084FC]" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-3 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                MESSAGE RECORDED &amp; TRANSMITTED!
              </h3>
              <p className="text-base md:text-lg text-[#B8A9CC] font-medium max-w-lg mb-6 leading-relaxed">
                Thank you for reaching out! Your submission has been saved directly to{' '}
                <span className="text-white font-bold">Google Sheets</span> and an instant notification has been dispatched to{' '}
                <span className="text-[#C084FC] font-bold">balasathish658@gmail.com</span>. Balakrishnan will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage(null);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1035] border-2 border-[#C084FC]/40 text-[#C084FC] hover:text-white hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] font-extrabold uppercase text-xs md:text-sm tracking-wider transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              {/* Error Alert (if submission failed) */}
              {errorMessage && (
                <div className="p-5 rounded-2xl bg-[#2A0B20]/90 border-2 border-red-500/40 text-red-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm font-medium">
                      <strong className="text-white block font-bold mb-0.5">Transmission Notice:</strong>
                      {errorMessage}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setErrorMessage(null)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white transition-all"
                    >
                      Dismiss
                    </button>
                    <a
                      href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Portfolio Contact from ${formData.name || 'Visitor'}`)}&body=${encodeURIComponent(formData.message || '')}`}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#7B2CFF] hover:bg-[#A855F7] text-white shadow-[0_0_12px_#7B2CFF] transition-all"
                    >
                      Email Direct
                    </a>
                  </div>
                </div>
              )}

              {/* Direct Email & Location Header Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#1B1035]/60 border border-[#C084FC]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-chip flex items-center justify-center text-[#A855F7] border border-[#C084FC]/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#B8A9CC] block">Email &amp; Location</span>
                    <a href={`mailto:${SITE.email}`} className="text-sm md:text-base font-bold text-white hover:text-[#C084FC] transition-colors">
                      {SITE.email}
                    </a>
                    <span className="text-xs text-[#B8A9CC] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A855F7] inline" /> Kallakurichi, Tamil Nadu, India
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] animate-pulse shadow-[0_0_8px_#A855F7]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-200">Open To AI &amp; Tech Opportunities</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B8A9CC]">
                    Name
                  </label>
                  <input
                    required
                    disabled={loading}
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Balakrishnan"
                    className={`w-full px-5 py-4 glass-input rounded-2xl text-base font-medium text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B8A9CC]">
                    Email
                  </label>
                  <input
                    required
                    disabled={loading}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className={`w-full px-5 py-4 glass-input rounded-2xl text-base font-medium text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div className="flex flex-col gap-2.5 sm:col-span-2 lg:col-span-1">
                  <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B8A9CC]">
                    Mobile No
                  </label>
                  <input
                    disabled={loading}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 9360264849"
                    className={`w-full px-5 py-4 glass-input rounded-2xl text-base font-medium text-white placeholder:text-gray-500 focus:outline-none transition-all ${
                      loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#B8A9CC]">
                  Message
                </label>
                <textarea
                  required
                  disabled={loading}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me about your project, idea, or collaboration..."
                  className={`w-full px-5 py-4 glass-input rounded-2xl text-base font-medium text-white placeholder:text-gray-500 focus:outline-none transition-all resize-none ${
                    loading ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <VenomButton
                type="submit"
                variant="primary"
                disabled={loading}
                className="self-center mt-3"
              >
                {loading ? 'SUBMITTING...' : 'SUBMIT'}
              </VenomButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
