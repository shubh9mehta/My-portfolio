"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionIntro from "./SectionIntro";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  /** Optional plain-English explainer chip (swaps with the Technical toggle). */
  plain?: string;
  technical?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  plain,
  technical,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
          <span className="h-px w-6 bg-white/30" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest text-white md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-white/50 md:text-lg">
          {subtitle}
        </p>
      )}
      {plain && technical && (
        <SectionIntro
          plain={plain}
          technical={technical}
          center={align === "center"}
          className="mt-5"
        />
      )}
    </motion.div>
  );
}
