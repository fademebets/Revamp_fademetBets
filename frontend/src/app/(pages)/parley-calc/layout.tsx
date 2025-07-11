import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import SubscriptionPlan from "@/app/components/subscription-plans"
import JoinCommunitySection from "@/app/components/Community"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Parlay Calculator - Calculate Your Parlay Odds & Profits",
  description:
    "Use FadeMeBets' free Parlay Calculator to instantly calculate your parlay odds, potential payouts, and profits. Perfect for sharp bettors managing multi-leg bets.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/parley-calc`,
    siteName: "FadeMeBets",
    title: "Parlay Calculator | FadeMeBets",
    description:
      "Accurately calculate your parlay odds, potential payouts, and profits using our professional-grade Parlay Calculator — designed for sharp bettors.",
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
    "parlay calculator",
    "sports betting calculator",
    "calculate parlay odds",
    "parlay payout calculator",
    "betting tools",
    "multi-leg bet calculator",
    "betting odds calculator",
    "parlay profit estimator",
    "FadeMeBets parlay calculator",
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
     <SubscriptionPlan />
      <JoinCommunitySection/>
    <Footer />
    </section>
}
