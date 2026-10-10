import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title} & ${site.subtitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Rendered once at build time (required for static hosting).
export const dynamic = "force-static";

/** Social preview (LinkedIn, WhatsApp, X…): name, role, stack and portrait. */
export default async function OpengraphImage() {
  const portrait = site.portrait
    ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", site.portrait))).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 56,
          padding: 64,
          background: "radial-gradient(60% 70% at 80% 10%, rgba(108,99,255,0.35), transparent 70%), #07090D",
          color: "#F5F7FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700 }}>
            {site.initials}
            <span style={{ color: "#6C63FF" }}>.</span>
            <span
              style={{
                marginLeft: 20,
                fontSize: 19,
                fontWeight: 400,
                color: "#98A2B3",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 999,
                padding: "8px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: 999, background: "#3CCF91" }} />
              Available for opportunities
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>{site.name}</div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: -0.8,
                marginTop: 12,
                backgroundImage: "linear-gradient(120deg, #9B8CFF, #6C63FF 40%, #4F8CFF)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {`${site.title} · ${site.subtitle}`}
            </div>
            <div style={{ fontSize: 24, color: "#98A2B3", marginTop: 20 }}>{site.tagline}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 20, color: "#98A2B3" }}>
            {["React", "Next.js", "TypeScript", "Node.js", "PHP", "React Native"].map((t) => (
              <span key={t} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "7px 14px" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {portrait && (
          <div
            style={{
              display: "flex",
              width: 380,
              height: 502,
              borderRadius: 32,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 40px 120px -40px rgba(108,99,255,0.6)",
            }}
          >
            <img src={portrait} alt="" width={380} height={502} style={{ objectFit: "cover", objectPosition: "50% 18%" }} />
          </div>
        )}
      </div>
    ),
    size,
  );
}
