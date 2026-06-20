"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import RawExcelGrid from "./flagship/RawExcelGrid";
import SqlWindow from "./flagship/SqlWindow";
import ReconDashboard from "./flagship/ReconDashboard";
import { RECON_SQL } from "./flagship/reconData";
import SectionIntro from "@/components/ui/SectionIntro";

const STEPS = [
  { n: "01", label: "The Intake", note: "Raw warehouse scans" },
  { n: "02", label: "The Engine", note: "SQL reconciliation" },
  { n: "03", label: "The Insight", note: "Live dashboard" },
  { n: "04", label: "The Impact", note: "Business value" },
];

export default function FlagshipCaseStudy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Per-scene cross-fades
  const s1 = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.26], [0, 1, 1, 0]);
  const s2 = useTransform(scrollYProgress, [0.22, 0.28, 0.46, 0.52], [0, 1, 1, 0]);
  const s3 = useTransform(scrollYProgress, [0.5, 0.57, 0.74, 0.8], [0, 1, 1, 0]);
  const s4 = useTransform(scrollYProgress, [0.78, 0.86, 1, 1], [0, 1, 1, 1]);

  // Subtle cinematic motion per scene
  const s1y = useTransform(scrollYProgress, [0, 0.26], [0, -40]);
  const s3scale = useTransform(scrollYProgress, [0.5, 0.65], [0.92, 1]);
  const impactScale = useTransform(scrollYProgress, [0.78, 0.95], [0.7, 1]);
  const impactBlur = useTransform(scrollYProgress, [0.78, 0.9], [16, 0]);
  const impactFilter = useTransform(impactBlur, (b) => `blur(${b}px)`);

  // Table flips clean once SQL has mostly typed
  const [clean, setClean] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [sqlChars, setSqlChars] = useState(0);

  const sqlProgress = useTransform(scrollYProgress, [0.26, 0.45], [0, 1]);
  useMotionValueEvent(sqlProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setSqlChars(Math.floor(clamped * RECON_SQL.length));
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setClean(v > 0.42);
    setActiveStep(v < 0.22 ? 0 : v < 0.5 ? 1 : v < 0.78 ? 2 : 3);
  });

  return (
    <section ref={ref} id="flagship" className="relative h-[440vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 lg:grid-cols-[260px_1fr] lg:px-8">
          {/* Left rail — step tracker */}
          <div className="hidden flex-col justify-center lg:flex">
            <span className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
              Flagship Case Study
            </span>
            <h2 className="mb-5 font-display text-2xl font-bold leading-tight text-white">
              Supply chain reconciliation
              <span className="block text-base font-medium text-white/40">
                Macrotech · 400+ SKUs
              </span>
            </h2>
            <SectionIntro
              plain="Just keep scrolling — I'll walk you through one real project from messy spreadsheet to finished result, one step at a time."
              technical="A scroll-driven walkthrough: raw warehouse scan → a SQL cleaning CTE (regex + SAFE_CAST) → reconciled aggregation → quantified impact."
              className="mb-8"
            />
            <div className="flex flex-col gap-3">
              {STEPS.map((step, i) => {
                const active = activeStep === i;
                return (
                  <div
                    key={step.n}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 ${
                      active
                        ? "border-white/15 bg-white/[0.06]"
                        : "border-transparent opacity-45"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm ${
                        active ? "text-accent-cyan" : "text-white/40"
                      }`}
                    >
                      {step.n}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {step.label}
                      </div>
                      <div className="text-xs text-white/40">{step.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stage — all scenes stacked & cross-faded */}
          <div className="relative flex h-[70vh] items-center justify-center">
            {/* Scene 1 — raw intake */}
            <motion.div
              style={{ opacity: s1, y: s1y }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            >
              <p className="max-w-md text-center text-sm text-white/50">
                Every month started the same way: hundreds of warehouse scans in
                inconsistent formats. Manual audits kept failing.
              </p>
              <RawExcelGrid clean={false} />
            </motion.div>

            {/* Scene 2 — SQL types itself */}
            <motion.div
              style={{ opacity: s2 }}
              className="absolute inset-0 grid items-center gap-5 md:grid-cols-2"
            >
              <SqlWindow charCount={sqlChars} />
              <div className="hidden md:block">
                <RawExcelGrid clean={clean} />
              </div>
            </motion.div>

            {/* Scene 3 — dashboard unfurls */}
            <motion.div
              style={{ opacity: s3, scale: s3scale }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ReconDashboard />
            </motion.div>

            {/* Scene 4 — the impact */}
            <motion.div
              style={{ opacity: s4 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <motion.div style={{ scale: impactScale, filter: impactFilter }}>
                <div className="font-display text-7xl font-bold leading-none tracking-kpi text-gradient-emerald md:text-9xl">
                  Minutes
                </div>
              </motion.div>
              <p className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                not a two-hour manual grind
              </p>
              <p className="mt-4 max-w-lg text-white/55">
                A weekly reconciliation that used to eat two hours of manual Excel
                is now a scripted run that finishes in minutes — across 400+ SKUs
                and 900+ hospitality properties.
              </p>
              <button
                onClick={() => scrollTo("#projects", { offset: -20 })}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03]"
              >
                See more projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
