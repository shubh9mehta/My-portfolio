"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/experiences";
import { education } from "@/data/education";
import { iconMap } from "@/lib/iconMap";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExperienceSection() {
  const [open, setOpen] = useState<number>(experiences[0]?.id ?? 0);

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The Track Record"
          title={
            <>
              Five teams. <span className="text-gradient-emerald">Measurable results.</span>
            </>
          }
          subtitle="Operational impact across supply chain, growth, research, and analytics."
          plain="A quick tour of where I've worked and what changed because I was there. Click any card to read the full story — the problem, what I did, and the result."
          technical="Five roles, each with the challenge, my approach, quantified impact metrics, and the exact tools used per engagement."
          className="mb-10"
        />

        <div className="relative space-y-4 border-l border-white/10 pl-6 md:pl-8">
          {experiences.map((exp, i) => {
            const isOpen = open === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                {/* node */}
                <span
                  className="absolute -left-[31px] top-6 h-3 w-3 rounded-full ring-4 ring-obsidian md:-left-[39px]"
                  style={{ backgroundColor: exp.color }}
                />
                <div
                  className="glass cursor-pointer rounded-3xl p-6 transition-shadow hover:shadow-glass-hover"
                  onClick={() => setOpen(isOpen ? -1 : exp.id)}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-display text-base font-bold"
                      style={{ backgroundColor: `${exp.color}22`, color: exp.color }}
                    >
                      {exp.logo}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="font-display text-lg font-bold text-white">{exp.company}</h3>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{ backgroundColor: `${exp.color}22`, color: exp.color }}
                        >
                          {exp.role}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-white/40">
                        {exp.period} · {exp.location}
                      </p>
                      <p className="mt-2 font-display text-base font-semibold text-white/90">
                        {exp.headline}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <div className="font-display text-3xl font-bold tracking-kpi" style={{ color: exp.color }}>
                        {exp.metric}
                      </div>
                      <div className="text-[11px] text-white/40">{exp.metricLabel}</div>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-white/30 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          <div className="glass-soft rounded-2xl p-4">
                            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#ff8a8a]">
                              The Challenge
                            </div>
                            <p className="text-sm leading-relaxed text-white/65">{exp.challenge}</p>
                          </div>
                          <div className="glass-soft rounded-2xl p-4">
                            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                              My Solution
                            </div>
                            <p className="text-sm leading-relaxed text-white/65">{exp.solution}</p>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-3">
                          {exp.impact.map((item, k) => {
                            const Icon = iconMap[item.icon];
                            return (
                              <div key={k} className="glass-soft rounded-2xl p-3 text-center">
                                {Icon && (
                                  <Icon className="mx-auto mb-1.5 h-4 w-4" style={{ color: exp.color }} />
                                )}
                                <div className="font-display text-base font-bold text-white">{item.value}</div>
                                <div className="text-[11px] text-white/40">{item.label}</div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {exp.tools.map((t) => (
                            <span
                              key={t}
                              className="glass-soft rounded-lg px-2.5 py-1 text-xs font-medium text-white/55"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {education.map((ed, i) => (
            <motion.div
              key={ed.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-3xl p-5"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-white/35">
                Education
              </div>
              <h4 className="mt-1 font-display text-base font-bold text-white">{ed.school}</h4>
              <p className="text-sm text-white/55">{ed.degree}</p>
              <p className="mt-1 text-xs text-white/35">{ed.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
