"use client";

import { useCounter } from "@/hooks/useCounter";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up from 0 to `value` when scrolled into view. */
export default function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  className,
}: AnimatedNumberProps) {
  const { count, ref } = useCounter(value, duration);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
