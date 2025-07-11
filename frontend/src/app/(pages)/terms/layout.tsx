import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions for using FadeMeBets, including guidelines for responsible betting, account usage, privacy, and liability limitations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/terms`,
    siteName: "FadeMeBets",
    title: "Terms & Conditions | FadeMeBets",
    description:
      "Read the official terms and conditions governing your use of FadeMeBets services, betting tools, and community features.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeMeBets - Terms & Conditions",
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
    "FadeMeBets terms",
    "terms and conditions",
    "sports betting platform terms",
    "betting terms of service",
    "FadeMeBets legal policy",
    "betting account guidelines",
    "sports betting platform rules",
    "FadeMeBets usage agreement",
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
