import { caseStudy } from "@/data/content";
import { getProject } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { OfflinePos } from "@/components/mockups/OfflinePos";

export function CaseStudy() {
  const project = getProject(caseStudy.slug);
  if (!project) return null;

  return (
    <section id="case-study" aria-labelledby="case-title" className="section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(40%_50%_at_15%_10%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent)]" />
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:grid-cols-[0.82fr_1.42fr_0.92fr] xl:gap-10">
          {/* Intro */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Reveal>
              <p className="eyebrow">Case study</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="case-title" className="mt-4 text-balance text-[38px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[48px] xl:text-[40px] 2xl:text-[46px]">
                From Business Problem to Production System
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">{caseStudy.intro}</p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <Button href={`/projects/${project.slug}`} size="lg" arrow="right">
                View Full Case Study
              </Button>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.1}>
            <OfflinePos />
            <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-muted">
              {site.name}
              <br />
              {site.title}
            </p>
          </Reveal>

          {/* Points */}
          <Stagger as="ul" className="space-y-7" stagger={0.08}>
            {caseStudy.points.map(({ label, text, icon: Icon }) => (
              <StaggerItem as="li" key={label} className="group flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-accent/25 bg-accent/10 text-accent-3 transition-transform duration-500 group-hover:-translate-y-0.5">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-fg">{label}</h3>
                  <p className="mt-1.5 text-pretty text-[15px] leading-relaxed text-fg-2">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
