'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/**
 * Подсвечивает слово/фразу `highlight` внутри `title` градиентом.
 */
function renderTitle(title: string, highlight?: string) {
  if (!highlight) return title

  // Если highlight — подстрока title, подсвечиваем её на месте.
  if (title.includes(highlight)) {
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="gradient-text">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </>
    )
  }

  // Иначе считаем highlight продолжением заголовка и дописываем его.
  return (
    <>
      {title} <span className="gradient-text">{highlight}</span>
    </>
  )
}

export default function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
  centered = false,
}: SectionTitleProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(
        'max-w-3xl',
        centered ? 'mx-auto text-center' : 'text-left'
      )}
    >
      {badge && (
        <motion.div variants={item} className={cn(centered && 'flex justify-center')}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={item}
        className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
      >
        {renderTitle(title, highlight)}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={item}
          className={cn(
            'mt-4 max-w-2xl text-lg text-white/60',
            centered && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
