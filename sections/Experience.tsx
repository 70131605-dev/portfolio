import { GraduationCap, MapPin } from "lucide-react";
import { experience, type Experience as Entry } from "@/data/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "@/components/ui/TechIcon";
import { TimelineProgress } from "@/components/ui/TimelineProgress";
import { cn } from "@/lib/utils";

/** Timeline dot; the current role pulses. */
function Node({ active }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute left-[11px] top-8 grid -translate-x-1/2 place-items-center rounded-full bg-bg md:left-[180px]",
        active ? "size-[22px] border-2 border-accent-3 shadow-[0_0_0_6px_color-mix(in_oklab,var(--accent)_18%,transparent)]" : "size-[18px] border border-line-2",
      )}
    >
      {active && <span className="size-1.5 animate-pulse-dot rounded-full bg-accent-3" />}
    </span>
  );
}

/** Right-hand panel: technologies for work, a degree badge for education. */
function SidePanel({ job }: { job: Entry }) {
  if (job.stack?.length) {
    return (
      <div className="rounded-2xl border border-line bg-ink/[0.02] p-5">
        <p className="text-[14px] font-semibold text-fg">Technologies</p>
        <ul className="mt-4 grid grid-cols-4 gap-2.5">
          {job.stack.map((s) => (
            <li
              key={s.name}
              title={s.name}
              className="grid aspect-square place-items-center rounded-xl border border-line bg-ink/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2"
            >
              <TechIcon name={s.icon} className="size-[22px]" />
              <span className="sr-only">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (job.kind === "education") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-ink/[0.02] px-5 py-7 text-center">
        <GraduationCap className="size-9 text-accent-3" strokeWidth={1.5} aria-hidden />
        <p className="mt-3 text-[15px] font-semibold text-fg">Class of {job.end}</p>
        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Undergraduate</p>
      </div>
    );
  }
  return null;
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          eyebrow="Professional experience"
          title="My Professional Journey"
          aside={
            <p className="max-w-sm text-pretty text-[15.5px] leading-relaxed text-fg-2 lg:text-right">
              Building real-world products and gaining hands-on experience.
            </p>
          }
        />

        <TimelineProgress lineClassName="left-[11px] md:left-[180px]">
          <ol className="space-y-6">
            {experience.map((job) => {
              const current = job.end === "Present";
              return (
                <li key={`${job.company}-${job.start}`} className="relative pl-10 md:grid md:grid-cols-[180px_1fr] md:pl-0">
                  <Node active={current} />

                  {/* Dates */}
                  <Reveal className="pb-4 md:pr-10 md:pt-6 md:text-right">
                    <p className="text-[22px] font-semibold tracking-[-0.02em] text-fg md:text-[26px]">{job.start}</p>
                    <p className="text-[14px] text-fg-2">– {job.end}</p>
                  </Reveal>

                  {/* Card */}
                  <Reveal delay={0.08} className="md:pl-10">
                    <article className={cn("card spotlight overflow-hidden", current && "border-line-2")}>
                      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1fr_1.25fr_auto]">
                        <div>
                          <h3 className="flex items-center gap-2.5 text-[21px] font-semibold tracking-[-0.02em] text-fg sm:text-[22px] 2xl:text-[24px]">
                            {job.kind === "education" && <GraduationCap className="size-6 shrink-0 text-accent-3" strokeWidth={1.7} aria-hidden />}
                            {job.role}
                          </h3>
                          <p className="mt-1.5 text-[16px] font-medium text-accent-3">
                            {job.companyUrl ? (
                              <a href={job.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {job.company}
                              </a>
                            ) : (
                              job.company
                            )}
                          </p>
                          {job.location && (
                            <p className="mt-1.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                              <MapPin className="size-3.5" aria-hidden /> {job.location}
                            </p>
                          )}
                          <p className="mt-5 text-pretty text-[15.5px] leading-relaxed text-fg-2">{job.summary}</p>
                        </div>

                        <ul className="space-y-3.5" aria-label={job.kind === "work" ? "Key contributions" : "Highlights"}>
                          {job.achievements.map((a) => (
                            <li key={a} className="flex gap-3 text-[15px] leading-relaxed text-fg-2">
                              <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-accent" />
                              {a}
                            </li>
                          ))}
                        </ul>

                        <div className="lg:col-span-2 xl:col-span-1 xl:w-[220px]">
                          <SidePanel job={job} />
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </TimelineProgress>
      </div>
    </section>
  );
}
