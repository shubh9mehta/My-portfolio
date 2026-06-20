"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ViewMode = "executive" | "technical";

interface StakeholderContextValue {
  mode: ViewMode;
  isExecutive: boolean;
  toggle: () => void;
  setMode: (m: ViewMode) => void;
}

const StakeholderContext = createContext<StakeholderContextValue | null>(null);

export function StakeholderProvider({ children }: { children: ReactNode }) {
  // Default to the executive / business view — stakeholders see value first.
  const [mode, setMode] = useState<ViewMode>("executive");

  const value: StakeholderContextValue = {
    mode,
    isExecutive: mode === "executive",
    toggle: () => setMode((m) => (m === "executive" ? "technical" : "executive")),
    setMode,
  };

  return (
    <StakeholderContext.Provider value={value}>
      {children}
    </StakeholderContext.Provider>
  );
}

export function useStakeholder() {
  const ctx = useContext(StakeholderContext);
  if (!ctx) {
    throw new Error("useStakeholder must be used within a StakeholderProvider");
  }
  return ctx;
}
