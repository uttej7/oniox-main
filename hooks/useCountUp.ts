"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 → target using an ease-out cubic curve.
 * @param target  Final value to count up to
 * @param duration  Animation duration in ms (default 1400)
 * @param delay   Start delay in ms (default 0) — use for staggered cards
 */
export function useCountUp(target: number, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset whenever target changes
    setCount(0);
    startRef.current = null;

    const timeoutId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic  → fast start, slow finish
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target); // ensure exact final value
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return count;
}
