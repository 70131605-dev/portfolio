import { featuredProjects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard, projectGrid } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-[radial-gradient(40%_45%_at_80%_50%,color-mix(in_oklab,var(--accent)_9%,transparent),transparent)]" />
      <div className="container-x relative">
        <SectionHeader
          id="projects-title"
          eyebrow="Featured projects"
          title="Selected Work"
          aside={
            <Button href="/projects" variant="secondary" size="lg" arrow="right">
              View All Projects
            </Button>
          }
        />

        <Stagger className={projectGrid} stagger={0.1}>
          {featuredProjects.map((p) => (
            <StaggerItem key={p.slug}>
              <ProjectCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
