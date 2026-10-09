import { skillGroups } from "@/data/skills";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem, StaggerLi, StaggerList } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

// Static class names so Tailwind can see them.
const iconCols = { 1: "xl:grid-cols-1", 2: "xl:grid-cols-2", 3: "xl:grid-cols-3" } as const;

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(45%_45%_at_20%_50%,color-mix(in_oklab,var(--accent-2)_8%,transparent),transparent)]" />
      <div className="container-x relative">
        <SectionHeader
          id="skills-title"
          eyebrow="Technical skills"
          title="Technologies I Work With"
          aside={
            <p className="max-w-sm text-pretty text-[15.5px] leading-relaxed text-fg-2 lg:text-right">
              A modern stack for building complete digital products, from interface to database.
            </p>
          }
        />

        {/* Card widths follow their icon columns, so every card reads at the same density. */}
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2.7fr_2fr_1.8fr_1.6fr_1.8fr]" stagger={0.07}>
          {skillGroups.map(({ title, items, cols }) => (
            <StaggerItem key={title} className={cn(cols === 3 && "sm:col-span-2 lg:col-span-1")}>
              <article className="card card-hover spotlight h-full p-5 sm:p-6 xl:px-5">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-fg xl:whitespace-nowrap xl:text-[15.5px] 2xl:text-[17px]">{title}</h3>
                <StaggerList
                  className={cn("mt-6 grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-3", iconCols[cols])}
                  aria-label={`${title} technologies`}
                >
                  {items.map((it) => (
                    <StaggerLi key={it.name} className="group/skill flex flex-col items-center gap-3 text-center">
                      <span className="grid size-12 place-items-center rounded-xl transition-all duration-300 group-hover/skill:-translate-y-1 group-hover/skill:bg-ink/[0.05]">
                        <TechIcon name={it.icon} className="size-8 transition-transform duration-300 group-hover/skill:scale-110" />
                      </span>
                      <span className="text-[13.5px] leading-tight text-fg-2 transition-colors group-hover/skill:text-fg">{it.name}</span>
                    </StaggerLi>
                  ))}
                </StaggerList>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
