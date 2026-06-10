import { cn } from '@/lib/utils'

interface ChartSkeletonProps {
  height?: number
  className?: string
}

export default function ChartSkeleton({
  height = 350,
  className,
}: ChartSkeletonProps) {
  return (
    <div
      className={cn('w-full animate-pulse rounded-2xl bg-white/5', className)}
      style={{ height }}
      aria-hidden="true"
    />
  )
}
