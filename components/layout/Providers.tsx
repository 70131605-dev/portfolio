"use client";

import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { CustomCursor } from "./CustomCursor";

/**
 * One delegated listener drives the cursor-following spotlight on every
 * `.spotlight` element, so cards themselves can stay server components.
 */
function useSpotlight() {
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useSpotlight();
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {children}
      <CustomCursor />
    </MotionConfig>
  );
}
