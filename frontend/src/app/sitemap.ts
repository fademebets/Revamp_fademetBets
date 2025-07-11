import type { MetadataRoute } from "next"
import { blogApi } from "@/lib/blogApi"

type SitemapEntry = {
  url: string
  lastModified?: string | Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fademebets.com"
  const lastModified = new Date("2024-01-01")

  // Static routes
  const staticRoutes: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/parley-calc`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ev-calc`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // Dynamic blog routes
  let blogRoutes: SitemapEntry[] = []

   try {
    // ✅ Fetch all published blogs
    const blogs = await blogApi.getAllPublishedBlogs();

    blogRoutes = blogs
      .filter((blog) => blog.isPublished)
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  }  catch (error) {
    console.error("Error fetching blogs for sitemap:", error)
    // Continue with static routes only if blog fetching fails
  }

  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...blogRoutes]

  // Return sorted by priority (highest first), then by lastModified (newest first)
  return allRoutes.sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0)
    if (priorityDiff !== 0) return priorityDiff

    const aDate = new Date(a.lastModified || 0)
    const bDate = new Date(b.lastModified || 0)
    return bDate.getTime() - aDate.getTime()
  })
}
