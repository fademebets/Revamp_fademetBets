import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import SubscriptionPlan from "@/app/components/subscription-plans"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "About Us - Expert Betting Signals & Data-Driven Picks",
  description:
    "Learn about FadeMeBets — the expert team behind data-driven betting signals and tools designed to help bettors grow their bankroll and beat the odds.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/about`,
    siteName: "FadeMeBets",
    title: "About Us | FadeMeBets",
    description:
      "Discover the mission and story behind FadeMeBets, a sharp, insight-led community delivering profitable, data-backed betting signals and tools.",
    
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
