import { cn } from "@/lib/utils"

interface LegendItem {
  color: string
  label: string
}

interface DotLegendProps {
  items: LegendItem[]
  className?: string
}

export function DotLegend({ items, className }: DotLegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
