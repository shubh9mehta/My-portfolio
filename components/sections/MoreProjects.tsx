"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { moreProjects } from "@/data/moreProjects";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MoreProjects() {
  return (
    <section id="more" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="More Builds"
          title={
            <>
              Beyond the headliners. <span className="text-gradient">A wider range.</span>
            </>
          }
          subtitle="MLOps, deep learning, computer vision, NLP and geospatial analytics — the rest of the portfolio, at a glance."
          plain="A quick gallery of other things I've built, from crypto forecasting to a live emotion detector. Tap any card to see the code."
          technical="Production ML pipelines (Docker + CI/CD), LSTM time-series, CNN computer vision, NLP/topic modeling, and large-scale geospatial dashboards."
          className="mb-12"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group glass relative flex flex-col overflow-hidden rounded-[28px] p-6"
            >
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
                style={{ background: p.accentColor }}
              />
              <div className="relative flex h-full flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: p.accentColor }}
                  >
                    {p.type}
                  </span>
                  <Github className="h-4 w-4 text-white/30 transition-colors group-hover:text-white" />
                </div>

                <h3 className="font-display text-lg font-bold leading-snug text-white">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
                  {p.blurb}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="glass-soft rounded-md px-2 py-0.5 text-[11px] font-medium text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-xs font-semibold text-white/80">{p.metric}</span>
                  <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
