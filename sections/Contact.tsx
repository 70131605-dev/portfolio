import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Opportunity — let's talk")}&body=${encodeURIComponent(
  `Hi ${site.name.split(" ")[0]},\n\nI'm reaching out about…\n\n`,
)}`;

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", value: "Connect on LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "Browse my code", href: site.socials.github, icon: GithubIcon },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <Reveal y={40}>
          <div className="ring-gradient relative isolate overflow-hidden rounded-[28px] bg-[var(--contact-bg)] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            {/* Gradient field */}
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="absolute -left-20 -top-32 size-[520px] animate-drift rounded-full bg-glow-1/25 blur-[120px]" />
              <div className="absolute -bottom-40 right-0 size-[480px] animate-drift rounded-full bg-glow-2/20 blur-[120px] [animation-delay:-12s]" />
              <div className="bg-grid mask-radial absolute inset-0 opacity-50" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow">Contact</p>
                <h2
                  id="contact-title"
                  className="mt-5 text-balance text-[36px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[48px] xl:text-[56px]"
                >
                  Have an opportunity in mind?{" "}
                  <span className="text-gradient">Let&apos;s build something meaningful.</span>
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[18px]">
                  I&apos;m open to software engineering roles, freelance projects and collaborations on modern web, mobile and
                  business applications. I usually reply within one business day.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={mailto} external size="lg" arrow="right" className="h-12 px-6">
                    Start a Conversation
                  </Button>
                  <CopyEmail email={site.email} />
                </div>
              </div>

              <div className="space-y-3">
                {site.avatar && (
                  <div className="mb-5 flex items-center gap-4 px-1">
                    <span className="relative shrink-0">
                      <Image
                        src={site.avatar}
                        alt={site.name}
                        width={56}
                        height={56}
                        className="size-14 rounded-full object-cover ring-2 ring-line-2 ring-offset-2 ring-offset-[var(--contact-bg)]"
                      />
                      <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-[var(--contact-bg)] bg-success" />
                    </span>
                    <span>
                      <span className="block text-[16px] font-semibold tracking-[-0.01em] text-fg">{site.name}</span>
                      <span className="block text-[13.5px] text-fg-2">
                        {site.title} · Usually replies within a day
                      </span>
                    </span>
                  </div>
                )}
                {channels.map(({ label, value, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-bg/50 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:bg-bg/70"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-ink/[0.04] text-fg-2 transition-colors group-hover:text-fg">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] text-muted">{label}</span>
                      <span className="block truncate text-[15px] text-fg">{value}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      aria-hidden
                    />
                  </a>
                ))}
                <div className="flex flex-wrap gap-x-6 gap-y-2 px-1 pt-2 text-[13px] text-fg-2">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-3.5 text-muted" aria-hidden /> {site.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-3.5 text-muted" aria-hidden /> {site.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
