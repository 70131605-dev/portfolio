import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CircleCheck, ExternalLink, Lock } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { ogImage } from "@/lib/seo";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Mockup } from "@/components/mockups/Mockup";
import { TechBadge } from "@/components/ui/TechBadge";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/BrandIcons";

export const dynamicParams = false;

/** Staggered CSS entry for above-the-fold content. */
const rise = (delay: string) => ({ "--d": delay }) as CSSProperties;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const title = `${p.title} — Case Study`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: "article", title, description: p.summary, url: `/projects/${p.slug}`, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description: p.summary, images: [ogImage] },
  };
}

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 lg:grid-cols-[260px_1fr] lg:gap-16 lg:py-20">
      <Reveal>
        <p className="eyebrow">{label}</p>
        <h2 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-fg lg:text-[30px]">{title}</h2>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const { detail } = p;

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.summary,
    genre: p.category,
    dateCreated: p.year,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: p.stack.map((s) => s.name).join(", "),
  };

  return (
    <article className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <header className="relative isolate overflow-hidden pb-12 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0" style={{ background: `radial-gradient(60% 50% at 50% 0%, hsl(${p.hue} 80% 60% / 0.16), transparent 70%)` }} />
          <div className="bg-grid mask-radial absolute inset-0 opacity-50" />
        </div>
        <div className="container-x">
          <div className="rise-in" style={rise("0s")}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-[13.5px] text-fg-2 transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
              All projects
            </Link>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="rise-in" style={rise("0.03s")}>
                <p className="flex items-center gap-3 font-mono text-[12px]">
                  <span className="text-accent-3">{p.index}</span>
                  <span className="h-px w-6 bg-line-2" />
                  <span className="uppercase tracking-[0.12em] text-muted">{p.category}</span>
                </p>
              </div>
              <div className="rise-in" style={rise("0.06s")}>
                <h1 className="mt-4 text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[60px] lg:text-[72px]">
                  {p.title}
                </h1>
              </div>
              <div className="rise-in" style={rise("0.1s")}>
                <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-2 sm:text-[19px]">{p.summary}</p>
              </div>
            </div>

            <div className="rise-in" style={rise("0.14s")}>
              <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-line bg-ink/[0.02] p-5 text-[14px]">
                {[
                  ["Role", p.role],
                  ["Year", p.year],
                  ["Category", p.category],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                    <dd className="mt-1.5 text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {p.links.demo && (
                  <Button href={p.links.demo} external icon={<ExternalLink className="size-4" aria-hidden />}>
                    Live Demo
                  </Button>
                )}
                {p.links.github && (
                  <Button href={p.links.github} external variant="secondary" icon={<GithubIcon className="size-4" aria-hidden />}>
                    GitHub
                  </Button>
                )}
                {!p.links.demo && !p.links.github && (
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
                    <Lock className="size-3.5" aria-hidden /> {p.linkNote ?? "Private client project"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main visual */}
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-[28px] border border-line p-3 sm:p-8 lg:p-12"
          style={{ background: `radial-gradient(80% 70% at 50% 0%, hsl(${p.hue} 80% 60% / 0.18), transparent 65%), var(--visual-bg)` }}
        >
          <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [background-size:40px_40px] mask-fade-y" />
          <div className="rise-in relative" style={rise("0.12s")}>
            <ProjectVisual project={p} priority sizes="(min-width: 1280px) 1100px, 100vw" className="shadow-deep" />
          </div>
        </div>
      </div>

      <div className="container-x mt-16 lg:mt-24">
        <Block label="Overview" title="The product">
          <Reveal>
            <p className="text-pretty text-[19px] leading-[1.6] text-fg sm:text-[21px]">{detail.overview}</p>
          </Reveal>
        </Block>

        <Block label="Problem & solution" title="What needed to change">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["The problem", detail.problem],
              ["The solution", detail.solution],
            ].map(([k, v], j) => (
              <Reveal key={k} delay={j * 0.08}>
                <div className="card h-full p-6 sm:p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-3">{k}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="My role" title="Responsibilities">
          <Stagger as="ul" className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {detail.responsibilities.map((r) => (
              <StaggerItem as="li" key={r} className="flex gap-3 rounded-xl border border-line bg-ink/[0.02] p-4 text-[15px] text-fg-2">
                <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-accent-3" aria-hidden />
                {r}
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Technology stack</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s.name}>
                  <TechBadge name={s.name} icon={s.icon} />
                </li>
              ))}
            </ul>
          </div>
        </Block>

        <Block label="Key features" title="What it does">
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.07}>
            {detail.features.map((f, j) => (
              <StaggerItem key={f.title}>
                <div className="card card-hover spotlight h-full p-6">
                  <span className="font-mono text-[12px] text-accent-3">0{j + 1}</span>
                  <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-fg">{f.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-fg-2">{f.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Block>

        <Block label="Architecture" title="How it fits together">
          <Stagger className="relative space-y-3" stagger={0.1}>
            {detail.architecture.map((layer, j) => (
              <StaggerItem key={layer.layer}>
                <div className="grid items-center gap-4 rounded-2xl border border-line bg-ink/[0.02] p-4 sm:grid-cols-[150px_1fr] sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-8 place-items-center rounded-lg bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_30%,transparent),color-mix(in_oklab,var(--accent-2)_10%,transparent))] font-mono text-[12px] text-fg">
                      {j + 1}
                    </span>
                    <span className="text-[15px] font-medium text-fg">{layer.layer}</span>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {layer.items.map((it) => (
                      <li key={it} className="rounded-lg border border-line bg-bg px-3 py-1.5 text-[13px] text-fg-2">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                {j < detail.architecture.length - 1 && (
                  <div aria-hidden className="ml-[31px] h-3 w-px bg-[linear-gradient(180deg,var(--accent),transparent)] sm:ml-[35px]" />
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </Block>

        <Block label="Design screens" title="Interface">
          <div className="grid gap-5 md:grid-cols-2">
            {detail.screens.map((s, j) => (
              <Reveal key={s.label} delay={j * 0.08}>
                <figure>
                  <MaskReveal>
                    <Mockup variant={s.mockup} hue={p.hue} label={`${p.title}: ${s.label}`} />
                  </MaskReveal>
                  <figcaption className="mt-3 text-[13px] text-muted">{s.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="Challenges" title="Problems solved along the way">
          <div className="space-y-4">
            {detail.challenges.map((c, j) => (
              <Reveal key={c.challenge} delay={j * 0.06}>
                <div className="card grid gap-5 p-6 md:grid-cols-2 md:gap-8 sm:p-7">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Challenge</p>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-fg">{c.challenge}</p>
                  </div>
                  <div className="md:border-l md:border-line md:pl-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-3">Solution</p>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-fg-2">{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="Outcome" title="The result">
          <Reveal>
            <p className="text-pretty text-[19px] leading-[1.6] text-fg sm:text-[21px]">{detail.outcome}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.08}>
            {detail.outcomes.map((o) => (
              <StaggerItem key={o}>
                <div className="h-full rounded-2xl border border-line bg-[linear-gradient(160deg,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_60%)] p-5">
                  <CircleCheck className="size-5 text-accent-3" aria-hidden />
                  <p className="mt-3 text-[15px] font-medium leading-snug text-fg">{o}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Block>
      </div>

      {/* Next project */}
      {next && next.slug !== p.slug && (
        <div className="container-x mt-6">
          <Link
            href={`/projects/${next.slug}`}
            data-cursor="project"
            className="group/card card spotlight grid items-center gap-6 overflow-hidden p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]"
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Next project</p>
              <p className="mt-3 text-[30px] font-semibold tracking-[-0.035em] text-fg sm:text-[40px]">{next.title}</p>
              <p className="mt-2 text-[15px] text-fg-2">{next.category}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-accent-3">
                Read case study
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/card:translate-x-1" aria-hidden />
              </span>
            </div>
            <div className="transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover/card:-translate-y-1 group-hover/card:scale-[1.02]">
              <ProjectVisual project={next} />
            </div>
          </Link>
        </div>
      )}

      <div className="container-x py-20 text-center">
        <p className="text-[15px] text-fg-2">Interested in work like this?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button href="/#contact" arrow="right">
            Let&apos;s talk
          </Button>
          <Button href={site.resume} variant="secondary" download>
            Download Resume
          </Button>
        </div>
      </div>
    </article>
  );
}
