"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navItems, site } from "@/data/site";
import { cn, sectionHref } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const ease = [0.22, 1, 0.36, 1] as const;

function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    if (!enabled) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    // A thin band across the upper-middle of the viewport decides which section is "current".
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-38% 0px -58% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, enabled]);
  return active;
}

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ids = navItems.map((n) => n.id);
  const active = useActiveSection(ids, onHome);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-14 max-w-[1180px] items-center justify-between rounded-2xl border px-3 pl-4 transition-all duration-500 ease-[var(--ease-out-quart)] sm:h-[60px]",
          scrolled || open
            ? "border-line bg-bg/70 shadow-float backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group flex items-center gap-2 text-[19px] font-semibold tracking-[-0.04em]"
        >
          <span className="inline-block transition-transform duration-500 ease-[var(--ease-out-quart)] group-hover:-rotate-6">
            {site.initials}
            <span className="text-accent">.</span>
          </span>
          <span className="hidden text-[13px] font-normal tracking-normal text-muted transition-colors group-hover:text-fg-2 xl:inline">
            {site.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = onHome && active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={sectionHref(item.id, onHome)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative block rounded-[10px] px-3.5 py-2 text-[13.5px] transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-[10px] border border-line bg-ink/[0.05]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-accent-line transition-transform duration-300",
                      !isActive && "group-hover:scale-x-100",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.resume}
            download
            className="has-tooltip relative hidden size-10 place-items-center rounded-[11px] border border-line text-fg-2 transition-colors hover:border-line-2 hover:text-fg sm:grid"
            aria-label="Download resume (PDF)"
          >
            <Download className="size-4" aria-hidden />
            <span className="tooltip top-[calc(100%+10px)] bottom-auto">Resume</span>
          </a>
          <a
            href={sectionHref("contact", onHome)}
            className="group/btn hidden h-10 items-center gap-2 rounded-[11px] bg-brand px-4 text-[13.5px] font-medium text-white shadow-btn transition-all duration-300 hover:-translate-y-px sm:inline-flex"
          >
            Let&apos;s Talk
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-[11px] border border-line text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "x" : "m"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className="mx-auto mt-2 max-w-[1180px] overflow-hidden rounded-2xl border border-line bg-bg-2/95 p-3 shadow-deep backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.4, ease }}
                >
                  <a
                    href={sectionHref(item.id, onHome)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-[22px] font-medium tracking-[-0.02em] transition-colors",
                      onHome && active === item.id ? "bg-ink/[0.05] text-fg" : "text-fg-2 active:bg-ink/[0.04]",
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease }}
              className="mt-3 grid gap-2 border-t border-line pt-3"
            >
              <a
                href={site.resume}
                download
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-medium text-white"
              >
                <Download className="size-4" aria-hidden /> Download Resume
              </a>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { href: site.socials.github, label: "GitHub", icon: GithubIcon },
                  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
                  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line text-sm text-fg-2"
                  >
                    <Icon className="size-4" aria-hidden /> {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
