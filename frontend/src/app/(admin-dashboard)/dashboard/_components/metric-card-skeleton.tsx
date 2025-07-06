import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-16 sm:h-8 sm:w-20" />
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-3 w-32 sm:h-4 sm:w-40" />
        </div>
      </CardContent>
    </Card>
  )
}
