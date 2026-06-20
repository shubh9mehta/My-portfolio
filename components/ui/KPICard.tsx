"use client";

import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: React.ReactNode;
  impact?: string;
  sublabel?: string;
  accent?: string; // hex
  delay?: number;
  className?: string;
}

/**
 * Executive KPI tile — the "5-second rule" surface. Massive tight-tracked value,
 * muted label, emerald impact pill.
 */
export default function KPICard({
  label,
  value,
  impact,
  sublabel,
  accent = "#10B981",
  delay = 0,
  className,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <GlassCard interactive className={cn("flex h-full flex-col justify-between", className)}>
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-white/45">
            {label}
          </h3>
          <div
            className="mt-3 font-display text-5xl font-bold tracking-kpi text-white md:text-6xl"
          >
            {value}
          </div>
          {sublabel && (
            <p className="mt-2 text-sm leading-snug text-white/45">{sublabel}</p>
          )}
        </div>
        {impact && (
          <div
            className="mt-5 w-fit rounded-full px-3 py-1 text-xs font-bold"
            style={{
              backgroundColor: `${accent}22`,
              color: accent,
            }}
          >
            {impact}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
