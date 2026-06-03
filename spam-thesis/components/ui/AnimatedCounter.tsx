'use client'

import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const count = useMotionValue(0)
  const text = useTransform(count, (latest) => {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(latest)
    return `${prefix}${formatted}${suffix}`
  })

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, end, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, end, duration, count])

  return (
    <motion.span ref={ref} className={className ?? 'font-mono'}>
      {text}
    </motion.span>
  )
}
