import { processSteps } from "@/data/content";
import { DrawLine, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

/** Glowing dot that travels along the connector line. */
function Traveller({ vertical }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden
      className={
        vertical
          ? "absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 animate-travel-y rounded-full bg-fg shadow-[0_0_10px_3px_color-mix(in_oklab,var(--accent-3)_80%,transparent)]"
          : "absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 animate-travel rounded-full bg-fg shadow-[0_0_10px_3px_color-mix(in_oklab,var(--accent-3)_80%,transparent)]"
      }
    />
  );
}

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section">
      <div className="container-x">
        <Reveal y={40}>
          <div className="card relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 xl:grid xl:grid-cols-[210px_1fr] xl:items-center xl:gap-10">
            <div aria-hidden className="pointer-events-none absolute -left-24 top-1/2 size-80 -translate-y-1/2 rounded-full bg-glow-1/15 blur-3xl" />

            <div className="relative">
              <p className="eyebrow">Development process</p>
              <h2 id="process-title" className="mt-4 text-[32px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[38px] xl:text-[34px]">
                How I Build Products
              </h2>
            </div>

            <div className="relative mt-10 xl:mt-0">
              {/* Connector: horizontal through the icon centres on desktop, vertical on smaller screens. */}
              <div aria-hidden className="absolute left-[34px] right-0 top-[34px] hidden h-px lg:block">
                <DrawLine className="size-full" />
                <Traveller />
              </div>
              <div aria-hidden className="absolute bottom-[34px] left-[34px] top-[34px] w-px lg:hidden">
                <DrawLine vertical className="size-full" />
                <Traveller vertical />
              </div>

              <Stagger as="ol" className="relative grid gap-8 lg:grid-cols-6 lg:gap-5" stagger={0.09}>
                {processSteps.map(({ n, title, text, icon: Icon }) => (
                  <StaggerItem as="li" key={n} className="group flex gap-5 lg:block">
                    <span className="relative grid size-[68px] shrink-0 place-items-center rounded-full bg-[var(--bg-2)] shadow-[0_0_0_6px_var(--card),0_10px_30px_-10px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                      <span className="grid size-[54px] place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent-3 transition-all duration-500 group-hover:scale-105 group-hover:border-accent group-hover:text-fg">
                        <Icon className="size-[22px]" strokeWidth={1.6} aria-hidden />
                      </span>
                    </span>
                    <div className="lg:mt-6">
                      <p className="font-mono text-[12.5px] text-accent-3">{n}</p>
                      <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-fg">{title}</h3>
                      <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-fg-2">{text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
