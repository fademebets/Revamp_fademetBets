import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import localFont from "next/font/local"
import { Toaster } from "sonner"
import { Providers } from "@/provider/providers"

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FadeMeBets - Expert Betting Signals & Data-Driven Picks",
    template: "%s | FadeMeBets - Expert Betting Signals",
  },
  description:
    "FadeMeBets provides expertly curated, data-driven betting signals to help bettors beat the odds and grow their bankroll. Join a sharp, insight-led community turning winning picks into consistent profits.",
  keywords: [
    "betting signals",
    "sports betting",
    "betting tips",
    "data-driven betting",
    "expert picks",
    "betting community",
    "profitable betting",
    "betting strategy",
    "sports predictions",
    "betting analysis",
    "sharp betting",
    "betting odds",
    "bankroll management",
    "betting insights",
    "winning picks",
    "sports handicapping",
    "betting advice",
    "professional betting",
    "betting tools",
    "ev calculator",
    "parlay calculator",
  ],
  authors: [{ name: "FadeMeBets Team" }],
  creator: "FadeMeBets",
  publisher: "FadeMeBets",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "FadeMeBets",
    title: "FadeMeBets - Expert Betting Signals & Data-Driven Picks",
    description:
      "Join our sharp, insight-led community turning winning picks into consistent profits. Get expertly curated, data-driven betting signals.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FadeMeBets - Expert Betting Signals",
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
  alternates: {
    canonical: baseUrl,
  },

  category: "Sports Betting",
  classification: "Sports Betting Platform",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FadeMeBets",
  },
  applicationName: "FadeMeBets",
  generator: "Next.js",
  abstract: "Expert betting signals and data-driven picks for profitable sports betting",

  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Additional meta tags for better SEO */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="worldwide" />
        <meta name="subject" content="Sports Betting, Betting Signals, Expert Picks" />
        <meta name="copyright" content="FadeMeBets" />
        <meta name="designer" content="FadeMeBets Team" />
        <meta name="owner" content="FadeMeBets" />
        <meta name="url" content={baseUrl} />
        <meta name="identifier-URL" content={baseUrl} />
        <meta name="directory" content="submission" />
        <meta name="pagename" content="FadeMeBets" />
        <meta name="category" content="Sports Betting Platform" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subtitle" content="Expert Betting Signals & Data-Driven Picks" />

        {/* Structured data for better search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FadeMeBets",
              description:
                "FadeMeBets provides expertly curated, data-driven betting signals to help bettors beat the odds and grow their bankroll.",
              url: baseUrl,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },

            }),
          }}
        />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FadeMeBets",
              description: "Expert betting signals and data-driven picks for profitable sports betting",
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },

            }),
          }}
        />
      </head>
      <body className={`font-satoshi antialiased`}>
        <Providers>{children}</Providers>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "white",
              border: "1px solid #e5e7eb",
              color: "#374151",
            },
          }}
        />
      </body>
    </html>
  )
}
