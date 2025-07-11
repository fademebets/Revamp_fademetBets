import type React from "react"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import SubscriptionPlan from "@/app/components/subscription-plans"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  title: "Blogs - Expert Betting Strategies & Insights",
  description:
    "Read expert articles, sharp betting insights, and data-driven strategies from the FadeMeBets blog. Stay ahead of the game with the latest tips and analysis.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/blogs`,
    siteName: "FadeMeBets",
    title: "Blog | FadeMeBets",
    description:
      "Explore expert articles, betting insights, and profitable strategies on the FadeMeBets blog — helping sharp bettors make smarter decisions.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeMeBets - Betting Blog",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
  applicationName: "FadeMeBets",
  generator: "Next.js",
  keywords: [
    "betting blog",
    "sports betting insights",
    "betting strategies",
    "expert betting picks",
    "FadeMeBets articles",
    "sports betting advice",
    "betting tips",
    "data-driven sports betting",
    "betting community blog",
  ],
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar />
      {children}
      <SubscriptionPlan />
      <JoinCommunitySection />
      <Footer />
    </section>
  )
}
