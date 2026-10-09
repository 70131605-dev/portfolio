import type { ReactNode } from "react";
import { ArrowRight, AtSign, Download, Globe, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

const whatsappLink = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${site.name.split(" ")[0]}, I came across your portfolio and would like to discuss an opportunity.`,
)}`;

/** Shown without the protocol, e.g. "in/qaiser-dev". */
const shortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/^linkedin\.com\//, "").replace(/\/$/, "");

type Row = { label: string; value: ReactNode; icon: ReactNode; href?: string; copy?: string };

const rows: Row[] = [
  {
    label: "Email",
    // Allow a line break after "@" on narrow screens instead of mid-word.
    value: (() => {
      const [user, domain] = site.email.split("@");
      return (
        <>
          {user}@<wbr />
          {domain}
        </>
      );
    })(), icon: <AtSign className="size-[18px]" aria-hidden />, href: `mailto:${site.email}`, copy: site.email },
  { label: "WhatsApp", value: site.whatsappDisplay, icon: <WhatsappIcon className="size-[18px]" aria-hidden />, href: whatsappLink, copy: site.whatsappDisplay },
  { label: "LinkedIn", value: shortUrl(site.socials.linkedin), icon: <LinkedinIcon className="size-[17px]" aria-hidden />, href: site.socials.linkedin },
  { label: "GitHub", value: shortUrl(site.socials.github), icon: <GithubIcon className="size-[18px]" aria-hidden />, href: site.socials.github },
  { label: "Location", value: site.location, icon: <MapPin className="size-[18px]" aria-hidden /> },
  {
    label: "Availability",
    value: (
      <span className="flex items-center gap-2.5">
        <span className="size-2 shrink-0 animate-pulse-dot rounded-full bg-success" />
        {site.availability}
      </span>
    ),
    icon: <Globe className="size-[18px]" aria-hidden />,
  },
];

function ContactRow({ label, value, icon, href, copy }: Row) {
  const external = href?.startsWith("http");
  const body = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/10 text-accent-3 transition-colors group-hover:text-fg">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</span>
        <span className="mt-1 block break-words text-[15px] text-fg sm:text-[15.5px]">{value}</span>
      </span>
    </>
  );
  return (
    <li className="flex items-center gap-3 border-b border-line px-4 py-4 last:border-b-0 sm:px-6">
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex min-w-0 flex-1 items-center gap-3.5 transition-opacity hover:opacity-90 sm:gap-4"
        >
          {body}
        </a>
      ) : (
        <div className="group flex min-w-0 flex-1 items-center gap-3.5 sm:gap-4">{body}</div>
      )}
      {copy && <CopyButton value={copy} label={label} />}
    </li>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <Reveal y={40}>
          <div className="ring-gradient relative isolate overflow-hidden rounded-[32px] bg-[var(--contact-bg)] px-5 py-12 sm:px-12 sm:py-16 lg:px-16">
            {/* Gradient field */}
            <div aria-hidden className="absolute inset-0 -z-10">
              <div className="absolute -left-20 -top-32 size-[560px] animate-drift rounded-full bg-glow-1/25 blur-[120px]" />
              <div className="absolute -bottom-40 left-1/3 size-[420px] animate-drift rounded-full bg-glow-2/15 blur-[120px] [animation-delay:-12s]" />
              <div className="absolute -right-24 top-0 size-[380px] rounded-full bg-glow-1/20 blur-[120px]" />
              <div className="bg-grid mask-radial absolute inset-0 opacity-40" />
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
              <div>
                <p className="eyebrow">Contact</p>
                <h2
                  id="contact-title"
                  className="mt-5 text-balance text-[38px] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[52px] xl:text-[60px]"
                >
                  Have an opportunity in mind? <span className="text-gradient">Let&apos;s build something meaningful.</span>
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-[16px] leading-relaxed text-fg-2 sm:text-[18px]">
                  I&apos;m open to software engineering roles, freelance projects and collaborations on web, mobile and business
                  applications.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand px-6 text-[15.5px] font-medium text-white shadow-btn transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <WhatsappIcon className="size-[18px]" aria-hidden />
                    Start a Conversation
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden />
                  </a>
                  <a
                    href={site.resume}
                    download
                    className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-line-2 bg-ink/[0.03] px-6 text-[15.5px] font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-ink/[0.07]"
                  >
                    <Download className="size-[18px]" aria-hidden />
                    Download Resume
                  </a>
                </div>
              </div>

              <ul className="overflow-hidden rounded-[24px] border border-line-2 bg-[var(--card)]/80 shadow-deep backdrop-blur-md">
                {rows.map((r) => (
                  <ContactRow key={r.label} {...r} />
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
