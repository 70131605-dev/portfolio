import Image from "next/image";
import type { Project } from "@/data/projects";
import { Mockup } from "@/components/mockups/Mockup";
import { cn } from "@/lib/utils";

/** Real screenshot when `project.image` is set, otherwise the coded mockup. */
export function ProjectVisual({
  project,
  className,
  priority,
  sizes = "(min-width: 1024px) 640px, 100vw",
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (project.image) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-[14px] border border-white/10", className)}
        style={{ aspectRatio: project.imageAspect ?? 16 / 10 }}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} preview`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }
  return <Mockup variant={project.mockup} hue={project.hue} label={`${project.title} interface preview`} className={className} />;
}
