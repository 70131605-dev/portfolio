import { highlights } from "@/data/site";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

/** Headline numbers. Values live in data/site.ts so they stay honest and editable. */
export function Highlights() {
  return (
    <section id="highlights" aria-label="Professional highlights" className="relative py-16 lg:py-20">
      <div className="container-x">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line lg:grid-cols-4" stagger={0.08}>
          {highlights.map((h) => (
            <StaggerItem key={h.label} className="group relative bg-bg p-6 transition-colors duration-500 hover:bg-bg-2 sm:p-8">
              <p className="text-[36px] font-semibold leading-none tracking-[-0.04em] text-fg sm:text-[48px]">
                {"value" in h ? <CountUp value={h.value} suffix={h.suffix} /> : h.text}
              </p>
              <p className="mt-4 text-[14.5px] font-medium text-fg">{h.label}</p>
              <p className="mt-1 text-[13px] text-muted">{h.note}</p>
              <span
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-accent-line transition-transform duration-700 group-hover:scale-x-100 sm:inset-x-8"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
