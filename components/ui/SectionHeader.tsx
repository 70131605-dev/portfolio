import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned slot on wide screens (e.g. a "View all" button). */
  aside?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, aside, align = "left", id, className }: Props) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 lg:mb-16",
        !centered && aside && "lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            id={id}
            className="mt-4 text-balance text-[34px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[42px] lg:text-[52px]"
          >
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.12}>
            <p className={cn("mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[17px]", centered && "mx-auto")}>
              {description}
            </p>
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.16}>{aside}</Reveal>}
    </div>
  );
}
