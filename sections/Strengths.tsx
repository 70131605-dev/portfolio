import { strengths } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Strengths() {
  return (
    <section id="strengths" aria-labelledby="strengths-title" className="section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/4 h-[50%] bg-[radial-gradient(40%_50%_at_50%_50%,color-mix(in_oklab,var(--accent)_7%,transparent),transparent)]" />
      <div className="container-x relative">
        <SectionHeader
          id="strengths-title"
          eyebrow="Engineering strengths"
          title="What I Bring to the Table"
          aside={
            <p className="max-w-sm text-pretty text-[15.5px] leading-relaxed text-fg-2 lg:text-right">
              A combination of technical skills, product thinking and real-world experience.
            </p>
          }
        />

        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" stagger={0.07}>
          {strengths.map(({ title, text, icon: Icon }) => (
            <StaggerItem as="li" key={title}>
              <article className="card card-hover spotlight group h-full p-6">
                <span className="grid size-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-3 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/60 group-hover:text-fg">
                  <Icon className="size-[21px]" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-6 text-[17px] font-semibold leading-snug tracking-[-0.015em] text-fg">{title}</h3>
                <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-fg-2">{text}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
