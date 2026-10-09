import type { CSSProperties } from "react";
import { CalendarRange, FolderKanban, Layers, Radio } from "lucide-react";
import { heroStats, site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { HeroVisual } from "./HeroVisual";

const statIcons = [CalendarRange, FolderKanban, Layers, Radio];

// Deterministic particle field (no hydration mismatch, no RNG).
const particles = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53 + 11) % 90}%`,
  dur: `${12 + (i % 6) * 2}s`,
  delay: `${-(i % 7) * 1.7}s`,
  dx: `${((i % 5) - 2) * 9}px`,
  dy: `${-24 - (i % 4) * 10}px`,
  mobile: i % 3 === 0,
}));

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_70%_20%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)]" />
        <div className="absolute -left-40 top-20 size-[520px] animate-drift rounded-full bg-glow-2/[0.07] blur-[110px]" />
        <div className="absolute -right-24 top-40 size-[440px] animate-drift rounded-full bg-glow-1/[0.12] blur-[120px] [animation-delay:-9s]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        {particles.map((p, i) => (
          <span
            key={i}
            className={p.mobile ? "particle" : "particle hidden md:block"}
            style={{ left: p.left, top: p.top, "--dur": p.dur, "--delay": p.delay, "--dx": p.dx, "--dy": p.dy } as CSSProperties}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div className="relative">
          <div className="hero-in inline-flex items-center gap-2.5 rounded-full border border-line bg-ink/[0.03] py-1.5 pl-2.5 pr-3.5 text-[13px] text-fg-2 backdrop-blur" style={d(0)}>
            <span className="relative grid size-2 place-items-center">
              <span className="size-2 animate-pulse-dot rounded-full bg-success" />
            </span>
            Available for opportunities
            <span className="hidden text-muted sm:inline">· {site.location}</span>
          </div>

          <h1
            id="hero-title"
            className="mt-6 text-balance text-[clamp(36px,10.5vw,42px)] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[56px] lg:text-[60px] xl:text-[68px]"
          >
            <span className="hero-in block" style={d(0.08)}>
              Hi, I&apos;m{" "}
              {/* Keep the full name on one line from tablet up. */}
              <span className="text-gradient sm:block sm:whitespace-nowrap">{site.name}.</span>
            </span>
            {/* Supporting line: smaller than the name so the name leads. */}
            <span className="hero-in mt-3 block text-[0.6em] leading-[1.12] tracking-[-0.035em] text-fg sm:mt-4" style={d(0.18)}>
              I build scalable <span className="text-fg-2">digital products.</span>
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-[560px] text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[18px]" style={d(0.3)}>
            {site.title} &amp; {site.subtitle} building modern web applications, business systems and mobile experiences with{" "}
            <span className="text-fg">React, Next.js, Node.js, PHP</span> and <span className="text-fg">React Native</span>.
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={d(0.42)}>
            <Button href="#projects" size="lg" arrow="right">
              View My Work
            </Button>
            <Button href={site.resume} size="lg" variant="secondary" download>
              Download Resume
            </Button>
            <Button
              href={site.socials.github}
              size="lg"
              variant="ghost"
              external
              icon={<GithubIcon className="size-[18px]" aria-hidden />}
              className="px-3"
            >
              GitHub
            </Button>
          </div>

          <dl className="hero-in mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4" style={d(0.55)}>
            {heroStats.map((s, i) => {
              const Icon = statIcons[i];
              return (
                <div key={s.label} className="flex items-start gap-3">
                  <Icon aria-hidden className="mt-1 size-[18px] shrink-0 text-accent-3" strokeWidth={1.6} />
                  <div>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-fg">
                      {"value" in s ? <CountUp value={s.value} suffix={s.suffix} /> : s.text}
                    </dd>
                    <dd className="mt-0.5 text-[12.5px] leading-snug text-muted">{s.label}</dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
