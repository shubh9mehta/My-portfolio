"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStakeholder } from "@/context/StakeholderContext";
import { cn } from "@/lib/utils";

interface StakeholderLabelProps {
  /** Shown in Executive / business mode. */
  business: string;
  /** Shown in Technical mode. */
  technical: string;
  className?: string;
}

/** Crossfades between a business label and its technical equivalent. */
export default function StakeholderLabel({
  business,
  technical,
  className,
}: StakeholderLabelProps) {
  const { isExecutive } = useStakeholder();
  const text = isExecutive ? business : technical;

  return (
    <span className={cn("inline-block", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
