import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"

import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Services - Expert Betting Signals, Tools & Strategies",
  description:
    "Explore the premium services offered by FadeMeBets, including expert betting signals, EV calculators, parlay tools, betting strategies, and more for profitable sports betting.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/services`,
    siteName: "FadeMeBets",
    title: "Services | FadeMeBets",
    description:
      "Discover FadeMeBets’ professional services — expertly curated picks, betting tools, and data-driven strategies designed to help you beat the odds and grow your bankroll.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeMeBets - Expert Betting Services",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  applicationName: "FadeMeBets",
  generator: "Next.js",
  keywords: [
    "betting services",
    "sports betting tools",
    "expert betting picks",
    "EV calculator",
    "parlay calculator",
    "betting tips",
    "data-driven betting",
    "profitable betting strategies",
    "sharp picks",
    "betting insights",
    "sports handicapping tools",
    "FadeMeBets services",
  ],
};



export default function EVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>
    <Navbar />
    {children}

     <JoinCommunitySection/>
    <Footer />
    </section>
}
