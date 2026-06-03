'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Zap,
  Mail,
  ArrowDown,
  ChevronDown,
  AlertTriangle,
  ShieldCheck,
  Target,
  Cpu,
  Database,
} from 'lucide-react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { DATASET_STATS, MODEL_METRICS } from '@/lib/constants'
import { cn } from '@/lib/utils'

/* ════════════════════════════════════════════════
 *  1. Матричный фон на <canvas>
 * ════════════════════════════════════════════════ */
function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const COLUMNS = 60
    const chars = ['0', '1', '@', '✉', '⚠']

    let width = 0
    let height = 0
    let colWidth = 0
    let fontSize = 16
    let drops: number[] = []
    let speeds: number[] = []

    const setup = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
      colWidth = width / COLUMNS
      fontSize = Math.max(12, Math.min(18, colWidth))
      drops = Array.from({ length: COLUMNS }, () => Math.random() * -height)
      speeds = Array.from({ length: COLUMNS }, () => 1 + Math.random() * 3)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
    }

    setup()

    let raf = 0
    let last = 0
    const interval = 45 // троттлинг ~22 fps, чтобы не нагружать CPU

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (t - last < interval) return
      last = t

      // полупрозрачная заливка создаёт «хвост» падающих символов
      ctx.fillStyle = 'rgba(10, 10, 15, 0.12)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < COLUMNS; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)]
        const isEmail = ch === '@' || ch === '✉' || ch === '⚠'
        ctx.fillStyle = isEmail
          ? 'rgba(48, 209, 88, 0.25)'
          : 'rgba(10, 132, 255, 0.15)'
        ctx.fillText(ch, i * colWidth + colWidth / 2, drops[i])

        drops[i] += speeds[i]
        if (drops[i] > height) {
          drops[i] = Math.random() * -100
          speeds[i] = 1 + Math.random() * 3
        }
      }
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', setup)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  )
}

/* ════════════════════════════════════════════════
 *  Typewriter (без внешних библиотек)
 * ════════════════════════════════════════════════ */
const PHRASES = [
  'Машинное обучение · 5 алгоритмов сравнено',
  'LSTM · SVM · Naive Bayes · Random Forest',
  'Точность до 98.9% · AUC до 0.995',
  'ТАТУ · Факультет Кибербезопасность · 2026',
]

function Typewriter() {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = PHRASES[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % PHRASES.length)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? full.slice(0, prev.length - 1)
              : full.slice(0, prev.length + 1)
          )
        },
        deleting ? 28 : 55
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index])

  return (
    <span className="font-mono text-primary">
      {text}
      <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-primary align-middle" />
    </span>
  )
}

/* ════════════════════════════════════════════════
 *  3. Орбитальная визуализация почты
 * ════════════════════════════════════════════════ */
const BOX = 420
const CENTER = BOX / 2
const RADIUS = 150

const ORBIT = [
  { kind: 'spam' as const, label: 'SPAM', angle: -90 },
  { kind: 'ham' as const, label: 'HAM', angle: 150 },
  { kind: 'spam' as const, label: 'SPAM', angle: 30 },
]

function MiniMail({ kind, label }: { kind: 'spam' | 'ham'; label: string }) {
  const isSpam = kind === 'spam'
  const Icon = isSpam ? AlertTriangle : ShieldCheck
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-md',
        isSpam
          ? 'border-spam/40 bg-spam/10 text-spam'
          : 'border-ham/40 bg-ham/10 text-ham'
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="text-xs font-bold tracking-wide">
        {label}
        {!isSpam && ' ✓'}
      </span>
    </div>
  )
}

function EmailOrbit() {
  const linearLoop = { duration: 20, ease: 'linear' as const, repeat: Infinity }

  return (
    <div
      className="relative mx-auto"
      style={{ width: BOX, height: BOX, maxWidth: '100%' }}
    >
      {/* пульсирующие кольца */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />

      {/* вращающееся кольцо со спицами и карточками */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: 'center' }}
        animate={{ rotate: 360 }}
        transition={linearLoop}
      >
        <svg
          className="absolute inset-0"
          width={BOX}
          height={BOX}
          viewBox={`0 0 ${BOX} ${BOX}`}
          fill="none"
        >
          {ORBIT.map((o) => {
            const rad = (o.angle * Math.PI) / 180
            return (
              <line
                key={o.angle}
                x1={CENTER}
                y1={CENTER}
                x2={CENTER + RADIUS * Math.cos(rad)}
                y2={CENTER + RADIUS * Math.sin(rad)}
                stroke="rgba(10,132,255,0.25)"
                strokeWidth={1.5}
                strokeDasharray="4 6"
              />
            )
          })}
        </svg>

        {ORBIT.map((o, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${o.angle}deg) translateX(${RADIUS}px) rotate(${-o.angle}deg)`,
            }}
          >
            {/* центрирование карточки на точке орбиты (статичный transform) */}
            <div className="-translate-x-1/2 -translate-y-1/2">
              {/* контр-вращение, чтобы текст оставался читаемым */}
              <motion.div animate={{ rotate: -360 }} transition={linearLoop}>
                <MiniMail kind={o.kind} label={o.label} />
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* центральный конверт (не вращается, парит) */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="neon-border animate-float rounded-3xl border border-primary/30 bg-primary/10 p-7 backdrop-blur-md">
          <Mail className="h-[120px] w-[120px] text-primary" strokeWidth={1.2} />
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════
 *  5. Scroll indicator
 * ════════════════════════════════════════════════ */
function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-sm text-white/30">Прокрутите вниз</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          >
            <ChevronDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ════════════════════════════════════════════════
 *  Stats strip
 * ════════════════════════════════════════════════ */
const maxAccuracy = Math.max(...MODEL_METRICS.map((m) => m.accuracy))

const STATS = [
  {
    icon: Mail,
    end: DATASET_STATS.total,
    decimals: 0,
    suffix: '',
    label: 'Писем проанализировано',
  },
  {
    icon: Target,
    end: maxAccuracy,
    decimals: 1,
    suffix: '%',
    label: 'Максимальная точность',
  },
  {
    icon: Cpu,
    end: MODEL_METRICS.length,
    decimals: 0,
    suffix: '',
    label: 'Алгоритмов МО',
  },
  {
    icon: Database,
    end: DATASET_STATS.sources.length,
    decimals: 0,
    suffix: '',
    label: 'Источника данных',
  },
]

function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="glass-card rounded-2xl p-5 text-center">
          <stat.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
          <div className="gradient-text font-mono text-3xl font-bold">
            <AnimatedCounter
              end={stat.end}
              decimals={stat.decimals}
              suffix={stat.suffix}
              className="font-mono"
            />
          </div>
          <p className="mt-1.5 text-sm text-white/50">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════
 *  HERO
 * ════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* Слой 0 — матрица */}
      <MatrixBackground />

      {/* Слой 10 — радиальные градиенты */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div
          className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary blur-[140px]"
          style={{ opacity: 0.15 }}
        />
        <div
          className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-ham blur-[140px]"
          style={{ opacity: 0.15 }}
        />
      </div>

      {/* Слой 20 — контент */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-12 pt-32">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
          {/* Левая колонка — текст */}
          <div>
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Дипломная работа · ТАТУ · 2026
              </span>
            </motion.div>

            <motion.h1
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 text-5xl font-bold leading-tight md:text-7xl"
            >
              <span className="block text-white">Обнаружение</span>
              <span className="gradient-text block">Нежелательных</span>
              <span className="flex items-center gap-3 text-white">
                Писем
                <Mail className="h-10 w-10 text-primary md:h-14 md:w-14" />
              </span>
            </motion.h1>

            <div className="mt-5 min-h-[2rem] text-lg md:text-xl">
              <Typewriter />
            </div>

            <motion.p
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-2xl text-lg text-white/70"
            >
              Сравнительный анализ алгоритмов машинного обучения для
              автоматической классификации электронных писем на спам и нормальную
              переписку. Исследование 33,716 писем из трёх публичных датасетов.
            </motion.p>

            <motion.div
              custom={0.8}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                href="#results"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Смотреть результаты
                <ArrowDown className="h-4 w-4" />
              </motion.a>
              <a
                href="#demo"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur transition-all hover:border-primary/50 hover:bg-white/10"
              >
                Попробовать демо
              </a>
            </motion.div>
          </div>

          {/* Правая колонка — визуализация (скрыта на мобильных) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="hidden md:block"
          >
            <EmailOrbit />
          </motion.div>
        </div>
      </div>

      {/* Слой 20 — статистика */}
      <div className="relative z-20 border-t border-white/5">
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          <StatsStrip />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
