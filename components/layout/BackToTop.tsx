"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      aria-label="Back to top"
      className="group ml-2 grid size-10 place-items-center rounded-xl border border-line bg-ink/[0.03] text-fg transition-all duration-300 hover:border-line-2 hover:bg-ink/[0.07]"
    >
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
    </button>
  );
}
