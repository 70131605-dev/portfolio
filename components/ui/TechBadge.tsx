import { TechIcon, type TechKey } from "./TechIcon";
import { cn } from "@/lib/utils";

/** Technology chip: icon + name, soft glow and lift on hover. */
export function TechBadge({
  name,
  icon,
  size = "md",
  className,
}: {
  name: string;
  icon: TechKey;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "group/badge inline-flex items-center gap-2 rounded-[10px] border border-line bg-ink/[0.03] text-fg-2 transition-all duration-300 ease-[var(--ease-out-quart)]",
        "hover:-translate-y-0.5 hover:border-line-2 hover:bg-ink/[0.06] hover:text-fg hover:shadow-[0_6px_24px_-8px_color-mix(in_oklab,var(--accent)_45%,transparent)]",
        size === "sm" ? "h-7 px-2.5 text-[12px]" : "h-9 px-3 text-[13px]",
        className,
      )}
    >
      <TechIcon name={icon} className={size === "sm" ? "size-3.5" : "size-4"} />
      {name}
    </span>
  );
}
