interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[var(--elevated)] ${className}`}
      style={{ animationDuration: "1.5s" }}
    />
  )
}

export function DialSkeleton() {
  return (
    <div className="card p-4 flex flex-col items-center gap-3">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-[90px] w-[90px]" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-18" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}
