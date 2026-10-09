"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Server-renders the final value (so it reads correctly without JS and for
 * crawlers), then counts up once when scrolled into view.
 */
export function CountUp({
  value,
  suffix = "",
  pad = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  pad?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const format = (n: number) => String(Math.round(n)).padStart(pad, "0") + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = format(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}
