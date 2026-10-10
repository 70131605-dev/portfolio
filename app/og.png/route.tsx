import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social preview card (WhatsApp, LinkedIn, X…), served as /og.png.
 * A real `.png` path matters: static hosts send extensionless files as
 * application/octet-stream, which link previews refuse to show.
 */
export const dynamic = "force-static";

const W = 1200;
const H = 630;
const stack = ["React", "Next.js", "Node.js", "PHP", "React Native"];

export async function GET() {
  const root = process.cwd();
  const [semibold, bold] = await Promise.all([
    readFile(join(root, "assets/fonts/Geist-600.ttf")),
    readFile(join(root, "assets/fonts/Geist-700.ttf")),
  ]);
  // Satori can't decode WebP, so hand it a PNG of the cut-out portrait.
  const portrait = site.portraitCutout
    ? `data:image/png;base64,${(await sharp(join(root, "public", site.portraitCutout)).resize({ width: 560 }).png().toBuffer()).toString("base64")}`
    : null;

  const [first, ...rest] = site.name.split(" ");
  const host = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#07090D",
          color: "#F5F7FA",
          fontFamily: "Geist",
          overflow: "hidden",
        }}
      >
        {/* Glows */}
        <div style={{ position: "absolute", right: -160, top: -120, width: 820, height: 820, display: "flex", background: "radial-gradient(circle, rgba(108,99,255,0.32), rgba(108,99,255,0) 62%)" }} />
        <div style={{ position: "absolute", left: -220, bottom: -260, width: 640, height: 640, display: "flex", background: "radial-gradient(circle, rgba(79,140,255,0.14), rgba(79,140,255,0) 65%)" }} />

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 58px 80px", width: 760, height: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.04)",
              fontSize: 22,
              fontWeight: 600,
              color: "#B6BECC",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: 999, background: "#3CCF91", boxShadow: "0 0 12px #3CCF91" }} />
            Available for opportunities
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -4.5 }}>
            <span>{first}</span>
            <span
              style={{
                marginTop: 8,
                backgroundImage: "linear-gradient(100deg, #9B8CFF 0%, #6C63FF 45%, #4F8CFF 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {`${rest.join(" ")}.`}
            </span>
          </div>

          <div style={{ display: "flex", marginTop: 34, fontSize: 30, fontWeight: 600, letterSpacing: -0.6 }}>
            {`${site.title} & ${site.subtitle}`}
          </div>
          <div style={{ display: "flex", marginTop: 16, fontSize: 25, fontWeight: 600, color: "#98A2B3" }}>{stack.join(" · ")}</div>

          <div style={{ display: "flex", marginTop: "auto", fontSize: 22, fontWeight: 600, color: "#7C8597" }}>{host}</div>
        </div>

        {/* Portrait in a glowing ring */}
        <div style={{ position: "absolute", right: 58, top: 82, width: 450, height: 450, display: "flex" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 450,
              height: 450,
              display: "flex",
              borderRadius: 999,
              background: "radial-gradient(circle at 50% 38%, #2C2A63 0%, #1A1A3E 55%, #10132A 100%)",
              border: "3px solid rgba(155,140,255,0.85)",
              boxShadow: "0 0 60px rgba(108,99,255,0.55), inset 0 0 40px rgba(108,99,255,0.25)",
            }}
          />
          {portrait && (
            // Head and shoulders inside the ring; the torso runs off the card's bottom edge.
            <img src={portrait} alt="" width={470} height={584} style={{ position: "absolute", left: -10, top: 30 }} />
          )}
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
