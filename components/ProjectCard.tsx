import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Mockup } from "@/components/mockups/Mockup";
import { TechIcon } from "@/components/ui/TechIcon";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

/** 16:9 thumbnail: the real screenshot when there is one, otherwise the coded mockup peeking up from the bottom. */
function Thumb({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="project"
      tabIndex={-1}
      aria-hidden
      className="relative block aspect-video overflow-hidden rounded-[18px] border border-line"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, hsl(${project.hue} 70% 55% / 0.22), transparent 65%), var(--visual-bg)` }}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover/card:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-x-[7%] top-[10%] transition-transform duration-[900ms] ease-[var(--ease-out-quart)] group-hover/card:-translate-y-1.5">
          <Mockup variant={project.mockup} hue={project.hue} label="" className="shadow-deep" />
        </div>
      )}
    </Link>
  );
}

const actionBase =
  "inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-line-2 px-3.5 text-[14px] font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-ink/[0.05]";

/** Project card: thumbnail, title, category, summary, stack and actions. */
export function ProjectCard({ project, priority, headingLevel = "h3" }: { project: Project; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const { demo, github } = project.links;
  const external = demo ?? github;
  const caseStudy = `/projects/${project.slug}`;
  const Heading = headingLevel;

  // Round arrow: always leads to the case study; fills with the brand colour on card hover.
  const caseStudyButton = (
    <Link
      href={caseStudy}
      aria-label={`Read the ${project.title} case study`}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-line-2 text-fg transition-all duration-500 group-hover/card:border-transparent group-hover/card:bg-brand group-hover/card:text-white group-hover/card:shadow-btn"
    >
      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/card:-translate-y-px group-hover/card:translate-x-px" aria-hidden />
    </Link>
  );

  return (
    <article
      className="group/card card card-hover spotlight flex h-full flex-col !rounded-[28px] p-3.5 hover:!border-accent/40 sm:p-4"
      aria-labelledby={`p-${project.slug}`}
    >
      <Thumb project={project} priority={priority} />

      <div className="flex flex-1 flex-col px-2 pb-2 pt-6 sm:px-3">
        <Heading id={`p-${project.slug}`} className="text-[21px] font-semibold leading-snug tracking-[-0.02em] text-fg sm:text-[23px]">
          <Link href={caseStudy} className="transition-colors hover:text-accent-3">
            {project.title}
          </Link>
        </Heading>
        <span className="mt-3 w-fit rounded-lg border border-accent/30 bg-accent/10 px-3 py-1 text-[13px] font-medium text-accent-3">
          {project.category}
        </span>
        <p className="mt-4 text-pretty text-[15px] leading-relaxed text-fg-2 sm:text-[15.5px]">{project.summary}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-4 pt-7">
          <ul className="flex gap-1.5" aria-label="Technology stack">
            {project.stack.slice(0, 4).map((s) => (
              <li
                key={s.name}
                title={s.name}
                className="grid size-8 place-items-center rounded-[9px] border border-line bg-ink/[0.04] transition-colors duration-300 group-hover/card:border-line-2"
              >
                <TechIcon name={s.icon} className="size-4" />
                <span className="sr-only">{s.name}</span>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            {external ? (
              <>
                <a href={external} target="_blank" rel="noopener noreferrer" className={cn(actionBase, "group/btn")}>
                  {demo ? "Visit Site" : <><GithubIcon className="size-4" aria-hidden /> GitHub</>}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
                </a>
                {caseStudyButton}
              </>
            ) : (
              caseStudyButton
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Card grid shared by the homepage and /projects. */
export const projectGrid = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";
