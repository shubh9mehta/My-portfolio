"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { skillRadar } from "@/data/skillRadar";
import { toolbox } from "@/data/toolbox";
import { iconMap } from "@/lib/iconMap";
import { getToolLogo } from "@/lib/toolLogos";
import SectionHeading from "@/components/ui/SectionHeading";
import { darkTooltipStyle } from "./projects/dashboardChrome";

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The Toolkit"
          title={
            <>
              Engineered breadth, <span className="text-gradient">analytical depth.</span>
            </>
          }
          subtitle="A balanced profile across the full analytics stack — from raw pipelines to the boardroom."
          plain="The tools I work with, grouped by what they're for. The shape on the left shows where I'm strongest across the main areas of data work."
          technical="Competency radar across data engineering, statistical modeling, BI, data wrangling and communication, plus a categorized tool inventory with proficiency."
          className="mb-10"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-[32px] p-6"
          >
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillRadar}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#22D3EE"
                    fill="url(#radarFill)"
                    fillOpacity={0.55}
                    strokeWidth={2}
                  />
                  <Tooltip contentStyle={darkTooltipStyle} />
                  <defs>
                    <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Toolbox categories */}
          <div className="grid gap-4 sm:grid-cols-2">
            {toolbox.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-3xl p-5"
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${cat.color}22` }}
                    >
                      {Icon && <Icon className="h-4 w-4" style={{ color: cat.color }} />}
                    </div>
                    <h3 className="font-display text-sm font-semibold text-white">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.tools.map((tool) => {
                      const logo = getToolLogo(tool.name);
                      return (
                        <span
                          key={tool.name}
                          className="glass-soft inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-white/70"
                        >
                          {logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo} alt="" className="h-3.5 w-3.5 object-contain" />
                          ) : (
                            <span
                              className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold"
                              style={{ color: cat.color }}
                            >
                              {tool.name.charAt(0)}
                            </span>
                          )}
                          {tool.name}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
