"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export const useMouseGlow = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const latestEvent = useRef<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    latestEvent.current = { x: e.clientX, y: e.clientY };

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setPosition(latestEvent.current);
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return position;
};

export default useMouseGlow;
