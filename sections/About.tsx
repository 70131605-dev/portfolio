import { journey, principles } from "@/data/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { JourneyChart } from "@/components/ui/JourneyChart";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container-x">
        <div className="grid gap-12 xl:grid-cols-[0.95fr_1.55fr_0.9fr] xl:items-center xl:gap-8">
          {/* Intro */}
          <div>
            <Reveal>
              <p className="eyebrow">About me</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="about-title" className="mt-4 text-[40px] font-semibold leading-[1] tracking-[-0.04em] sm:text-[52px] xl:text-[56px]">
                More Than
                <br />
                Just Code
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[17px]">
                I&apos;m a Software Engineer focused on turning ideas and business requirements into reliable digital products. I
                work across frontend and backend, building responsive interfaces, REST APIs and database-driven business systems.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <Button href="#experience" variant="secondary" size="lg" arrow="right">
                Learn More About Me
              </Button>
            </Reveal>
          </div>

          {/* Principles */}
          <Stagger as="ul" className="grid gap-8 sm:grid-cols-3 sm:gap-0" stagger={0.1}>
            {principles.map(({ title, text, icon: Icon }) => (
              <StaggerItem
                as="li"
                key={title}
                className="group sm:border-l sm:border-line sm:px-6 sm:py-1 xl:px-5"
              >
                <Icon
                  className="size-7 text-accent-3 transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <h3 className="mt-5 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-fg xl:mt-20 xl:min-h-[3.1em] xl:text-[17px]">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2 xl:text-[14.5px]">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Journey */}
          <Reveal delay={0.1}>
            <div className="card spotlight relative overflow-hidden p-7 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-glow-1/25 blur-3xl" />
              <h3 className="relative text-[20px] font-semibold tracking-[-0.02em] text-fg">My Journey</h3>
              <p className="relative mt-3 max-w-xs text-[15px] leading-relaxed text-fg-2">{journey.text}</p>
              <JourneyChart className="relative mt-6 aspect-[30/13] w-full overflow-visible" />
              <p className="relative mt-4 text-[56px] font-semibold leading-none tracking-[-0.04em] text-fg">
                <CountUp value={journey.value} suffix={journey.suffix} />
              </p>
              <p className="relative mt-2 text-[15px] text-fg-2">{journey.label}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
