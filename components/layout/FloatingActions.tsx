"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/contact";
import { WhatsappIcon } from "@/components/ui/BrandIcons";

/**
 * Bottom-right shortcuts, stacked so they never overlap:
 * - WhatsApp chat, on every page and screen size.
 * - Resume download, desktop only, once the hero is out of view.
 */
export function FloatingActions() {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 600;
      setShowResume(window.scrollY > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* WhatsApp */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${site.name} on WhatsApp`}
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
        className="group pointer-events-auto relative flex items-center"
      >
        {/* Label slides out on hover (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-xl border border-line-2 bg-card-2/95 px-3.5 py-2 text-[13px] font-medium text-fg opacity-0 shadow-float backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
        <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
          {/* Soft attention ring */}
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.6s]" />
          <WhatsappIcon className="relative size-7" aria-hidden />
        </span>
      </motion.a>

      {/* Resume (desktop) */}
      <AnimatePresence>
        {showResume && (
          <motion.a
            href={site.resume}
            download
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="group pointer-events-auto hidden items-center gap-2.5 rounded-2xl border border-line-2 bg-card-2/80 py-2 pl-2 pr-4 text-[13px] font-medium text-fg shadow-float backdrop-blur-xl transition-colors hover:border-ink/25 lg:flex"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-brand text-white">
              <FileText className="size-4" aria-hidden />
            </span>
            Download Resume
            <span className="sr-only">(PDF)</span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
