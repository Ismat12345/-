'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Shield, Menu, Sun, Moon, ArrowDown } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // backdrop при скролле
  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scrollspy — подсветка активной секции
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace('#', ''))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        )}
      >
        {/* progress bar прокрутки */}
        <motion.div
          className="absolute inset-x-0 top-0 h-0.5 origin-left"
          style={{
            scaleX: progress,
            background: 'linear-gradient(90deg, #0A84FF, #30D158)',
          }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Лого */}
          <a href="#hero" className="flex items-center gap-2.5">
            <Shield className="h-7 w-7 text-primary" />
            <span className="flex flex-col leading-none">
              <span className="gradient-text text-lg font-bold">SpamGuard</span>
              <span className="text-xs text-white/40">Дипломная работа · ТАТУ 2026</span>
            </span>
          </a>

          {/* Навигация */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById(item.href.slice(1))
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'text-sm transition-colors',
                  active === item.href
                    ? 'text-primary'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Действия */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                type="button"
                aria-label="Переключить тему"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <a
              href="#demo"
              className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark sm:inline-flex"
            >
              Демо <ArrowDown className="h-4 w-4" />
            </a>

            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
