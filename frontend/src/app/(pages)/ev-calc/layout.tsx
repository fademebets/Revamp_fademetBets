import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import SubscriptionPlan from "@/app/components/subscription-plans"

import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "EV Calculator - Expected Value Betting Calculator",
  description:
    "Use FadeMeBets' free EV Calculator to calculate the expected value of your bets and make smarter, data-driven betting decisions. Maximize profits and manage risk with precision.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/ev-calc`,
    siteName: "FadeMeBets",
    title: "EV Calculator | FadeMeBets",
    description:
      "Quickly determine the expected value of your bets with our EV Calculator. Optimize your betting strategy and stay sharp with data-backed decisions.",
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
    "EV calculator",
    "expected value calculator",
    "betting EV calculator",
    "sports betting tools",
    "betting profit calculator",
    "EV betting strategy",
    "betting odds calculator",
    "expected value betting",
    "FadeMeBets EV calculator",
    "sports betting profit optimization",
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
