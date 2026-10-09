import { useId, type CSSProperties, type ReactNode } from "react";
import type { MockupVariant } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Coded interface previews used until real screenshots are added.
 * Everything is sized in `em` against a container-query font size, so a
 * mockup renders identically (just scaled) at any width.
 */

type Tone = (l: number, a?: number) => string;
const toneFor =
  (h: number): Tone =>
  (l, a = 1) =>
    `hsl(${h} 85% ${l}% / ${a})`;

const URLS: Record<MockupVariant, string> = {
  erp: "app.northwind-erp.com/dashboard",
  pos: "pos.freshmart.store/register",
  web: "horizonstudy.com",
  agri: "greenvalley.farm/plots",
  events: "app.eventflow.io/calendar",
  ai: "careercoach.ai/session",
  inspection: "app.inspectpro.io/inspections",
  jobs: "smartjobs.pk/jobs",
  shop: "iramali.store",
};

export function Mockup({
  variant,
  hue,
  className,
  label,
  chrome = true,
}: {
  variant: MockupVariant;
  hue: number;
  className?: string;
  label?: string;
  chrome?: boolean;
}) {
  const c = toneFor(hue);
  const Body = { erp: Erp, pos: Pos, web: Web, agri: Agri, events: Events, ai: Ai, inspection: Inspection, jobs: Jobs, shop: Shop }[variant];
  return (
    <div
      role="img"
      aria-label={label ?? `Interface preview: ${variant}`}
      className={cn("@container relative overflow-hidden rounded-[14px] border border-white/10 bg-[#0b0f16]", className)}
    >
      <div
        className="relative select-none text-[#c9d1e0]"
        style={{ fontSize: "calc(100cqw / 60)", "--h": hue } as CSSProperties}
      >
        {chrome && (
          <div className="flex h-[2.4em] items-center gap-[0.45em] border-b border-white/[0.06] bg-white/[0.02] px-[0.9em]">
            <i className="size-[0.6em] rounded-full bg-white/15" />
            <i className="size-[0.6em] rounded-full bg-white/15" />
            <i className="size-[0.6em] rounded-full bg-white/15" />
            <div className="mx-auto flex h-[1.5em] w-[40%] items-center justify-center gap-[0.4em] rounded-[0.45em] bg-white/[0.04] text-[0.62em] text-white/40">
              <svg viewBox="0 0 10 12" className="h-[0.9em] w-auto fill-current">
                <path d="M2 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 10 6.5v4A1.5 1.5 0 0 1 8.5 12h-7A1.5 1.5 0 0 1 0 10.5v-4A1.5 1.5 0 0 1 1.5 5H2Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" />
              </svg>
              {URLS[variant]}
            </div>
            <span className="w-[2.2em]" />
          </div>
        )}
        <div className="aspect-[60/35] overflow-hidden">
          <Body c={c} />
        </div>
      </div>
    </div>
  );
}

/* ---------- shared atoms ---------- */

const Txt = ({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) => (
  <span className={cn("block truncate leading-[1.3]", className)} style={style}>
    {children}
  </span>
);

const Bar = ({ w, className, style }: { w: string; className?: string; style?: CSSProperties }) => (
  <i className={cn("block h-[0.45em] rounded-full bg-white/10", className)} style={{ width: w, ...style }} />
);

const Pill = ({ children, color, bg }: { children: ReactNode; color: string; bg: string }) => (
  <span className="inline-flex items-center rounded-full px-[0.6em] py-[0.15em] text-[0.6em] font-medium" style={{ color, background: bg }}>
    {children}
  </span>
);

function SideNav({ c, brand, items, active = 0 }: { c: Tone; brand: string; items: string[]; active?: number }) {
  return (
    <aside className="flex w-[11em] shrink-0 flex-col gap-[0.35em] border-r border-white/[0.06] bg-white/[0.015] p-[0.9em]">
      <div className="mb-[0.9em] flex items-center gap-[0.5em]">
        <i className="size-[1.5em] rounded-[0.4em]" style={{ background: `linear-gradient(135deg, ${c(66)}, ${c(52)})` }} />
        <Txt className="text-[0.72em] font-semibold text-white">{brand}</Txt>
      </div>
      {items.map((it, i) => (
        <div
          key={it}
          className="flex items-center gap-[0.55em] rounded-[0.45em] px-[0.55em] py-[0.45em]"
          style={i === active ? { background: c(60, 0.14), color: "#fff" } : undefined}
        >
          <i className="size-[0.8em] rounded-[0.22em]" style={{ background: i === active ? c(70) : "rgba(255,255,255,0.18)" }} />
          <Txt className="text-[0.64em]">{it}</Txt>
        </div>
      ))}
      <div className="mt-auto rounded-[0.6em] border border-white/[0.06] p-[0.6em]">
        <Txt className="text-[0.56em] text-white/45">Storage</Txt>
        <div className="mt-[0.4em] h-[0.35em] rounded-full bg-white/10">
          <div className="h-full w-[62%] rounded-full" style={{ background: c(64) }} />
        </div>
      </div>
    </aside>
  );
}

/* ---------- ERP ---------- */

function Erp({ c }: { c: Tone }) {
  const fillId = `erp-fill-${useId().replace(/[^\w-]/g, "")}`;
  const kpis = [
    ["Revenue", "$84.2k", "+12.4%"],
    ["Orders", "1,284", "+8.1%"],
    ["Stock value", "$312k", "+2.3%"],
    ["Low stock", "18", "−4"],
  ];
  const rows = [
    ["SKU-2041", "Arabica beans 1kg", "142", "In stock"],
    ["SKU-1187", "Paper cups 12oz", "36", "Low"],
    ["SKU-3302", "Oat milk 1L", "260", "In stock"],
    ["SKU-0954", "Cane sugar 500g", "0", "Reorder"],
  ];
  return (
    <div className="flex h-full">
      <SideNav c={c} brand="Northwind ERP" items={["Dashboard", "Inventory", "Customers", "Purchasing", "Reports", "Settings"]} />
      <div className="flex min-w-0 flex-1 flex-col gap-[0.9em] p-[1.1em]">
        <div className="flex items-center justify-between">
          <div>
            <Txt className="text-[0.95em] font-semibold text-white">Operations overview</Txt>
            <Txt className="text-[0.6em] text-white/40">All branches · Last 30 days</Txt>
          </div>
          <div className="flex items-center gap-[0.5em]">
            <span className="rounded-[0.4em] border border-white/10 px-[0.7em] py-[0.3em] text-[0.58em] text-white/60">Export</span>
            <span className="rounded-[0.4em] px-[0.7em] py-[0.3em] text-[0.58em] text-white" style={{ background: c(60) }}>
              + New order
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[0.6em]">
          {kpis.map(([k, v, d], i) => (
            <div key={k} className="rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.7em]">
              <Txt className="text-[0.56em] text-white/45">{k}</Txt>
              <Txt className="mt-[0.2em] text-[1.05em] font-semibold text-white">{v}</Txt>
              <Txt className="text-[0.54em]" style={{ color: i === 3 ? "#f59e8b" : "#5ee3a8" }}>
                {d}
              </Txt>
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1.7fr_1fr] gap-[0.6em]">
          <div className="flex flex-col rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.7em]">
            <div className="flex justify-between">
              <Txt className="text-[0.62em] font-medium text-white/80">Sales trend</Txt>
              <Txt className="text-[0.54em] text-white/40">Daily</Txt>
            </div>
            <svg viewBox="0 0 200 70" preserveAspectRatio="none" className="mt-[0.4em] w-full flex-1">
              <defs>
                <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={c(64, 0.45)} />
                  <stop offset="1" stopColor={c(64, 0)} />
                </linearGradient>
              </defs>
              {[18, 36, 54].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" />
              ))}
              <path
                d="M0 58 C15 54 22 40 38 42 S62 50 76 36 S100 20 116 28 S140 40 154 22 S182 10 200 14 L200 70 L0 70Z"
                fill={`url(#${fillId})`}
              />
              <path
                d="M0 58 C15 54 22 40 38 42 S62 50 76 36 S100 20 116 28 S140 40 154 22 S182 10 200 14"
                fill="none"
                stroke={c(68)}
                strokeWidth="1.6"
              />
              <circle cx="154" cy="22" r="2.6" fill="#fff" stroke={c(66)} strokeWidth="1.4" />
            </svg>
          </div>
          <div className="flex flex-col rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.7em]">
            <Txt className="text-[0.62em] font-medium text-white/80">By channel</Txt>
            <div className="flex flex-1 items-center gap-[0.8em]">
              <svg viewBox="0 0 36 36" className="w-[45%]">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <circle cx="18" cy="18" r="14" fill="none" stroke={c(64)} strokeWidth="5" strokeDasharray="48 88" transform="rotate(-90 18 18)" />
                <circle cx="18" cy="18" r="14" fill="none" stroke={c(80, 0.7)} strokeWidth="5" strokeDasharray="24 88" strokeDashoffset="-50" transform="rotate(-90 18 18)" />
              </svg>
              <div className="flex flex-col gap-[0.35em]">
                {["Retail 54%", "Online 28%", "B2B 18%"].map((t, i) => (
                  <span key={t} className="flex items-center gap-[0.4em] text-[0.56em] text-white/60">
                    <i className="size-[0.7em] rounded-full" style={{ background: [c(64), c(80, 0.7), "rgba(255,255,255,0.15)"][i] }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[0.6em] border border-white/[0.06] bg-white/[0.025]">
          {rows.map(([sku, name, qty, status], i) => (
            <div key={sku} className={cn("grid grid-cols-[1fr_2.2fr_0.7fr_1fr] items-center px-[0.8em] py-[0.42em] text-[0.58em]", i && "border-t border-white/[0.05]")}>
              <span className="font-mono text-white/40">{sku}</span>
              <span className="truncate text-white/80">{name}</span>
              <span className="text-white/60">{qty}</span>
              <span>
                <Pill
                  color={status === "In stock" ? "#5ee3a8" : status === "Low" ? "#fbd38d" : "#f59e8b"}
                  bg={status === "In stock" ? "rgba(94,227,168,0.12)" : status === "Low" ? "rgba(251,211,141,0.12)" : "rgba(245,158,139,0.12)"}
                >
                  {status}
                </Pill>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- POS ---------- */

function Pos({ c }: { c: Tone }) {
  const products = [
    ["Espresso", "$2.80", 28],
    ["Croissant", "$3.20", 38],
    ["Orange juice", "$3.90", 30],
    ["Greek yogurt", "$2.40", 200],
    ["Sourdough", "$5.60", 25],
    ["Mineral water", "$1.10", 195],
    ["Granola bar", "$1.80", 40],
    ["Iced latte", "$4.20", 22],
    ["Blueberry muffin", "$2.90", 250],
    ["Green tea", "$2.20", 120],
    ["Cheddar 200g", "$4.80", 45],
    ["Almond milk", "$3.10", 35],
  ] as const;
  const cart = [
    ["Iced latte", 2, "$8.40"],
    ["Croissant", 2, "$6.40"],
    ["Sourdough", 1, "$5.60"],
    ["Greek yogurt", 3, "$7.20"],
  ] as const;
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col gap-[0.8em] p-[1em]">
        <div className="flex items-center gap-[0.6em]">
          <div className="flex h-[2em] flex-1 items-center gap-[0.5em] rounded-[0.5em] border border-white/[0.08] bg-white/[0.03] px-[0.7em] text-[0.62em] text-white/40">
            <i className="size-[0.9em] rounded-full border border-white/30" /> Scan barcode or search products…
          </div>
          <span className="flex items-center gap-[0.4em] rounded-full px-[0.8em] py-[0.35em] text-[0.56em] font-medium text-[#fbd38d]" style={{ background: "rgba(251,211,141,0.1)" }}>
            <i className="size-[0.55em] rounded-full bg-[#fbd38d]" /> Offline · 3 queued
          </span>
        </div>
        <div className="flex gap-[0.45em]">
          {["All", "Coffee", "Bakery", "Dairy", "Drinks", "Snacks"].map((t, i) => (
            <span
              key={t}
              className="rounded-full border px-[0.8em] py-[0.25em] text-[0.58em]"
              style={i === 0 ? { background: c(60), borderColor: "transparent", color: "#fff" } : { borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-4 gap-[0.55em]">
          {products.map(([n, p, h]) => (
            <div key={n} className="flex flex-col overflow-hidden rounded-[0.55em] border border-white/[0.06] bg-white/[0.025]">
              <div className="flex-1" style={{ background: `linear-gradient(135deg, hsl(${h} 55% 45% / 0.55), hsl(${h} 55% 25% / 0.25))` }} />
              <div className="px-[0.55em] py-[0.4em]">
                <Txt className="text-[0.56em] text-white/80">{n}</Txt>
                <Txt className="text-[0.56em] font-semibold text-white">{p}</Txt>
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex w-[19em] shrink-0 flex-col border-l border-white/[0.06] bg-white/[0.02] p-[1em]">
        <div className="flex items-center justify-between">
          <Txt className="text-[0.8em] font-semibold text-white">Order #1042</Txt>
          <Txt className="text-[0.56em] text-white/40">Register 2</Txt>
        </div>
        <div className="mt-[0.8em] flex flex-col gap-[0.5em]">
          {cart.map(([n, q, p]) => (
            <div key={n} className="flex items-center gap-[0.6em] rounded-[0.5em] bg-white/[0.03] p-[0.5em]">
              <span className="grid size-[1.6em] place-items-center rounded-[0.35em] bg-white/[0.06] text-[0.56em] text-white/70">{q}×</span>
              <Txt className="flex-1 text-[0.6em] text-white/80">{n}</Txt>
              <Txt className="text-[0.6em] text-white">{p}</Txt>
            </div>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-[0.35em] border-t border-dashed border-white/10 pt-[0.7em] text-[0.6em]">
          <div className="flex justify-between text-white/50">
            <span>Subtotal</span>
            <span>$27.60</span>
          </div>
          <div className="flex justify-between text-white/50">
            <span>Tax (8%)</span>
            <span>$2.21</span>
          </div>
          <div className="mt-[0.2em] flex justify-between text-[1.5em] font-semibold text-white">
            <span>Total</span>
            <span>$29.81</span>
          </div>
        </div>
        <div className="mt-[0.7em] grid grid-cols-3 gap-[0.4em] text-[0.56em]">
          {["Cash", "Card", "Split"].map((t, i) => (
            <span
              key={t}
              className="rounded-[0.5em] border py-[0.5em] text-center"
              style={i === 1 ? { borderColor: c(64), color: "#fff", background: c(60, 0.12) } : { borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-[0.6em] rounded-[0.55em] py-[0.7em] text-center text-[0.7em] font-semibold text-white" style={{ background: `linear-gradient(135deg, ${c(62)}, ${c(52)})` }}>
          Charge $29.81
        </div>
      </aside>
    </div>
  );
}

/* ---------- Web platform ---------- */

function Web({ c }: { c: Tone }) {
  const dest = [
    ["United Kingdom", "140+ universities", 215],
    ["Canada", "96 universities", 0],
    ["Australia", "43 universities", 30],
    ["Germany", "Low tuition", 260],
  ] as const;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-[1.6em] py-[0.9em]">
        <div className="flex items-center gap-[0.5em]">
          <i className="size-[1.3em] rounded-full" style={{ background: `conic-gradient(from 90deg, ${c(66)}, ${c(80)}, ${c(66)})` }} />
          <Txt className="text-[0.75em] font-semibold text-white">Horizon Study</Txt>
        </div>
        <div className="flex gap-[1.4em] text-[0.6em] text-white/55">
          <span>Destinations</span>
          <span>Universities</span>
          <span>Services</span>
          <span>Stories</span>
        </div>
        <span className="rounded-[0.5em] px-[0.9em] py-[0.4em] text-[0.58em] font-medium text-white" style={{ background: c(60) }}>
          Free consultation
        </span>
      </div>
      <div className="grid flex-1 grid-cols-[1.15fr_1fr] gap-[1.4em] px-[1.6em]">
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full border border-white/10 px-[0.8em] py-[0.25em] text-[0.56em] text-white/60">2026 intakes open</span>
          <Txt className="mt-[0.6em] whitespace-normal text-[2em] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            Study at the world&apos;s <span style={{ color: c(74) }}>top universities.</span>
          </Txt>
          <Txt className="mt-[0.7em] whitespace-normal text-[0.66em] leading-[1.5] text-white/55">
            Compare destinations, programs and costs — then apply with expert guidance.
          </Txt>
          <div className="mt-[1em] flex items-center gap-[0.4em] rounded-[0.7em] border border-white/10 bg-white/[0.04] p-[0.35em]">
            {["Country", "Program", "Intake"].map((t) => (
              <span key={t} className="flex-1 rounded-[0.45em] px-[0.6em] py-[0.45em] text-[0.58em] text-white/45">
                {t} ▾
              </span>
            ))}
            <span className="rounded-[0.5em] px-[1em] py-[0.5em] text-[0.58em] font-medium text-white" style={{ background: c(60) }}>
              Search
            </span>
          </div>
        </div>
        <div className="relative my-[0.4em] overflow-hidden rounded-[1em]" style={{ background: `radial-gradient(circle at 70% 30%, ${c(66, 0.55)}, transparent 60%), linear-gradient(160deg, #1b2236, #0f1420)` }}>
          <svg viewBox="0 0 100 100" className="absolute -bottom-[18%] -right-[12%] w-[85%] opacity-80">
            <circle cx="50" cy="50" r="46" fill="none" stroke={c(80, 0.35)} strokeWidth="0.6" />
            <ellipse cx="50" cy="50" rx="20" ry="46" fill="none" stroke={c(80, 0.25)} strokeWidth="0.6" />
            <ellipse cx="50" cy="50" rx="36" ry="46" fill="none" stroke={c(80, 0.18)} strokeWidth="0.6" />
            <line x1="4" x2="96" y1="50" y2="50" stroke={c(80, 0.25)} strokeWidth="0.6" />
            <ellipse cx="50" cy="50" rx="46" ry="18" fill="none" stroke={c(80, 0.18)} strokeWidth="0.6" />
          </svg>
          <div className="absolute left-[1em] top-[1em] rounded-[0.6em] border border-white/10 bg-black/30 p-[0.6em] backdrop-blur">
            <Txt className="text-[0.54em] text-white/50">Visa success rate</Txt>
            <Txt className="text-[1em] font-semibold text-white">96%</Txt>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[0.7em] p-[1.2em] pt-[0.8em]">
        {dest.map(([n, s, h]) => (
          <div key={n} className="overflow-hidden rounded-[0.7em] border border-white/[0.06] bg-white/[0.025]">
            <div className="h-[3.6em]" style={{ background: `linear-gradient(140deg, hsl(${h} 60% 50% / 0.5), hsl(${h} 50% 22% / 0.3))` }} />
            <div className="p-[0.55em]">
              <Txt className="text-[0.62em] font-medium text-white">{n}</Txt>
              <Txt className="text-[0.54em] text-white/45">{s}</Txt>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Agriculture ---------- */

function Agri({ c }: { c: Tone }) {
  const plots = [
    ["P-01", "Wheat", 2.4, 92],
    ["P-02", "Maize", 1.8, 70],
    ["P-03", "Fallow", 1.1, 38],
    ["P-04", "Rice", 3.0, 120],
    ["P-05", "Wheat", 2.0, 92],
    ["P-06", "Cotton", 2.6, 48],
    ["P-07", "Maize", 1.4, 70],
    ["P-08", "Rice", 2.2, 120],
    ["P-09", "Sugarcane", 3.2, 140],
  ] as const;
  const months = [32, 44, 38, 56, 68, 62, 80, 74];
  return (
    <div className="flex h-full">
      <SideNav c={c} brand="Green Valley" items={["Overview", "Plots", "Tasks", "Inventory", "Finance", "Team"]} active={1} />
      <div className="grid min-w-0 flex-1 grid-cols-[1.35fr_1fr] gap-[0.8em] p-[1.1em]">
        <div className="flex min-h-0 flex-col gap-[0.6em]">
          <div className="flex items-end justify-between">
            <div>
              <Txt className="text-[0.95em] font-semibold text-white">Plot map</Txt>
              <Txt className="text-[0.6em] text-white/40">Rabi season 2025 · 22.8 ha</Txt>
            </div>
            <Pill color={c(78)} bg={c(60, 0.14)}>
              Live
            </Pill>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-[0.4em] rounded-[0.7em] border border-white/[0.06] bg-[#0d1410] p-[0.5em]">
            {plots.map(([id, crop, ha, h]) => (
              <div
                key={id}
                className="flex flex-col justify-between rounded-[0.45em] p-[0.5em]"
                style={{
                  background: `repeating-linear-gradient(135deg, hsl(${h} 45% 34% / 0.55) 0 0.4em, hsl(${h} 45% 30% / 0.45) 0.4em 0.8em)`,
                  outline: id === "P-04" ? `1.5px solid ${c(72)}` : undefined,
                }}
              >
                <Txt className="font-mono text-[0.54em] text-white/70">{id}</Txt>
                <div>
                  <Txt className="text-[0.62em] font-medium text-white">{crop}</Txt>
                  <Txt className="text-[0.52em] text-white/55">{ha} ha</Txt>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-[0.6em]">
          <div className="grid grid-cols-2 gap-[0.5em]">
            {[
              ["Active plots", "24"],
              ["Tasks today", "9"],
              ["Est. yield", "82 t"],
              ["Cost / ha", "$410"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[0.55em] border border-white/[0.06] bg-white/[0.025] p-[0.55em]">
                <Txt className="text-[0.54em] text-white/45">{k}</Txt>
                <Txt className="text-[0.95em] font-semibold text-white">{v}</Txt>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.6em]">
            <Txt className="text-[0.6em] font-medium text-white/80">Yield by month</Txt>
            <div className="mt-[0.5em] flex flex-1 items-end gap-[0.35em]">
              {months.map((m, i) => (
                <i key={i} className="flex-1 rounded-t-[0.25em]" style={{ height: `${m}%`, background: i === 6 ? c(66) : c(60, 0.3) }} />
              ))}
            </div>
          </div>
          <div className="rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.6em]">
            {[
              ["Irrigate P-04", true],
              ["Fertilizer — P-02, P-07", true],
              ["Harvest check P-09", false],
            ].map(([t, done]) => (
              <div key={t as string} className="flex items-center gap-[0.5em] py-[0.22em]">
                <i
                  className="grid size-[0.9em] place-items-center rounded-[0.25em] border"
                  style={done ? { background: c(62), borderColor: "transparent" } : { borderColor: "rgba(255,255,255,0.25)" }}
                />
                <Txt className={cn("text-[0.58em]", done ? "text-white/45 line-through" : "text-white/80")}>{t as string}</Txt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Events ---------- */

function Events({ c }: { c: Tone }) {
  const events: Record<number, [string, number]> = {
    3: ["Corporate gala", 0],
    7: ["Wedding · Hall A", 1],
    8: ["Wedding · Hall A", 1],
    12: ["Tech meetup", 2],
    16: ["Product launch", 0],
    21: ["Charity dinner", 2],
    24: ["Wedding · Lawn", 1],
    28: ["Conference D1", 0],
    29: ["Conference D2", 0],
  };
  const tones = [c(66), "#f0a3c8", "#5ee3a8"];
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col p-[1.1em]">
        <div className="mb-[0.8em] flex items-center justify-between">
          <div className="flex items-center gap-[0.8em]">
            <Txt className="text-[1em] font-semibold text-white">October 2025</Txt>
            <span className="flex gap-[0.25em] text-[0.62em] text-white/50">
              <span className="rounded-[0.3em] border border-white/10 px-[0.45em]">‹</span>
              <span className="rounded-[0.3em] border border-white/10 px-[0.45em]">›</span>
            </span>
          </div>
          <div className="flex rounded-[0.5em] border border-white/10 p-[0.15em] text-[0.56em]">
            {["Month", "Week", "List"].map((t, i) => (
              <span key={t} className="rounded-[0.35em] px-[0.8em] py-[0.25em]" style={i === 0 ? { background: c(60, 0.2), color: "#fff" } : { color: "rgba(255,255,255,0.5)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 pb-[0.3em] text-[0.54em] text-white/40">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="px-[0.5em]">
              {d}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-7 grid-rows-5 overflow-hidden rounded-[0.6em] border border-white/[0.06]">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 1;
            const ev = events[day];
            return (
              <div key={i} className={cn("flex min-h-0 flex-col gap-[0.2em] border-white/[0.05] p-[0.35em]", i % 7 && "border-l", i > 6 && "border-t")}>
                <span
                  className={cn("text-[0.54em]", day < 1 || day > 31 ? "text-white/20" : "text-white/55")}
                  style={day === 14 ? { color: "#fff", fontWeight: 600 } : undefined}
                >
                  {day < 1 ? 29 + day : day > 31 ? day - 31 : day}
                </span>
                {ev && (
                  <span
                    className="truncate rounded-[0.3em] px-[0.4em] py-[0.15em] text-[0.5em] text-white"
                    style={{ background: `color-mix(in oklab, ${tones[ev[1]]} 28%, transparent)`, borderLeft: `2px solid ${tones[ev[1]]}` }}
                  >
                    {ev[0]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <aside className="flex w-[17em] shrink-0 flex-col gap-[0.6em] border-l border-white/[0.06] bg-white/[0.02] p-[1em]">
        <Txt className="text-[0.75em] font-semibold text-white">Upcoming</Txt>
        {[
          ["Tech meetup", "Oct 12 · 18:00", "Confirmed", 2],
          ["Product launch", "Oct 16 · 11:00", "Deposit due", 0],
          ["Charity dinner", "Oct 21 · 19:30", "Confirmed", 2],
        ].map(([t, d, s, tone]) => (
          <div key={t as string} className="rounded-[0.6em] border border-white/[0.06] bg-white/[0.025] p-[0.6em]">
            <div className="flex items-center gap-[0.45em]">
              <i className="size-[0.6em] rounded-full" style={{ background: tones[tone as number] }} />
              <Txt className="text-[0.62em] font-medium text-white">{t as string}</Txt>
            </div>
            <Txt className="mt-[0.2em] text-[0.54em] text-white/45">{d as string}</Txt>
            <div className="mt-[0.4em]">
              <Pill color={s === "Confirmed" ? "#5ee3a8" : "#fbd38d"} bg={s === "Confirmed" ? "rgba(94,227,168,0.12)" : "rgba(251,211,141,0.12)"}>
                {s as string}
              </Pill>
            </div>
          </div>
        ))}
        <div className="mt-auto rounded-[0.6em] p-[0.6em]" style={{ background: c(60, 0.12) }}>
          <Txt className="text-[0.56em] text-white/60">This month</Txt>
          <Txt className="text-[0.95em] font-semibold text-white">9 events · $48k</Txt>
        </div>
      </aside>
    </div>
  );
}

/* ---------- AI coach ---------- */

function Ai({ c }: { c: Tone }) {
  return (
    <div className="flex h-full">
      <aside className="flex w-[11em] shrink-0 flex-col gap-[0.35em] border-r border-white/[0.06] bg-white/[0.015] p-[0.9em]">
        <span className="mb-[0.6em] rounded-[0.5em] py-[0.5em] text-center text-[0.6em] font-medium text-white" style={{ background: c(60) }}>
          + New session
        </span>
        {["Move to full-stack", "Salary negotiation", "Portfolio review", "Interview prep"].map((t, i) => (
          <span key={t} className="truncate rounded-[0.45em] px-[0.55em] py-[0.45em] text-[0.6em]" style={i === 0 ? { background: "rgba(255,255,255,0.06)", color: "#fff" } : { color: "rgba(255,255,255,0.5)" }}>
            {t}
          </span>
        ))}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-[0.8em] p-[1.1em]">
        <div className="ml-auto max-w-[78%] rounded-[0.8em] rounded-br-[0.25em] px-[0.8em] py-[0.6em] text-[0.64em] leading-[1.5] text-white" style={{ background: c(58, 0.85) }}>
          I&apos;m a frontend developer with 2 years of React. How do I move into full-stack roles?
        </div>
        <div className="flex max-w-[88%] gap-[0.6em]">
          <i className="mt-[0.2em] size-[1.6em] shrink-0 rounded-full" style={{ background: `conic-gradient(${c(70)}, ${c(85)}, ${c(70)})` }} />
          <div className="rounded-[0.8em] rounded-tl-[0.25em] border border-white/[0.07] bg-white/[0.03] px-[0.8em] py-[0.7em]">
            <Txt className="whitespace-normal text-[0.64em] leading-[1.5] text-white/85">
              Based on your profile, you already cover most of the client side. Focus on three gaps:
            </Txt>
            <div className="mt-[0.5em] flex flex-col gap-[0.3em] text-[0.6em] text-white/70">
              <span>1. Node.js APIs with Express and validation</span>
              <span>2. Relational data modelling with PostgreSQL</span>
              <span>3. Auth, deployment and observability basics</span>
            </div>
            <div className="mt-[0.6em] flex flex-wrap gap-[0.3em]">
              {["Node.js", "PostgreSQL", "Docker", "System design"].map((t) => (
                <Pill key={t} color={c(80)} bg={c(60, 0.14)}>
                  {t}
                </Pill>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-[0.5em] rounded-[0.7em] border border-white/10 bg-white/[0.03] px-[0.8em] py-[0.55em]">
          <Txt className="flex-1 text-[0.6em] text-white/35">Ask a follow-up…</Txt>
          <span className="grid size-[1.6em] place-items-center rounded-[0.45em] text-[0.7em] text-white" style={{ background: c(60) }}>
            ↑
          </span>
        </div>
      </div>
      <aside className="flex w-[16em] shrink-0 flex-col gap-[0.6em] border-l border-white/[0.06] bg-white/[0.02] p-[1em]">
        <Txt className="text-[0.75em] font-semibold text-white">Your roadmap</Txt>
        {[
          ["Node.js fundamentals", 80],
          ["Databases & SQL", 45],
          ["Auth & security", 30],
          ["System design", 12],
        ].map(([t, p]) => (
          <div key={t as string}>
            <div className="flex justify-between text-[0.56em]">
              <span className="text-white/75">{t}</span>
              <span className="text-white/45">{p}%</span>
            </div>
            <div className="mt-[0.3em] h-[0.4em] rounded-full bg-white/[0.07]">
              <div className="h-full rounded-full" style={{ width: `${p}%`, background: `linear-gradient(90deg, ${c(58)}, ${c(72)})` }} />
            </div>
          </div>
        ))}
        <div className="mt-auto rounded-[0.6em] border border-white/[0.06] p-[0.6em]">
          <Txt className="text-[0.54em] text-white/45">Target role</Txt>
          <Txt className="text-[0.72em] font-medium text-white">Full-Stack Engineer</Txt>
          <Bar w="70%" className="mt-[0.4em]" />
        </div>
      </aside>
    </div>
  );
}

/* ---------- Property inspection (web dashboard + field app) ---------- */

function Inspection({ c }: { c: Tone }) {
  const rows = [
    ["INS-1042", "12 Canal View, Block C", "Today 10:30", "In progress"],
    ["INS-1041", "Gulberg Heights, Apt 7B", "Today 14:00", "Scheduled"],
    ["INS-1038", "DHA Phase 6, House 211", "Yesterday", "Report sent"],
    ["INS-1035", "Model Town Office Park", "Mon", "Report sent"],
    ["INS-1031", "Bahria Villas, Plot 48", "Mon", "Issues found"],
  ];
  const tone = (st: string) =>
    st === "In progress" ? ["#fbd38d", "rgba(251,211,141,0.12)"] : st === "Scheduled" ? [c(78), c(60, 0.14)] : st === "Issues found" ? ["#f59e8b", "rgba(245,158,139,0.12)"] : ["#5ee3a8", "rgba(94,227,168,0.12)"];
  return (
    <div className="relative flex h-full">
      <SideNav c={c} brand="InspectPro" items={["Inspections", "Properties", "Inspectors", "Clients", "Reports"]} />
      <div className="flex min-w-0 flex-1 flex-col gap-[0.8em] p-[1.1em] pr-[17em]">
        <div>
          <Txt className="text-[0.95em] font-semibold text-white">Inspections</Txt>
          <Txt className="text-[0.6em] text-white/40">Live updates from 6 inspectors in the field</Txt>
        </div>
        <div className="grid grid-cols-3 gap-[0.5em]">
          {[
            ["Today", "8"],
            ["In progress", "3"],
            ["Reports sent", "126"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[0.55em] border border-white/[0.06] bg-white/[0.025] p-[0.6em]">
              <Txt className="text-[0.54em] text-white/45">{k}</Txt>
              <Txt className="text-[1em] font-semibold text-white">{v}</Txt>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-[0.6em] border border-white/[0.06] bg-white/[0.025]">
          {rows.map(([id, addr, when, st], i) => {
            const [fg, bg] = tone(st);
            return (
              <div key={id} className={cn("grid grid-cols-[0.8fr_2fr_1fr_1fr] items-center px-[0.8em] py-[0.55em] text-[0.58em]", i && "border-t border-white/[0.05]")}>
                <span className="font-mono text-white/40">{id}</span>
                <span className="truncate text-white/80">{addr}</span>
                <span className="text-white/50">{when}</span>
                <span>
                  <Pill color={fg} bg={bg}>
                    {st}
                  </Pill>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Field app on a phone */}
      <div className="absolute bottom-[-1.2em] right-[1.4em] top-[1em] w-[14.5em] rounded-[2em] border-[0.35em] border-[#1c2130] bg-[#0d1119] p-[0.7em] shadow-[0_1.5em_3em_-1em_rgba(0,0,0,0.8)]">
        <div className="mx-auto mb-[0.6em] h-[0.45em] w-[4em] rounded-full bg-white/10" />
        <Txt className="text-[0.55em] text-white/40">INS-1042 · Room 3 of 6</Txt>
        <Txt className="text-[0.85em] font-semibold text-white">Kitchen</Txt>
        <div className="mt-[0.5em] flex flex-col gap-[0.35em]">
          {[
            ["Electrical outlets", true],
            ["Plumbing & leaks", true],
            ["Walls & ceiling", false],
            ["Windows & seals", false],
          ].map(([t, ok]) => (
            <div key={t as string} className="flex items-center gap-[0.45em] rounded-[0.45em] bg-white/[0.04] px-[0.5em] py-[0.4em]">
              <i
                className="grid size-[0.9em] place-items-center rounded-[0.25em] border"
                style={ok ? { background: c(62), borderColor: "transparent" } : { borderColor: "rgba(255,255,255,0.25)" }}
              />
              <Txt className="text-[0.56em] text-white/80">{t as string}</Txt>
            </div>
          ))}
        </div>
        <Txt className="mt-[0.6em] text-[0.54em] text-white/45">Photos</Txt>
        <div className="mt-[0.3em] grid grid-cols-3 gap-[0.3em]">
          {[28, 200, 40].map((h) => (
            <i key={h} className="aspect-square rounded-[0.35em]" style={{ background: `linear-gradient(135deg, hsl(${h} 35% 45% / 0.7), hsl(${h} 30% 22% / 0.6))` }} />
          ))}
        </div>
        <div className="mt-[0.7em] rounded-[0.5em] py-[0.55em] text-center text-[0.6em] font-semibold text-white" style={{ background: c(60) }}>
          Save & sync
        </div>
      </div>
    </div>
  );
}

/* ---------- Job portal ---------- */

function Jobs({ c }: { c: Tone }) {
  const jobs = [
    ["Frontend Developer", "Arbisoft", "Lahore · Hybrid", "PKR 250–350k", 210],
    ["Node.js Engineer", "Systems Ltd", "Remote", "PKR 300–420k", 150],
    ["UI/UX Designer", "Tkxel", "Lahore · On-site", "PKR 180–260k", 330],
    ["QA Automation Engineer", "10Pearls", "Karachi · Hybrid", "PKR 200–280k", 30],
  ] as const;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-[1.4em] py-[0.8em]">
        <div className="flex items-center gap-[0.5em]">
          <i className="size-[1.4em] rounded-[0.4em]" style={{ background: `linear-gradient(135deg, ${c(66)}, ${c(50)})` }} />
          <Txt className="text-[0.75em] font-semibold text-white">SmartJobs</Txt>
        </div>
        <div className="flex gap-[1.3em] text-[0.6em] text-white/55">
          <span className="text-white">Find jobs</span>
          <span>Companies</span>
          <span>My applications</span>
        </div>
        <span className="rounded-[0.5em] border border-white/15 px-[0.8em] py-[0.35em] text-[0.58em] text-white/80">Post a job</span>
      </div>
      <div className="flex gap-[0.5em] px-[1.4em] pt-[0.9em]">
        {["Role, skill or company", "City or remote"].map((t, i) => (
          <span key={t} className={cn("rounded-[0.5em] border border-white/10 bg-white/[0.04] px-[0.8em] py-[0.5em] text-[0.6em] text-white/40", i ? "w-[30%]" : "flex-1")}>
            {t}
          </span>
        ))}
        <span className="rounded-[0.5em] px-[1.2em] py-[0.5em] text-[0.6em] font-medium text-white" style={{ background: c(60) }}>
          Search
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[9em_1fr_14em] gap-[0.8em] p-[1.4em] pt-[0.8em]">
        <div className="flex flex-col gap-[0.6em] text-[0.58em] text-white/60">
          <Txt className="font-semibold text-white/85">Filters</Txt>
          {["Full-time", "Remote", "Hybrid", "Internship"].map((f, i) => (
            <span key={f} className="flex items-center gap-[0.5em]">
              <i className="size-[1em] rounded-[0.25em] border" style={i < 2 ? { background: c(62), borderColor: "transparent" } : { borderColor: "rgba(255,255,255,0.25)" }} />
              {f}
            </span>
          ))}
          <Txt className="mt-[0.4em] font-semibold text-white/85">Experience</Txt>
          <div className="h-[0.35em] rounded-full bg-white/10">
            <div className="h-full w-[55%] rounded-full" style={{ background: c(64) }} />
          </div>
          <Txt className="text-white/40">0 – 3 years</Txt>
        </div>
        <div className="flex min-w-0 flex-col gap-[0.5em]">
          {jobs.map(([role, co, loc, pay, h], i) => (
            <div key={role} className="flex items-center gap-[0.7em] rounded-[0.6em] border bg-white/[0.025] p-[0.6em]" style={{ borderColor: i === 0 ? c(64, 0.6) : "rgba(255,255,255,0.06)" }}>
              <i className="grid size-[2.2em] shrink-0 place-items-center rounded-[0.5em] text-[0.7em] font-bold text-white" style={{ background: `hsl(${h} 55% 45%)` }}>
                {co[0]}
              </i>
              <div className="min-w-0 flex-1">
                <Txt className="text-[0.66em] font-medium text-white">{role}</Txt>
                <Txt className="text-[0.54em] text-white/45">
                  {co} · {loc}
                </Txt>
              </div>
              <Pill color={c(80)} bg={c(60, 0.14)}>
                {pay}
              </Pill>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[0.5em] rounded-[0.7em] border border-white/[0.06] bg-white/[0.02] p-[0.8em]">
          <Txt className="text-[0.68em] font-semibold text-white">Application tracker</Txt>
          {[
            ["Applied", 12, 100],
            ["Shortlisted", 5, 42],
            ["Interview", 2, 18],
            ["Offer", 1, 8],
          ].map(([k, n, w]) => (
            <div key={k as string}>
              <div className="flex justify-between text-[0.56em]">
                <span className="text-white/70">{k}</span>
                <span className="text-white/45">{n}</span>
              </div>
              <div className="mt-[0.25em] h-[0.4em] rounded-full bg-white/[0.07]">
                <div className="h-full rounded-full" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${c(58)}, ${c(72)})` }} />
              </div>
            </div>
          ))}
          <div className="mt-auto rounded-[0.5em] p-[0.55em]" style={{ background: c(60, 0.12) }}>
            <Txt className="text-[0.54em] text-white/60">Next interview</Txt>
            <Txt className="text-[0.66em] font-medium text-white">Thu · 11:00 · Systems Ltd</Txt>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Clothing store ---------- */

function Shop({ c }: { c: Tone }) {
  const products = [
    ["Embroidered Kurta", "PKR 6,450", "345 45% 32%", "345 40% 18%"],
    ["Linen Co-ord Set", "PKR 8,900", "35 35% 62%", "30 30% 38%"],
    ["Chiffon Dupatta", "PKR 2,750", "160 25% 40%", "160 25% 22%"],
    ["Silk Formal Suit", "PKR 14,200", "20 55% 42%", "15 50% 24%"],
  ] as const;
  return (
    <div className="flex h-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-[1.4em] py-[0.8em]">
          <Txt className="font-serif text-[0.95em] tracking-[0.3em] text-white">IRAMALI</Txt>
          <div className="flex gap-[1.3em] text-[0.6em] text-white/55">
            <span className="text-white">New in</span>
            <span>Women</span>
            <span>Formals</span>
            <span>Sale</span>
          </div>
          <span className="text-[0.6em] text-white/70">Bag (3)</span>
        </div>
        <div
          className="relative mx-[1.4em] flex h-[9em] items-center overflow-hidden rounded-[0.8em] px-[1.4em]"
          style={{ background: "linear-gradient(110deg, hsl(345 40% 22%), hsl(20 40% 30%) 60%, hsl(35 40% 45%))" }}
        >
          <div>
            <Txt className="text-[0.56em] uppercase tracking-[0.2em] text-white/70">Eid Collection 2025</Txt>
            <Txt className="mt-[0.2em] text-[1.6em] font-semibold leading-tight text-white">New season, new story.</Txt>
            <span className="mt-[0.6em] inline-block rounded-full bg-white px-[1em] py-[0.35em] text-[0.58em] font-medium text-[#2a1a12]">Shop now</span>
          </div>
          <i className="absolute -right-[2em] top-[-2em] size-[12em] rounded-full bg-white/10" />
        </div>
        <div className="grid flex-1 grid-cols-4 gap-[0.7em] p-[1.4em] pt-[0.9em]">
          {products.map(([n, p, a, b]) => (
            <div key={n} className="flex flex-col">
              <div className="relative flex-1 rounded-[0.6em]" style={{ background: `linear-gradient(170deg, hsl(${a}), hsl(${b}))` }}>
                <i className="absolute left-1/2 top-[18%] h-[60%] w-[42%] -translate-x-1/2 rounded-t-[2em] rounded-b-[0.4em] bg-black/20" />
              </div>
              <Txt className="mt-[0.4em] text-[0.58em] text-white/85">{n}</Txt>
              <Txt className="text-[0.56em] font-semibold text-white">{p}</Txt>
            </div>
          ))}
        </div>
      </div>
      <aside className="flex w-[16em] shrink-0 flex-col gap-[0.55em] border-l border-white/[0.06] bg-white/[0.02] p-[1em]">
        <Txt className="text-[0.75em] font-semibold text-white">Your bag</Txt>
        {products.slice(0, 3).map(([n, p, a, b]) => (
          <div key={n} className="flex items-center gap-[0.5em]">
            <i className="h-[2.6em] w-[2.1em] shrink-0 rounded-[0.35em]" style={{ background: `linear-gradient(170deg, hsl(${a}), hsl(${b}))` }} />
            <div className="min-w-0">
              <Txt className="text-[0.56em] text-white/85">{n}</Txt>
              <Txt className="text-[0.52em] text-white/45">Size M · Qty 1</Txt>
            </div>
            <Txt className="ml-auto text-[0.54em] text-white">{p.replace("PKR ", "")}</Txt>
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-[0.3em] border-t border-dashed border-white/10 pt-[0.6em] text-[0.58em]">
          <div className="flex justify-between text-white/50">
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-[1.3em] font-semibold text-white">
            <span>Total</span>
            <span>PKR 18,100</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[0.4em] rounded-[0.55em] py-[0.65em] text-[0.62em] font-semibold text-white" style={{ background: c(58) }}>
          Secure checkout
        </div>
      </aside>
    </div>
  );
}
