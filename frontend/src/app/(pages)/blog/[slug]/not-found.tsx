import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <FileX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist or has been removed.</p>
        </div>

        <div className="space-y-3">
          <Link href="/blog">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full bg-transparent">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
