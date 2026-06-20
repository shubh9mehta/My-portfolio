"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  /** Enables the subtle spring-bounce hover lift. */
  interactive?: boolean;
};

/**
 * Liquid Glass bento container: heavy backdrop blur, hairline border,
 * deep shadow, generous radius. The foundational surface of the whole site.
 */
export default function GlassCard({
  className,
  interactive = false,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        interactive
          ? { scale: 1.015, y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }
          : undefined
      }
      className={cn(
        "glass rounded-[32px] p-7 md:p-8",
        interactive && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
