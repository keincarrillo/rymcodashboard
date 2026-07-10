interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[var(--hover-bg)] radius-card ${className}`}
    />
  )
}

export function DialSkeleton() {
  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-2 flex flex-col items-center">
      <Skeleton className="h-3 w-16 mb-1" />
      <Skeleton className="h-[90px] w-[90px] rounded-full" />
      <Skeleton className="h-2 w-20 mt-1" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-3">
      <Skeleton className="h-3 w-14 mb-2" />
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-3 w-18" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-[var(--surface-color)] radius-panel border border-[var(--border-color)] p-3">
      <Skeleton className="h-3 w-14 mb-2" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}
