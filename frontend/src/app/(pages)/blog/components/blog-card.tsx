import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, User } from "lucide-react"
import type { Blog } from "@/types/blog"

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength) + "..."
  }

  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <div className="relative overflow-hidden">
          <Image
            src={blog.featuredImage || "/placeholder.svg?height=200&width=400"}
            alt={blog.title}
            width={400}
            height={200}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {blog.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {truncateContent(blog.metaDescription || blog.content)}
          </p>

          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {blog.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{blog.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
