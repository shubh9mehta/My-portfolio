"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Code2 } from "lucide-react";
import { useStakeholder } from "@/context/StakeholderContext";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  /** Friendly, jargon-free one-liner shown in Plain English mode. */
  plain: string;
  /** The same idea with the methods/terminology, shown in Technical mode. */
  technical: string;
  center?: boolean;
  className?: string;
}

/**
 * A small "welcome mat" under each section heading so no reader ever feels lost.
 * Plain English by default; the toggle swaps in the technical framing.
 */
export default function SectionIntro({
  plain,
  technical,
  center = false,
  className,
}: SectionIntroProps) {
  const { isExecutive } = useStakeholder();
  const text = isExecutive ? plain : technical;
  const tag = isExecutive ? "Overview" : "Under the hood";
  const Icon = isExecutive ? Eye : Code2;

  return (
    <div className={cn("flex", center && "justify-center", className)}>
      <div className="glass-soft inline-flex max-w-2xl items-start gap-2.5 rounded-2xl px-4 py-3 text-left">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
        <p className="text-sm leading-relaxed text-white/60">
          <span className="font-semibold text-white/85">{tag}: </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="inline"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>
    </div>
  );
}
