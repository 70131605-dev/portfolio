import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";
import { Loader } from "@/components/layout/Loader";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${site.name} | ${site.title} & ${site.subtitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "ERP",
    "POS",
    site.location,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLORS.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLORS.light },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: `${site.title}, ${site.subtitle}`,
  url: site.url,
  ...(site.portrait ? { image: new URL(site.portrait, site.url).href } : {}),
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: Object.values(site.socials),
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PHP", "React Native", "REST APIs", "ERP systems", "POS systems"],
};

// Runs before paint: the intro plays once per session, and only when landing on the homepage.
const introScript = `try{var k="intro-seen";if(location.pathname!=="/"||sessionStorage.getItem(k))document.documentElement.classList.add("seen-intro");sessionStorage.setItem(k,"1")}catch(e){document.documentElement.classList.add("seen-intro")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${site.showLoader ? "has-intro" : ""}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {site.showLoader && <script dangerouslySetInnerHTML={{ __html: introScript }} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card-2 focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {site.showLoader && <Loader />}
        {/* Page-wide grain, kept below everything interactive. */}
        <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay" />
        <Providers>
          <Navbar />
          <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
