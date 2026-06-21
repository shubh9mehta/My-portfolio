import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { StakeholderProvider } from "@/context/StakeholderContext";
import GlassNav from "@/components/system/GlassNav";
import LightLeak from "@/components/system/LightLeak";
import TechStackDock from "@/components/system/TechStackDock";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://my-portfolio-mu-eight-60.vercel.app/";

export const viewport: Viewport = {
  themeColor: "#020204",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Shubh Mehta — Data Storyteller | From SQL to ROI",
  description:
    "Shubh Mehta — Data & Business Analyst engineering clarity from chaos. Production SQL, Python automation, and executive dashboards that turn raw data into measurable business value. US-based, open to relocation.",
  keywords: [
    "Data Analyst",
    "Business Analyst",
    "SQL",
    "Python",
    "Tableau",
    "Power BI",
    "GCP",
    "AWS",
    "Machine Learning",
    "Data Science",
    "Portfolio",
  ],
  authors: [{ name: "Shubh Mehta" }],
  robots: "index, follow",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    title: "Shubh Mehta — Data Storyteller | From SQL to ROI",
    description:
      "Engineering clarity from chaos. Production SQL, Python automation, and executive dashboards that move the needle.",
    images: ["/og-image.png"],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubh Mehta — Data Storyteller | From SQL to ROI",
    description:
      "Engineering clarity from chaos. Production SQL, Python automation, and executive dashboards that move the needle.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-obsidian text-white overflow-x-hidden font-sans antialiased`}
      >
        <StakeholderProvider>
          <SmoothScrollProvider>
            {/* Cinematic light-leak following the cursor */}
            <LightLeak />
            <GlassNav />
            {children}
            <TechStackDock />
          </SmoothScrollProvider>
        </StakeholderProvider>
        <Analytics />
      </body>
    </html>
  );
}
