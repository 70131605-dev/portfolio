"use client";

import { motion } from "motion/react";
import { useId } from "react";

// Hand-drawn growth curve: a calm start, a steady climb, ending on a highlighted point.
const LINE = "M4 112 C40 104 64 90 98 86 S140 92 172 74 S214 52 238 46 S270 26 296 18";
const AREA = `${LINE} L296 130 L4 130 Z`;

/** Decorative rising-progress chart for the "My Journey" card. */
export function JourneyChart({ className }: { className?: string }) {
  const id = useId().replace(/[^\w-]/g, "");
  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden>
      <defs>
        <linearGradient id={`jl-${id}`} x1="0" x2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: "var(--accent-3)" }} />
        </linearGradient>
        <linearGradient id={`ja-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <motion.path
        d={AREA}
        fill={`url(#ja-${id})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.path
        d={LINE}
        fill="none"
        stroke={`url(#jl-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.4 }}
        style={{ transformOrigin: "296px 18px" }}
      >
        <line x1="296" x2="296" y1="18" y2="130" style={{ stroke: "var(--accent-3)", strokeOpacity: 0.25 }} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="296" cy="18" r="9" style={{ fill: "var(--accent-3)", fillOpacity: 0.25 }} />
        <circle cx="296" cy="18" r="4.5" style={{ fill: "var(--fg)", stroke: "var(--accent-3)" }} strokeWidth="2" />
      </motion.g>
    </svg>
  );
}
