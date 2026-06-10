'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  label?: string
  showValue?: boolean
  animated?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  color = '#0A84FF',
  label,
  showValue = true,
  animated = true,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="text-white/60">{label}</span>}
          {showValue && (
            <span className="font-mono font-medium text-white/80">
              {Number.isInteger(value) ? value : value.toFixed(1)}
              {max === 100 ? '%' : ` / ${max}`}
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={animated ? { width: 0 } : { width: `${pct}%` }}
          animate={animated && inView ? { width: `${pct}%` } : undefined}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
        />
      </div>
    </div>
  )
}
