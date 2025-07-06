import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react"
import { blogApi } from "@/lib/blogApi";
import type { Blog } from "@/types/blog"
import type { Metadata } from "next"

interface BlogDetailPageProps {
  params: {
    slug: string
  }
}

async function getBlogData(slug: string): Promise<Blog | null> {
  try {
    const blog = await blogApi.getBlogBySlug(slug)
    return blog
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const blog = await getBlogData(params.slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = await getBlogData(params.slug)

  if (!blog || !blog.isPublished) {
    notFound()
  }

  const readingTime = estimateReadingTime(blog.content)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {blog.category}
            </Badge>
            <span className="text-sm text-muted-foreground">•</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">{blog.title}</h1>

          {blog.metaDescription && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">{blog.metaDescription}</p>
          )}

          {/* Author and Date Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-gray-900">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Separator className="mb-8" />
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.featuredImage || "/placeholder.svg"}
              alt={blog.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div
            className="text-gray-700 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="hover:bg-gray-100 cursor-pointer">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator className="mb-8" />

        {/* Article Footer */}
        <footer className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Written by {blog.author}</h3>
              <p className="text-sm text-muted-foreground">
                Published on {formatDate(blog.createdAt)}
                {blog.updatedAt !== blog.createdAt && <span></span>}
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share Article
            </Button>
          </div>
        </footer>

        {/* Schema.org structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.metaDescription,
              image: blog.featuredImage,
              author: {
                "@type": "Person",
                name: blog.author,
              },
              publisher: {
                "@type": "Organization",
                name: "Your Blog Name",
              },
              datePublished: blog.createdAt,
              dateModified: blog.updatedAt,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://yourdomain.com/blog/${blog.slug}`,
              },
            }),
          }}
        />
      </article>

      {/* Related Articles Section */}
      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Continue Reading</h2>
          <div className="text-center">
            <Link href="/blog">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
