import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import ImpactDashboard from './ImpactDashboard';

const Hero = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-24">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            {/* Avatar */}
            <div className="flex items-center gap-6 flex-wrap">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity" />

                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-teal-500/30 bg-slate-900 flex items-center justify-center">
                  {!imgError ? (
                    <img
                      src="/profile.jpg"
                      alt="Shubh Mehta"
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-950 font-bold text-3xl bg-gradient-to-br from-teal-500 to-cyan-500">
                      SM
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Headline + badge */}
            <div className="space-y-4">
              {personalInfo.openToWork && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Open to Opportunities in {personalInfo.targetLocation}</span>
                </div>
              )}

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-100">I solve</span>
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  operational headaches
                </span>
                <br />
                <span className="text-slate-100">with data.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Data & Business Analyst turning messy ops + product data into{' '}
              <span className="text-slate-200">dashboards, automation, and decisions</span>
              — across <span className="text-slate-200">supply chain, growth, and BI reporting</span>.
            </p>

            {/* CTAs */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="group px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-slate-950 font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#simulation"
                  className="px-6 py-3 border border-slate-700 rounded-xl text-slate-300 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-300"
                >
                  Try the Demo
                </a>
              </div>

              {/* Recruiter proof pack */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
                  US-based
                </span>
                <span className="text-slate-600">•</span>
                <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
                  Open to relocation
                </span>
                <span className="text-slate-600">•</span>
                <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
                  F-1 OPT (STEM eligible)
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <ImpactDashboard />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
