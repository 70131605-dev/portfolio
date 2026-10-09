import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/contact";
import { BackToTop } from "./BackToTop";

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: site.socials.github, label: "GitHub", icon: GithubIcon },
  { href: whatsappLink, label: "WhatsApp", icon: WhatsappIcon },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative z-[2] mt-10">
      <div className="divider-glow" />
      <div className="container-x py-12">
        <div className="grid items-center gap-8 md:grid-cols-3">
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.02em]">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-1 text-sm text-fg-2">
              {site.title} · {site.subtitle}
            </p>
          </div>

          <p className="text-sm text-muted md:text-center">
            Built with <span className="text-fg-2">Next.js</span>, <span className="text-fg-2">TypeScript</span>,{" "}
            <span className="text-fg-2">Tailwind CSS</span> &amp; <span className="text-fg-2">Motion</span>
          </p>

          <div className="flex items-center gap-2 md:justify-end">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid size-10 place-items-center rounded-xl border border-line text-fg-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:text-fg"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
            <BackToTop />
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-line pt-6 text-[13px] text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            {site.location} · {site.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
