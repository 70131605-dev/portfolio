"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * Cut-out portrait on a circular "medallion" (glow, rings, disc, ripples).
 *
 * - `fit="contain"`: the photo is clipped to the circle — nothing renders
 *   outside it, like a round profile picture.
 * - `fit="overflow"`: the head sits in the disc while the shoulders and
 *   torso come forward over its lower edge and fade out.
 *
 * Fills its (square) parent: the parent's width is the disc's diameter, so
 * position and size it from outside. Person geometry is in diameter units.
 */
export type MedallionFit = "contain" | "overflow";

const PERSON: Record<MedallionFit, { width: number; top: number }> = {
  contain: { width: 0.94, top: 0.1 },
  overflow: { width: 1.1, top: 0.05 },
};
/** Intrinsic aspect ratio (width / height) of the cut-out image. */
const ASPECT = 547 / 680;

/** Outer ring sizes as multiples of the disc diameter; the hero orbits icons on ORBIT. */
export const MEDALLION_ORBIT = 1.18;
const OUTER_RING = 1.36;

const pct = (n: number) => `${(n * 100).toFixed(2)}%`;
const ringInset = (scale: number) => pct(-(scale - 1) / 2);

export function PortraitMedallion({ src, alt, fit = "contain" }: { src: string; alt: string; fit?: MedallionFit }) {
  const person = PERSON[fit];

  const photo = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      className={fit === "overflow" ? "absolute [mask-image:linear-gradient(to_bottom,#000_64%,transparent_97%)]" : "absolute"}
      style={{ width: pct(person.width), left: pct((1 - person.width) / 2), top: pct(person.top), aspectRatio: ASPECT }}
    >
      <Image src={src} alt={alt} fill priority quality={95} sizes="(min-width: 1024px) 460px, 80vw" className="object-contain object-top" />
    </motion.div>
  );

  return (
    <div className="relative size-full">
      {/* Warm glow */}
      <div aria-hidden className="absolute -inset-[20%] rounded-full bg-[radial-gradient(circle,var(--disc-glow)_0%,transparent_64%)]" />
      {/* Concentric outer rings (the inner one is the icon orbit) */}
      <div aria-hidden className="absolute rounded-full border border-[var(--disc-edge)] opacity-35" style={{ inset: ringInset(OUTER_RING) }} />
      <div aria-hidden className="absolute rounded-full border border-dashed border-[var(--disc-edge)] opacity-70" style={{ inset: ringInset(MEDALLION_ORBIT) }} />

      {/* Disc. In "contain" mode it also clips the photo. */}
      <div className="absolute inset-0 isolate overflow-hidden rounded-full bg-[image:var(--disc)] shadow-[0_30px_80px_-40px_var(--disc-glow)]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_50%,transparent_0,transparent_5.5%,var(--disc-ripple)_5.8%,transparent_6.4%)] [mask-image:radial-gradient(circle,transparent_38%,#000_72%,transparent_100%)]"
        />
        {fit === "contain" && (
          <>
            {photo}
            {/* Soft shading so the photo sits *in* the disc */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[var(--disc-inner)] to-transparent" />
          </>
        )}
      </div>

      {/* Crisp rim */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[var(--disc-edge)] shadow-[inset_0_2px_30px_var(--disc-inner)]" />

      {fit === "overflow" && photo}
    </div>
  );
}
