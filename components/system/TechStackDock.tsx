"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getToolLogo } from "@/lib/toolLogos";

/**
 * Floating "Tech Stack" dock pinned to the bottom of the viewport. A persistent
 * reminder of the engineering behind the visuals. Hover a chip to surface what
 * each tool is used for. Hidden on small screens to keep them uncluttered.
 */
const stack: { name: string; use: string }[] = [
  { name: "Python", use: "Automation & modeling" },
  { name: "SQL", use: "CTEs & window functions" },
  { name: "Pandas", use: "Data wrangling" },
  { name: "scikit-learn", use: "Predictive models" },
  { name: "Power BI", use: "Executive dashboards" },
  { name: "Tableau", use: "Self-serve analytics" },
  { name: "GCP", use: "BigQuery pipelines" },
];

export default function TechStackDock() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center lg:flex">
      <div className="glass-nav pointer-events-auto flex items-center gap-1 rounded-full px-2.5 py-2 shadow-glass">
        <span className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
          Stack
        </span>
        {stack.map((tool) => {
          const logo = getToolLogo(tool.name);
          const active = hovered === tool.name;
          return (
            <div
              key={tool.name}
              className="relative"
              onMouseEnter={() => setHovered(tool.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.div
                whileHover={{ scale: 1.18, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  active ? "bg-white/12" : "bg-white/[0.04]"
                }`}
              >
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt={tool.name}
                    className="h-5 w-5 object-contain"
                    style={{ filter: "brightness(1.05)" }}
                  />
                ) : (
                  <span className="text-[11px] font-bold text-white/70">
                    {tool.name.charAt(0)}
                  </span>
                )}
              </motion.div>

              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl glass px-3 py-1.5 text-center"
                  >
                    <div className="text-xs font-semibold text-white">{tool.name}</div>
                    <div className="text-[10px] text-white/45">{tool.use}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
