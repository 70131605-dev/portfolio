import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard, projectGrid } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Restaurant, e-commerce, booking, ERP, POS and other platforms I have designed and built.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <section className="relative isolate pb-24 pt-32 sm:pt-40" aria-labelledby="all-projects-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)]" />
        <div className="bg-grid mask-radial absolute inset-x-0 top-0 h-[600px] opacity-50" />
      </div>
      <div className="container-x">
        <Reveal>
          <Link href="/" className="group inline-flex items-center gap-2 text-[13.5px] text-fg-2 transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
            Home
          </Link>
        </Reveal>
        <div className="mb-12 mt-10 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Portfolio</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 id="all-projects-title" className="mt-4 text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[56px] lg:text-[64px]">
                All Projects
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">
                Client work and products I have designed and built — from restaurant and salon systems to e-commerce, ERP and POS.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="font-mono text-[13px] text-muted">
              <span className="text-fg">{String(projects.length).padStart(2, "0")}</span> projects
            </p>
          </Reveal>
        </div>

        <Stagger className={projectGrid} stagger={0.06}>
          {projects.map((p, i) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} priority={i < 3} headingLevel="h2" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
