import { site } from "@/data/site";

/**
 * Brief intro: initials, a thin progress line, then out of the way in under a
 * second. Pure CSS, so it never blocks on hydration; skipped on repeat visits.
 */
export function Loader() {
  return (
    <div
      aria-hidden
      className="loader pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-bg"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="loader-mark text-[44px] font-semibold tracking-[-0.04em] text-fg">
          {site.initials}
          <span className="text-accent">.</span>
        </span>
        <span className="h-px w-36 overflow-hidden rounded-full bg-line">
          <span className="loader-bar block h-full w-full bg-accent-line" />
        </span>
      </div>
    </div>
  );
}
