'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({
  id,
  children,
  className,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-20 overflow-hidden py-24 md:py-32',
        className
      )}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mx-auto w-full max-w-7xl px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  )
}
