"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared dark Recharts tooltip style. */
export const darkTooltipStyle = {
  background: "rgba(14,14,18,0.94)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 14,
  color: "#fff",
  backdropFilter: "blur(12px)",
  fontSize: 12,
} as const;

/** A labelled control row (filters / toggles) above a chart. */
export function ControlRow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">{children}</div>
  );
}

/** Glass select used across dashboards. */
export function GlassSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/60">
      <span className="text-white/40">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent font-medium text-white outline-none [&>option]:bg-obsidian-soft [&>option]:text-white"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Pill toggle group. */
export function PillToggle<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { key: T; label: string }[];
}) {
  return (
    <div className="glass-soft inline-flex items-center gap-1 rounded-full p-1">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            value === o.key
              ? "bg-white/12 text-white"
              : "text-white/45 hover:text-white/70"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** "Key Findings" block — every project must end on bolded business value. */
export function KeyFindings({ items }: { items: ReactNode[] }) {
  return (
    <div className="mt-5 rounded-2xl border border-accent-emerald/20 bg-accent-emerald/[0.06] p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent-emerald">
        Key Findings
      </div>
      <ul className="space-y-1.5 text-sm text-white/70">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
