import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BlogDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" className="flex items-center gap-2" disabled>
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </nav>

      {/* Content Loading */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <span className="text-sm text-muted-foreground">•</span>
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-6" />

          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-6" />

          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </header>

        {/* Image Skeleton */}
        <Skeleton className="w-full h-64 md:h-96 rounded-lg mb-8" />

        {/* Content Skeleton */}
        <div className="space-y-4 mb-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Tags Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-5 w-12 mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </article>
    </div>
  )
}
