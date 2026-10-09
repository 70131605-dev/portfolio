"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { THEME_COLORS, THEME_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

function apply(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_COLORS[theme]));
}

export function ThemeToggle({ className }: { className?: string }) {
  // null until mounted: the server can't know the visitor's theme.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(read());
    // Follow OS changes until the visitor makes an explicit choice.
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      try {
        if (localStorage.getItem(THEME_KEY)) return;
      } catch {}
      const next: Theme = mq.matches ? "light" : "dark";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}

    const root = document.documentElement;
    const commit = () => {
      flushSync(() => setTheme(next));
      apply(next);
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("theme-switching");
    const done = () => requestAnimationFrame(() => root.classList.remove("theme-switching"));

    if (reduce || !document.startViewTransition) {
      commit();
      done();
      return;
    }

    // Circular reveal from the button.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(commit);
    vt.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    vt.finished.finally(done);
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? label : "Toggle theme"}
      title={theme ? label : undefined}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-[11px] border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        {theme && (
          <motion.span
            key={theme}
            initial={{ y: 14, opacity: 0, rotate: -60 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 60 }}
            transition={{ duration: 0.3 }}
            className="grid place-items-center"
          >
            {theme === "light" ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
