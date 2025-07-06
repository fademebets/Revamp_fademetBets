import { Suspense } from "react"
import { BlogCard } from "./components/blog-card"
import { blogApi } from "@/lib/blogApi";
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Loading skeleton component
function BlogSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Blog grid component
async function BlogGrid() {
  try {
    const blogsResponse = await blogApi.getBlogs(1, 10)
    const publishedBlogs = blogsResponse.blogs.filter((blog) => blog.isPublished)

    if (publishedBlogs.length === 0) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-muted-foreground">No published blogs found</h3>
          <p className="text-sm text-muted-foreground mt-2">Check back later for new content</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-red-600">Error loading blogs</h3>
        <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
      </div>
    )
  }
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Insights & Stories</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest trends, insights, and stories from our team of experts
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search articles..." className="pl-10 pr-4" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filter & Sort
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Recent Articles</h2>
            <span className="text-sm text-muted-foreground">Showing latest posts</span>
          </div>

          <Suspense fallback={<BlogSkeleton />}>
            <BlogGrid />
          </Suspense>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and never miss our latest insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
