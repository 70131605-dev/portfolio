/**
 * Single source of truth for personal details.
 * Replace every value marked TODO before deploying.
 */
import { withBase } from "@/lib/utils";

export const site = {
  name: "Qaiser Shaban",
  initials: "QS",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer",
  tagline: "Building scalable web, mobile and business applications.",
  description:
    "Software Engineer and Full-Stack Developer in Lahore building web applications, business systems, POS software and mobile apps with React, Next.js, Node.js, PHP and React Native.",
  url: "https://70131605-dev.github.io/qaiser",
  location: "Lahore, Pakistan",
  availability: "Full-time, remote & freelance",
  openToWork: true,

  email: "qaiser.chohan.dev@gmail.com",
  /** International format, digits only after the +. Used for wa.me links. */
  whatsapp: "+923485709552",
  whatsappDisplay: "+92 348 5709552",
  /** Used in plain download links, so it carries the base path. Replace public/resume.pdf with your CV. */
  resume: withBase("/resume.pdf"),

  /** Hero portrait (public/…). Set to null to show the initials monogram instead. */
  portrait: "/images/portrait.jpg" as string | null,
  /**
   * Background-removed portrait (transparent WebP/PNG) shown large in the hero
   * over a soft halo. Set to null to fall back to the framed `portrait`.
   */
  portraitCutout: "/images/portrait-cutout.webp" as string | null,
  /** Square head-and-shoulders crop for small avatars (contact card). */
  avatar: "/images/avatar.jpg" as string | null,

  socials: {
    github: "https://github.com/70131605-dev",
    linkedin: "https://www.linkedin.com/in/qaiser-dev"
  },

  /**
   * Your GitHub username. When set, the Activity section pulls live
   * repository and contribution data from the public GitHub API.
   * Leave empty to show only the curated repositories below.
   */
  githubUsername: "70131605-dev",

  /** Shown on page load. Set false to skip the intro. */
  showLoader: true,
} as const;

/** Headline numbers. Keep these honest — they are editable, not computed. */
export const heroStats = [
  { value: 2, suffix: "+", label: "Years building" },
  { value: 10, suffix: "+", label: "Projects delivered" },
  { text: "Full-Stack", label: "Web, mobile & backend" },
  { text: "Available", label: "For opportunities", live: true },
] as const;

export const highlights = [
  { value: 10, suffix: "+", label: "Projects delivered", note: "ERP, POS, web and mobile" },
  { value: 15, suffix: "+", label: "Technologies in production", note: "Across the full stack" },
  { text: "Full Stack", label: "Frontend to backend", note: "Interface, API and database" },
  { value: 100, suffix: "%", label: "Responsive approach", note: "Desktop, tablet and mobile" },
] as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
