"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Check } from "lucide-react";
import { site } from "@/data/site";
import { TechIcon, type TechKey } from "@/components/ui/TechIcon";
import { MEDALLION_ORBIT, PortraitMedallion } from "@/components/ui/PortraitMedallion";
import { tokenize } from "@/lib/highlight";
import { cn } from "@/lib/utils";

const devCode = `const developer = {
  role: "Software Engineer",
  focus: "Full Stack",
  passion: "Building Products",
  status: "Available"
};`;

const building = ["Web Applications", "Mobile Applications", "Business Systems", "API Development"];

/**
 * Medallion box inside the visual: `left` and `size` are % of the visual's
 * width, `top` is % of its height. Icons orbit the same box, so the two can
 * never drift apart.
 */
const MEDALLION = { left: 14, top: 10, size: 66 };

/** Tech icons orbiting the portrait on its dashed ring. Angle in degrees: 0° = right, clockwise. */
const orbitIcons: { icon: TechKey; label: string; angle: number; depth: number; delay: string }[] = [
  { icon: "figma", label: "Figma", angle: 250, depth: 1.2, delay: "-2s" },
  { icon: "code", label: "Code", angle: 290, depth: 1.5, delay: "-6s" },
  { icon: "react", label: "React", angle: 200, depth: 1.4, delay: "0s" },
  { icon: "javascript", label: "JavaScript", angle: 165, depth: 1.1, delay: "-3s" },
  { icon: "typescript", label: "TypeScript", angle: 130, depth: 0.9, delay: "-5s" },
];

/** Point on the orbit ring, as % of the (square) medallion box. */
const onOrbit = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  const k = 50 * MEDALLION_ORBIT;
  return { left: `${(50 + k * Math.cos(r)).toFixed(2)}%`, top: `${(50 + k * Math.sin(r)).toFixed(2)}%` };
};

const medallionBox: CSSProperties = { left: `${MEDALLION.left}%`, top: `${MEDALLION.top}%`, width: `${MEDALLION.size}%` };

/** Layer that drifts with the pointer; `depth` scales the movement. */
function Layer({
  mx,
  my,
  depth,
  className,
  children,
  style,
  decorative = true,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  /** Hidden from assistive tech unless it carries real content. */
  decorative?: boolean;
}) {
  const x = useTransform(mx, (v) => v * depth * 14);
  const y = useTransform(my, (v) => v * depth * 14);
  return (
    <motion.div style={{ ...style, x, y }} className={cn("absolute", className)} aria-hidden={decorative || undefined}>
      {children}
    </motion.div>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 });
  const my = useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  useEffect(() => {
    if (reduce || !matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const lines = tokenize(devCode);

  return (
    <motion.div
      ref={ref}
      style={{ y: scrollY }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.25 }}
      className="relative mx-auto aspect-[6/7] w-full max-w-[520px] lg:max-w-none"
    >
      {site.portraitCutout ? (
        <>
          {/* Portrait medallion; its box width is the disc's diameter. */}
          <Layer mx={mx} my={my} depth={0.35} className="aspect-square" style={medallionBox} decorative={false}>
            <PortraitMedallion src={site.portraitCutout} alt={`${site.name}, ${site.title}`} fit="contain" />
          </Layer>
        </>
      ) : (
        <>
        {/* Halo and rings, centred on the portrait's head and shoulders */}
        <div aria-hidden className="absolute left-[40%] top-[40%] aspect-square w-[104%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_62%)] blur-2xl" />
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <defs>
              <linearGradient id="hero-ring" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" style={{ stopColor: "var(--accent-3)" }} stopOpacity="0.55" />
                <stop offset="0.5" style={{ stopColor: "var(--accent-2)" }} stopOpacity="0.05" />
                <stop offset="1" style={{ stopColor: "var(--accent)" }} stopOpacity="0.45" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#hero-ring)" strokeWidth="1" />
            <circle cx="200" cy="200" r="118" fill="none" style={{ stroke: "var(--line-2)" }} strokeDasharray="2 6" />
          </svg>
        </div>
        {/* Framed portrait (used when no cut-out is configured) */}
        <Layer mx={mx} my={my} depth={0.4} className="inset-x-[22%] inset-y-[12%]" decorative={!site.portrait}>
          <div className="border-glow relative size-full overflow-hidden rounded-[32px] border border-line-2 bg-[image:var(--portrait-bg)] shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--accent)_55%,transparent)]">
            {site.portrait ? (
              <>
                {/* Slow settle-in zoom; the photo stays the hero's focal point. */}
                <motion.div
                  className="absolute inset-0 origin-[50%_32%]"
                  initial={{ scale: 1.22 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 1.6, delay: 0.25 }}
                >
                  <Image
                    src={site.portrait}
                    alt={`${site.name}, ${site.title}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 340px, 56vw"
                    className="object-cover object-[50%_18%]"
                  />
                </motion.div>
                {/* Grade: soft vignette on top, fade into the page at the bottom. */}
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,transparent_55%,rgb(0_0_0/0.18))]" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/55 to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-[22%]">
                <div className="bg-grid absolute inset-0 opacity-50 [background-size:28px_28px] mask-fade-y" />
                <span className="text-gradient relative text-[clamp(72px,11vw,124px)] font-semibold leading-none tracking-[-0.07em]">
                  {site.initials}
                </span>
                <span className="relative mt-5 h-px w-2/3 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent-3)_60%,transparent),transparent)]" />
                <span className="relative mt-4 hidden font-mono text-[11px] uppercase tracking-[0.22em] text-fg-2 sm:block">{site.title}</span>
              </div>
            )}
          </div>
        </Layer>
        </>
      )}

      {/* Tech icons orbiting the portrait */}
      <div aria-hidden className="pointer-events-none absolute aspect-square" style={medallionBox}>
        {orbitIcons.map((o) => (
          <Layer key={o.icon} mx={mx} my={my} depth={o.depth} style={onOrbit(o.angle)}>
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div
                className="grid size-11 animate-float place-items-center rounded-2xl border border-white/10 bg-[#15171c]/95 shadow-float backdrop-blur-md sm:size-[56px]"
                style={{ animationDelay: o.delay }}
                title={o.label}
              >
                <TechIcon name={o.icon} className="size-5 sm:size-7" />
              </div>
            </div>
          </Layer>
        ))}
      </div>

      {/* "Building" status widget */}
      <Layer mx={mx} my={my} depth={1.1} className="right-[-4%] top-[1%] hidden sm:block xl:right-[-8%]">
        <div className="w-[190px] animate-float-slow rounded-2xl border border-line-2 bg-card/85 p-4 shadow-float backdrop-blur-md [animation-delay:-4s]">
          <p className="text-[12.5px] font-semibold leading-tight text-fg">Building modern solutions</p>
          <ul className="mt-3 space-y-2">
            {building.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[12px] text-fg-2">
                <span className="grid size-4 place-items-center rounded-full bg-accent/20">
                  <Check className="size-2.5 text-accent-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Layer>

      {/* Code card: anchored to the medallion's lower-right rim, overlapping it slightly for depth */}
      <div aria-hidden className="pointer-events-none absolute aspect-square" style={medallionBox}>
      <Layer mx={mx} my={my} depth={1.3} className="left-[24%] top-[100%] sm:left-[70%] sm:top-[80%]">
        {/* Scale and tilt live on wrappers: the float animation owns the inner transform. */}
        <div className="origin-top-left scale-[0.68] sm:scale-[0.76] xl:scale-[0.82]">
        <div className="[transform:perspective(1000px)_rotateY(-10deg)_rotate(-3deg)]">
        <div className="animate-float-slow overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d13]/95 shadow-deep backdrop-blur-md">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
            <span className="size-2 rounded-full bg-[#ff5f57]/90" />
            <span className="size-2 rounded-full bg-[#febc2e]/90" />
            <span className="size-2 rounded-full bg-[#28c840]/90" />
            <span className="ml-2 font-mono text-[10.5px] text-[#7d869a]">developer.ts</span>
          </div>
          <pre className="px-4 py-3 font-mono text-[10.5px] leading-[1.7] sm:text-[11.5px]">
            {lines.map((tokens, i) => (
              <span key={i} className="block">
                {tokens.map((t, j) => (
                  <span key={j} className={t.t === "txt" ? undefined : `tk-${t.t}`}>
                    {t.v}
                  </span>
                ))}
                {i === lines.length - 1 && <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-accent-3/80" />}
              </span>
            ))}
          </pre>
        </div>
        </div>
        </div>
      </Layer>
      </div>
    </motion.div>
  );
}
