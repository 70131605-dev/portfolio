import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] transition-all duration-300 ease-[var(--ease-out-quart)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "overflow-hidden text-white bg-brand bg-[length:160%_160%] bg-[position:0%_50%] hover:bg-[position:100%_50%] shadow-btn hover:-translate-y-0.5",
  secondary:
    "text-fg border border-line-2 bg-ink/[0.02] hover:bg-ink/[0.06] hover:border-ink/25 hover:-translate-y-0.5",
  ghost: "text-fg-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px] rounded-[10px]",
  md: "h-11 px-5 text-sm rounded-[11px]",
  lg: "h-12 px-6 text-[15px] rounded-xl",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  arrow?: "right" | "diagonal" | false;
  external?: boolean;
  download?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  arrow = false,
  external,
  download,
  className,
  ...rest
}: Props) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow === "right" && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
      {arrow === "diagonal" && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);

  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
        aria-label={rest["aria-label"]}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={rest["aria-label"]}>
      {content}
    </Link>
  );
}
