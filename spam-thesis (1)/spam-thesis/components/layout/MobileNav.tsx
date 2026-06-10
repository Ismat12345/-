'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-[#0A0A0F]/95 backdrop-blur-xl md:hidden"
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-end px-6 py-5">
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={onClose}
              className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center gap-6 px-6 pt-12">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-2xl font-semibold text-white/80 transition-colors hover:text-primary"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
