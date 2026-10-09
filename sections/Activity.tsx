import type { ReactNode } from "react";
import { FolderGit2, Lock, Star } from "lucide-react";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { journey, pinnedRepos, repoNotes } from "@/data/content";
import { getGitHubData } from "@/lib/github";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { GithubIcon } from "@/components/ui/BrandIcons";

/** GitHub's own language colours. */
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  PHP: "#7A86B8",
  Blade: "#F7523F",
  HTML: "#E34C26",
  CSS: "#663399",
  Kotlin: "#A97BFF",
  Python: "#3572A5",
  Dart: "#00B4AB",
  Shell: "#89E051",
};
const langColor = (l: string) => LANG_COLORS[l] ?? "var(--accent-3)";

function StatCard({ icon, value, suffix, label }: { icon: ReactNode; value: number; suffix?: string; label: string }) {
  return (
    <div className="card card-hover h-full p-6">
      <span className="text-accent-3">{icon}</span>
      <p className="mt-5 text-[38px] font-semibold leading-none tracking-[-0.04em] text-fg">
        <CountUp value={value} suffix={suffix} />
      </p>
      <p className="mt-2.5 text-[14.5px] leading-snug text-fg-2">{label}</p>
    </div>
  );
}

function RepoCard({ name, description, language, url, stars }: { name: string; description: string; language: string | null; url: string; stars?: number }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="card card-hover spotlight group flex h-full flex-col p-6">
      <span className="flex items-start gap-2.5">
        <GithubIcon className="mt-0.5 size-[18px] shrink-0 text-fg-2 transition-colors group-hover:text-fg" aria-hidden />
        <span className="break-all font-mono text-[15px] font-semibold leading-snug text-fg">{name}</span>
      </span>
      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-fg-2">{description}</p>
      <span className="mt-6 flex items-center justify-between text-[13px] text-muted">
        {language ? (
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: langColor(language) }} />
            {language}
          </span>
        ) : (
          <span />
        )}
        {stars !== undefined && (
          <span className="flex items-center gap-1">
            <Star className="size-3.5" aria-hidden /> {stars}
          </span>
        )}
      </span>
    </a>
  );
}

function Languages({ rows }: { rows: { name: string; percent: number }[] }) {
  return (
    <div className="card h-full p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-fg">Languages</h3>
        <p className="text-[12.5px] text-muted">Public repositories</p>
      </div>
      {/* Stacked share bar */}
      <div className="mt-7 flex h-2.5 overflow-hidden rounded-full bg-ink/[0.06]" aria-hidden>
        {rows.map((r) => (
          <span key={r.name} style={{ width: `${r.percent}%`, background: langColor(r.name) }} />
        ))}
      </div>
      <ul className="mt-8 space-y-6">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="flex items-center justify-between text-[15px]">
              <span className="flex items-center gap-2.5 text-fg">
                <span className="size-2.5 rounded-full" style={{ background: langColor(r.name) }} />
                {r.name}
              </span>
              <span className="font-mono text-[13px] text-fg-2">{r.percent.toFixed(1)}%</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${r.percent}%`, background: langColor(r.name) }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function Activity() {
  const gh = await getGitHubData(site.githubUsername);
  const techCount = skillGroups.reduce((n, g) => n + g.items.length, 0);
  const profile = gh?.user.html_url ?? site.socials.github;

  const repos = gh
    ? gh.repos.map((r) => ({
        name: r.name,
        description: r.description || repoNotes[r.name] || "Source code on GitHub.",
        language: r.language,
        url: r.html_url,
        stars: r.stargazers_count,
      }))
    : pinnedRepos.map((r) => ({ ...r, stars: undefined }));

  return (
    <section id="activity" aria-labelledby="activity-title" className="section">
      <div className="container-x">
        <div className="grid gap-10 xl:grid-cols-[0.8fr_1.75fr_0.95fr] xl:gap-6">
          {/* Intro */}
          <div className="xl:pr-4">
            <Reveal>
              <p className="eyebrow">GitHub activity</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="activity-title" className="mt-4 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[46px] xl:text-[44px]">
                Engineering Beyond the Interface
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-md text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">
                Open source projects, personal builds and continuous learning. Client work lives in private repositories.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <Button href={profile} external variant="secondary" size="lg" arrow="right" icon={<GithubIcon className="size-[18px]" aria-hidden />}>
                View GitHub Profile
              </Button>
            </Reveal>
          </div>

          {/* Stats + repositories */}
          <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.06}>
            {gh && (
              <StaggerItem>
                <StatCard icon={<FolderGit2 className="size-6" strokeWidth={1.6} aria-hidden />} value={gh.user.public_repos} label="Public repositories" />
              </StaggerItem>
            )}
            <StaggerItem>
              <StatCard icon={<Lock className="size-6" strokeWidth={1.6} aria-hidden />} value={journey.value} suffix={journey.suffix} label="Client projects in private repos" />
            </StaggerItem>
            <StaggerItem>
              <StatCard icon={<GithubIcon className="size-6" aria-hidden />} value={techCount} label="Tools and technologies" />
            </StaggerItem>
            {repos.map((r) => (
              <StaggerItem key={r.name}>
                <RepoCard {...r} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Languages */}
          {gh && gh.languages.length > 0 && (
            <Reveal delay={0.1}>
              <Languages rows={gh.languages} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
