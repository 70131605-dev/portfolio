"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a vertical timeline; the accent line fills as the user scrolls
 * through it. `lineClassName` positions the track (e.g. its `left`).
 */
export function TimelineProgress({
  children,
  className,
  lineClassName,
}: {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div aria-hidden className={cn("absolute bottom-0 top-0 w-px bg-line", lineClassName)}>
        <motion.div
          style={{ scaleY }}
          className="absolute inset-0 origin-top bg-accent-line-y shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
        />
      </div>
      {children}
    </div>
  );
}
