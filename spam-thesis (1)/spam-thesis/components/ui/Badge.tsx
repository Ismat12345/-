import { cn } from '@/lib/utils'

type BadgeVariant = 'primary' | 'spam' | 'ham' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-primary/30',
  spam: 'bg-spam/10 text-spam border-spam/30',
  ham: 'bg-ham/10 text-ham border-ham/30',
  neutral: 'bg-white/5 text-white/60 border-white/10',
}

export default function Badge({
  children,
  variant = 'neutral',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
