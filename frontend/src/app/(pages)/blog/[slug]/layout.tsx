import type React from "react"
import { blogApi } from "@/lib/blogApi"
import type { Metadata } from "next"

const baseUrl = "https://fademebets.com"

// ✅ Fixed: Await params before using its properties
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  // Await the params promise first
  const { slug } = await params

  // Fetch blog post by slug from API
  const blog = await blogApi.getBlogBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Not Found | FadeMeBets",
      description: "This blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${blog.metaTitle} | FadeMeBets Blog`,
    description: blog.metaDescription || "Read expert betting insights on the FadeMeBets blog.",
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `${baseUrl}/blog/${blog.slug}`,
      siteName: "FadeMeBets",
      title: blog.title,
      description: blog.metaDescription,
      images: [
        {
          url: blog.featuredImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: blog.tags || ["betting blog", "FadeMeBets insights"],
  }
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
