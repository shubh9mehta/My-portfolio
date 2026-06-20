"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import StakeholderToggle from "@/components/ui/StakeholderToggle";
import ProjectDashboardModal from "./projects/ProjectDashboardModal";

export default function ProjectsShowcase() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected Work"
            title={
              <>
                From raw data to <span className="text-gradient">live decisions.</span>
              </>
            }
            subtitle="Each project opens into a live, interactive dashboard — no screenshots, no iframes."
            plain="These are real projects I've worked on. Click any card to open a dashboard you can actually click around in. Each one ends with the plain takeaway."
            technical="Native React dashboards (Recharts) over seeded sample datasets; filters, sorts and chart toggles all recompute client-side inside a modal."
          />
          <StakeholderToggle />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const hasLink = p.link && p.link !== "#";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard
                  interactive
                  onClick={() => setActive(p)}
                  className="group relative flex h-full flex-col overflow-hidden"
                >
                  {/* accent wash */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: p.accentColor }}
                  />
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.15em]"
                        style={{ color: p.accentColor }}
                      >
                        {p.category}
                      </span>
                      <span className="glass-soft rounded-full px-3 py-1 text-xs font-semibold text-white/70">
                        {p.metric}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold leading-snug text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="glass-soft rounded-lg px-2.5 py-1 text-xs font-medium text-white/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <BarChart3 className="h-4 w-4" style={{ color: p.accentColor }} />
                        Open dashboard
                        <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      {hasLink ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white/40 transition-colors hover:text-white"
                          aria-label="View code on GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      ) : (
                        <span className="text-xs italic text-white/30">Internal</span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectDashboardModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
