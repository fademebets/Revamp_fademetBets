import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Login",
  description: "Login to your FadeMeBets account to access expert betting signals, tools, and community insights.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/login`,
    siteName: "FadeMeBets",
    title: "Login | FadeMeBets",
    description: "Access your FadeMeBets account for expert picks and betting tools.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
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



export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
