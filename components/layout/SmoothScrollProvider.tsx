"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Guard against React 18 Strict Mode double-invocation of effects.
    if (initializedRef.current) return;
    initializedRef.current = true;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  const value: LenisContextValue = {
    scrollTo: (target, options) => {
      lenisRef.current?.scrollTo(target, options);
    },
    stop: () => {
      lenisRef.current?.stop();
    },
    start: () => {
      lenisRef.current?.start();
    },
  };

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenis must be used within a SmoothScrollProvider");
  }
  return ctx;
}
