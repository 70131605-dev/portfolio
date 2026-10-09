"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" | "section" };

/** Fades content up once when it scrolls into view. */
export function Reveal({ delay = 0, y = 30, as = "div", children, ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Parent for staggered children; pair with <StaggerItem>. */
export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  as = "div",
  ...rest
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number; as?: "div" | "ol" | "ul" }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, as = "div", ...rest }: HTMLMotionProps<"div"> & { as?: "div" | "li" }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp variants={fadeUp} {...rest}>
      {children}
    </Comp>
  );
}

/** Semantic list version of <Stagger> for small items such as tech chips. */
export function StaggerList({
  children,
  stagger = 0.04,
  delay = 0.15,
  ...rest
}: HTMLMotionProps<"ul"> & { stagger?: number; delay?: number }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerLi({ children, ...rest }: HTMLMotionProps<"li">) {
  return (
    <motion.li variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }} {...rest}>
      {children}
    </motion.li>
  );
}

/** Image/visual reveal: a mask wipes open while the content settles. */
export function MaskReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(18% 6% 18% 6% round 24px)", opacity: 0.2, scale: 1.04 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease }}
    >
      {children}
    </motion.div>
  );
}

/** A connector line that draws itself when it enters the viewport. */
export function DrawLine({ className, vertical }: { className?: string; vertical?: boolean }) {
  return (
    <div aria-hidden className={cn("overflow-hidden bg-line", className)}>
      <motion.div
        className={cn(
          "size-full",
          vertical ? "origin-top bg-accent-line-y" : "origin-left bg-accent-line",
        )}
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.8, ease, delay: 0.2 }}
      />
    </div>
  );
}
