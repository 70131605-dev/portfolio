"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { site } from "@/data/site";

/** Desktop-only resume shortcut that appears once the hero is out of view. */
export function FloatingResume() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 600;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.resume}
          download
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.4 }}
          className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-2xl border border-line-2 bg-card-2/80 py-2 pl-2 pr-4 text-[13px] font-medium text-fg shadow-float backdrop-blur-xl transition-colors hover:border-ink/25 lg:flex"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-brand text-white">
            <FileText className="size-4" aria-hidden />
          </span>
          Download Resume
          <span className="sr-only">(PDF)</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
