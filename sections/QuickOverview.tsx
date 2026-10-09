import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { overview } from "@/data/content";
import { site } from "@/data/site";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Resume", href: site.resume, icon: FileText, download: true },
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: site.socials.github, icon: GithubIcon },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

/** The 10-second scan: who, what, focus, availability — plus every link a recruiter needs. */
export function QuickOverview() {
  return (
    <section id="overview" aria-label="Profile at a glance" className="relative pb-8">
      <div className="container-x">
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {overview.map(({ label, value, detail, icon: Icon }, i) => (
            <StaggerItem key={label}>
              <div className="card card-hover spotlight group flex h-full items-start gap-4 p-5">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-ink/[0.04] text-accent-3 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-fg",
                    i === 3 && "text-success",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
                  <p className="mt-1.5 text-[16px] font-semibold leading-snug tracking-[-0.015em] text-fg">{value}</p>
                  <p className="mt-1 text-[13px] leading-snug text-fg-2">{detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-line px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[14px] text-fg-2">
            <span className="text-fg">Recruiting?</span> Everything you need is one click away.
          </p>
          <ul className="flex flex-wrap gap-2">
            {quickLinks.map(({ label, href, icon: Icon, download }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(download ? { download: "" } : href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex h-9 items-center gap-2 rounded-[10px] border border-line bg-ink/[0.02] px-3 text-[13px] text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:text-fg"
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                  <ArrowUpRight className="size-3 opacity-50 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
