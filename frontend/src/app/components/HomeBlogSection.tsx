"use client"

import Link from "next/link"
import { BlogCard } from "../(pages)/blog/components/blog-card"
import { blogApi } from "@/lib/blogApi"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomeBlogSection() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogApi.getBlogs(1, 3)
        setBlogs(res.blogs.filter((blog: any) => blog.isPublished))
      } catch (error) {
        console.error("Error fetching home blogs", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest From Our Blog</h2>
          <Link href="/blogs">
            <Button variant="outline" className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-white">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-muted-foreground">No blog posts available yet</h3>
            <p className="text-sm text-muted-foreground mt-2">Check back later for fresh content</p>
          </div>
        )}
      </div>
    </section>
  )
}
