interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 rounded-lg ${className}`}
    />
  )
}

export function DialSkeleton() {
  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4 flex flex-col items-center">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-[120px] w-[120px] rounded-full" />
      <Skeleton className="h-3 w-32 mt-2" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <Skeleton className="h-4 w-16 mb-3" />
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-[var(--panel-color)] rounded-xl border border-gray-700 p-4">
      <Skeleton className="h-4 w-20 mb-4" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}
