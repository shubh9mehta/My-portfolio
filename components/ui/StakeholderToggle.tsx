"use client";

import { motion } from "framer-motion";
import { Eye, Code2 } from "lucide-react";
import { useStakeholder } from "@/context/StakeholderContext";
import { cn } from "@/lib/utils";

/**
 * Segmented control that flips the whole site between an Overview reading
 * (default, jargon-free business framing) and a Technical reading. Explainers
 * and chart labels across the site swap accordingly.
 */
export default function StakeholderToggle({ className }: { className?: string }) {
  const { mode, setMode } = useStakeholder();

  const options = [
    { key: "executive" as const, label: "Overview", icon: Eye },
    { key: "technical" as const, label: "Technical", icon: Code2 },
  ];

  return (
    <div
      className={cn(
        "glass-soft relative inline-flex items-center rounded-full p-1",
        className
      )}
    >
      {options.map(({ key, label, icon: Icon }) => {
        const active = mode === key;
        return (
          <button
            key={key}
            onClick={() => setMode(key)}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="stakeholder-pill"
                className="absolute inset-0 -z-10 rounded-full bg-white/12 shadow-glow-blue"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="h-3.5 w-3.5" />
            <span className={active ? "text-white" : "text-white/45"}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
