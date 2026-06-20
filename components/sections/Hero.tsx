"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Sparkles, Lightbulb } from "lucide-react";
import { personalInfo } from "@/data/personalInfo";
import { impactMetrics } from "@/data/impactMetrics";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import KPICard from "@/components/ui/KPICard";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export default function Hero() {
  const { scrollTo } = useLenis();
  const ref = useRef<HTMLElement>(null);

  // Scene 1 — "The Hook": a giant ghost KPI sharpens & zooms as the page settles,
  // then parallax-drifts and blurs back out as you scroll past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const ghostBlur = useTransform(scrollYProgress, [0, 1], [0, 22]);
  const ghostScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.8], [0.12, 0]);
  const ghostFilter = useTransform(ghostBlur, (b) => `blur(${b}px)`);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
    >
      {/* Giant ghost KPI backdrop — the cinematic hook */}
      <motion.div
        style={{ scale: ghostScale, opacity: ghostOpacity, filter: ghostFilter }}
        initial={{ filter: "blur(40px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 0.12 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <span className="select-none font-display text-[34vw] font-bold leading-none tracking-kpi text-white">
          $4M
        </span>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — headline */}
          <div>
            {personalInfo.openToWork && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-soft mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white/70"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent-emerald opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
                </span>
                Open to Data &amp; Business Analyst roles · US-Based
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-bold leading-[1.04] tracking-tightest text-white md:text-7xl"
            >
              I engineer
              <br />
              <span className="text-gradient">clarity from chaos.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/55"
            >
              {personalInfo.name} — Data &amp; Business Analyst. I turn messy,
              real-world data into production pipelines, automated reporting, and
              executive dashboards that move measurable business value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollTo("#flagship", { offset: -20 })}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03]"
              >
                See how I work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
              <a
                href="/resume.pdf"
                download
                className="glass-soft inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Download className="h-4 w-4 text-accent-cyan" />
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40"
            >
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-violet" /> MS Data
                Science, Indiana University
              </span>
              <span>📍 Open to relocation</span>
              <span>🎓 F-1 OPT (STEM)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="glass-soft mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/55"
            >
              <Lightbulb className="h-3.5 w-3.5 text-accent-cyan" />
              New here? Flip the{" "}
              <span className="font-semibold text-white/80">Overview ⇄ Technical</span>{" "}
              switch (top right) to read this site your way.
            </motion.div>
          </div>

          {/* Right — live KPI bento (the 5-second value scan) */}
          <div className="grid grid-cols-2 gap-4">
            {impactMetrics.map((m, i) => (
              <KPICard
                key={m.label}
                label={m.label}
                accent={m.color}
                delay={0.15 * i}
                value={
                  <AnimatedNumber
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    duration={1600}
                  />
                }
                sublabel={m.description}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
