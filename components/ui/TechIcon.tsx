import type { ComponentType, SVGProps } from "react";
import type { IconType } from "react-icons";
import {
  SiCloudinary,
  SiCss,
  SiElectron,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { Braces, CodeXml, MonitorSmartphone, Plug, ShieldCheck, SquareCode } from "lucide-react";
import { cn } from "@/lib/utils";

type AnyIcon = IconType | ComponentType<SVGProps<SVGSVGElement>>;

const registry = {
  react: { icon: SiReact, color: "#61DAFB" },
  next: { icon: SiNextdotjs, color: "var(--fg)" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  tailwind: { icon: SiTailwindcss, color: "#38BDF8" },
  html: { icon: SiHtml5, color: "#E34F26" },
  css: { icon: SiCss, color: "#8A6CFF" },
  node: { icon: SiNodedotjs, color: "#5FA04E" },
  express: { icon: SiExpress, color: "var(--fg)" },
  php: { icon: SiPhp, color: "#8892BF" },
  mysql: { icon: SiMysql, color: "#4479A1" },
  postgres: { icon: SiPostgresql, color: "#6A8EE8" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: "var(--fg)" },
  postman: { icon: SiPostman, color: "#FF6C37" },
  docker: { icon: SiDocker, color: "#2496ED" },
  figma: { icon: SiFigma, color: "#F24E1E" },
  vscode: { icon: SquareCode, color: "#3EA6F2" },
  api: { icon: Braces, color: "#9B8CFF" },
  auth: { icon: ShieldCheck, color: "#3CCF91" },
  integration: { icon: Plug, color: "#4F8CFF" },
  responsive: { icon: MonitorSmartphone, color: "#9B8CFF" },
  code: { icon: CodeXml, color: "#E8EAF0" },
  redux: { icon: SiRedux, color: "#8A5CD6" },
  jwt: { icon: SiJsonwebtokens, color: "#FB3F8C" },
  cloudinary: { icon: SiCloudinary, color: "#4B8BF5" },
  electron: { icon: SiElectron, color: "#4FB3CC" },
  vite: { icon: SiVite, color: "#8B6CFF" },
} satisfies Record<string, { icon: AnyIcon; color: string }>;

export type TechKey = keyof typeof registry;

export const techColor = (k: TechKey) => registry[k].color;

/**
 * Renders a technology logo. `tone="brand"` shows brand colour;
 * `tone="mute"` stays grey and picks up brand colour on parent `group` hover.
 */
export function TechIcon({
  name,
  className,
  tone = "brand",
}: {
  name: TechKey;
  className?: string;
  tone?: "brand" | "mute";
}) {
  const { icon: Icon, color } = registry[name];
  return (
    <Icon
      aria-hidden
      className={cn(
        "size-4 shrink-0 transition-colors duration-300",
        tone === "mute" && "text-fg-2 group-hover:text-[var(--brand)]",
        className,
      )}
      style={tone === "brand" ? { color } : ({ "--brand": color } as React.CSSProperties)}
    />
  );
}
