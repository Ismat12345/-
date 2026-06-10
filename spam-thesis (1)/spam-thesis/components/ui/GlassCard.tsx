import { cn } from '@/lib/utils'

type Glow = 'blue' | 'green' | 'red' | 'none'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: Glow
}

const glowStyles: Record<Glow, string> = {
  blue: '0 0 30px rgba(10,132,255,0.15)',
  green: '0 0 30px rgba(48,209,88,0.15)',
  red: '0 0 30px rgba(255,69,58,0.15)',
  none: 'none',
}

export default function GlassCard({
  children,
  className,
  hover = false,
  glow = 'none',
}: GlassCardProps) {
  return (
    <div
      style={glow !== 'none' ? { boxShadow: glowStyles[glow] } : undefined}
      className={cn(
        'glass-card rounded-2xl p-6',
        hover &&
          'transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
        className
      )}
    >
      {children}
    </div>
  )
}
