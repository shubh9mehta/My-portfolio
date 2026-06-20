"use client";

import { useMouseGlow } from "@/hooks/useMouseGlow";

/**
 * Cinematic lighting: a soft radial "light leak" that follows the cursor,
 * revealing the glass texture of cards as it passes. Plus two static ambient
 * blooms so the obsidian backdrop never feels flat. Purely decorative.
 */
export default function LightLeak() {
  const { x, y } = useMouseGlow();

  return (
    <>
      {/* Static ambient blooms */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent-indigo/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[460px] w-[460px] rounded-full bg-accent-cyan/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-accent-emerald/[0.07] blur-[150px]" />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      {/* Cursor-following leak */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(99,102,241,0.10), transparent 45%)`,
        }}
      />
    </>
  );
}
