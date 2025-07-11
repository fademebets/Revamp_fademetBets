import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer-section"
import JoinCommunitySection from "@/app/components/Community"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Privacy Policy | FadeMeBets",
  description:
    "Review FadeMeBets' Privacy Policy outlining how we collect, use, protect, and manage your personal data while using our services and betting tools.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/privacy`,
    siteName: "FadeMeBets",
    title: "Privacy Policy | FadeMeBets",
    description:
      "Learn how FadeMeBets collects, uses, and protects your personal information when you use our services, betting tools, and platform features.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeMeBets - Privacy Policy",
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
    "FadeMeBets privacy policy",
    "data protection policy",
    "betting platform privacy",
    "user data policy",
    "sports betting data protection",
    "FadeMeBets personal information policy",
    "betting data privacy",
    "privacy and data handling",
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
