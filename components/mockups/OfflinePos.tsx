"use client";

import { motion } from "motion/react";
import { CircleCheck, CloudOff, ReceiptText, Search, ShoppingBasket } from "lucide-react";
import { useId } from "react";

/**
 * Case-study visual: a POS register in offline mode with a floating receipt
 * that syncs when the connection returns. Sized in `em` against a container
 * query, so it scales as one piece at any width. Dark in both themes, like a
 * real screenshot.
 */
const products: [string, string, number][] = [
  ["Milk 1L", "Rs 220", 160],
  ["Bread", "Rs 150", 200],
  ["Eggs (12)", "Rs 380", 160],
  ["Rice 5kg", "Rs 1,850", 200],
  ["Tea 450g", "Rs 690", 160],
  ["Sugar 1kg", "Rs 160", 200],
  ["Cooking Oil", "Rs 590", 160],
  ["Biscuits", "Rs 120", 200],
];
const sale: [string, string, string][] = [
  ["2×", "Milk 1L", "440"],
  ["1×", "Rice 5kg", "1,850"],
  ["3×", "Biscuits", "360"],
  ["1×", "Tea 450g", "690"],
];

const ease = [0.22, 1, 0.36, 1] as const;

export function OfflinePos({ className }: { className?: string }) {
  const gid = useId().replace(/[^\w-]/g, "");
  return (
    <div className={`@container ${className ?? ""}`} role="img" aria-label="Point-of-sale register billing in offline mode, with a receipt synced when back online">
      <div className="relative select-none pb-[10%] pt-[7%] text-[#c9d1e0]" style={{ fontSize: "calc(100cqw / 44)" }}>
        {/* Register window */}
        <div className="relative w-[86%] overflow-hidden rounded-[1.1em] border border-white/10 bg-[#0d1118] shadow-deep">
          <div className="flex items-center gap-[0.45em] border-b border-white/[0.06] px-[1em] py-[0.7em]">
            <i className="size-[0.6em] rounded-full bg-[#ff5f57]" />
            <i className="size-[0.6em] rounded-full bg-[#febc2e]" />
            <i className="size-[0.6em] rounded-full bg-[#28c840]" />
            <span className="ml-[0.6em] text-[0.62em] text-white/40">POS · Counter 1</span>
            <span className="ml-auto flex items-center gap-[0.35em] rounded-full bg-[#fbbf24]/10 px-[0.6em] py-[0.2em] text-[0.55em] text-[#fbbf24]/80">
              <CloudOff className="size-[1em]" /> Offline · saving locally
            </span>
          </div>
          <div className="grid grid-cols-[1fr_12em]">
            <div className="flex flex-col gap-[0.8em] p-[1em]">
              <div className="flex items-center gap-[0.5em] rounded-[0.5em] border border-white/[0.08] bg-white/[0.03] px-[0.7em] py-[0.5em]">
                <Search className="size-[0.9em] text-white/35" />
                <i className="h-[0.35em] w-[45%] rounded-full bg-white/10" />
                <span className="ml-auto text-[0.52em] text-white/40">Scan barcode</span>
              </div>
              <div className="grid grid-cols-4 gap-[0.55em]">
                {products.map(([n, p, h]) => (
                  <div key={n} className="rounded-[0.55em] border border-white/[0.06] bg-white/[0.025] p-[0.45em]">
                    <div className="grid h-[2.6em] place-items-center rounded-[0.4em]" style={{ background: `linear-gradient(135deg, hsl(${h} 35% 30% / 0.7), hsl(${h} 35% 20% / 0.5))` }}>
                      <ShoppingBasket className="size-[1em]" style={{ color: `hsl(${h} 70% 70%)` }} />
                    </div>
                    <p className="mt-[0.45em] truncate text-[0.58em] font-medium text-white/85">{n}</p>
                    <p className="text-[0.52em] text-white/40">{p}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[0.6em] border border-white/[0.06] bg-white/[0.02] p-[0.7em]">
                <div className="flex justify-between text-[0.58em]">
                  <span className="font-medium text-white/80">Today&apos;s sales</span>
                  <span className="text-[#4ade80]/80">Synced</span>
                </div>
                <svg viewBox="0 0 200 50" className="mt-[0.4em] h-[5.5em] w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`pos-${gid}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#4ade80" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#4ade80" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 44 C20 40 30 32 50 33 S80 38 100 30 S140 20 160 22 S185 12 200 10 L200 50 L0 50Z" fill={`url(#pos-${gid})`} />
                  <motion.path
                    d="M0 44 C20 40 30 32 50 33 S80 38 100 30 S140 20 160 22 S185 12 200 10"
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease }}
                  />
                </svg>
              </div>
            </div>
            <aside className="border-l border-white/[0.06] p-[1em]">
              <p className="text-[0.65em] font-semibold text-white">Current sale</p>
              <ul className="mt-[0.6em] divide-y divide-white/[0.05]">
                {sale.map(([q, n, p]) => (
                  <li key={n} className="flex items-center gap-[0.5em] py-[0.5em] text-[0.56em]">
                    <span className="text-white/40">{q}</span>
                    <span className="text-white/85">{n}</span>
                    <span className="ml-auto text-white/45">{p}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        {/* Offline badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="absolute left-[-2%] top-0 flex items-center gap-[0.6em] rounded-[0.8em] border border-[#fbbf24]/40 bg-[#1a1608]/95 px-[1em] py-[0.6em] text-[0.95em] text-[#fcd34d] shadow-float backdrop-blur"
        >
          <CloudOff className="size-[1.1em]" strokeWidth={1.8} />
          Offline mode · billing continues
        </motion.div>

        {/* Receipt */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="absolute bottom-0 right-0 w-[33%] rounded-[1.2em] border border-white/10 bg-[#141821]/95 p-[1.2em] shadow-deep backdrop-blur"
        >
          <div className="flex items-center gap-[0.5em]">
            <ReceiptText className="size-[1.2em] text-white/80" strokeWidth={1.7} />
            <span className="text-[0.95em] font-semibold text-white">Receipt</span>
            <span className="ml-auto text-[0.85em] font-semibold text-white/45">#2187</span>
          </div>
          <div className="mt-[1em] space-y-[0.6em]">
            {[78, 62, 70].map((w) => (
              <div key={w} className="flex gap-[1em]">
                <i className="h-[0.45em] rounded-full bg-white/[0.12]" style={{ width: `${w}%` }} />
                <i className="ml-auto h-[0.45em] w-[15%] rounded-full bg-white/[0.08]" />
              </div>
            ))}
          </div>
          <div className="mt-[1em] flex items-baseline justify-between border-t border-dashed border-white/15 pt-[0.8em]">
            <span className="text-[0.8em] text-white/50">Total</span>
            <span className="text-[1em] font-semibold text-white">Rs 3,340</span>
          </div>
          <div className="mt-[0.8em] flex items-center gap-[0.5em] rounded-[0.6em] bg-[#4ade80]/10 px-[0.7em] py-[0.6em] text-[0.8em] leading-snug text-[#4ade80]">
            <CircleCheck className="size-[1.2em] shrink-0" strokeWidth={1.8} />
            Synced when back online
          </div>
        </motion.div>
      </div>
    </div>
  );
}
