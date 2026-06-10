'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import { PREPROCESSING_STEPS, SPAM_KEYWORDS } from '@/lib/constants'
import { cn } from '@/lib/utils'

/* TF-IDF веса для примера спам-письма (топ-10) */
const TFIDF_WEIGHTS = [0.84, 0.72, 0.66, 0.59, 0.55, 0.5, 0.46, 0.42, 0.39, 0.35]
const tfidfData = SPAM_KEYWORDS.slice(0, 10).map((w, i) => ({
  word: w.word,
  tfidf: TFIDF_WEIGHTS[i],
}))

const TFIDF_CONFIG = [
  ['max_features', '50,000'],
  ['ngram_range', '(1, 2)'],
  ['max_df', '0.95'],
  ['min_df', '2'],
  ['sublinear_tf', 'True'],
]

function Pipeline() {
  const [selected, setSelected] = useState(0)
  const step = PREPROCESSING_STEPS[selected]
  const total = PREPROCESSING_STEPS.length

  const num = (i: number) => String(i + 1).padStart(2, '0')

  return (
    <div>
      {/* Шаги */}
      <div className="relative">
        {/* линия-коннектор (только md) */}
        <div className="absolute left-0 right-0 top-5 hidden border-t-2 border-dashed border-white/15 md:block" />

        <div className="relative flex flex-col gap-4 md:flex-row md:justify-between">
          {PREPROCESSING_STEPS.map((s, i) => {
            const state =
              i === selected ? 'active' : i < selected ? 'done' : 'future'
            return (
              <button
                key={s.id}
                onClick={() => setSelected(i)}
                className="flex items-center gap-3 text-left md:w-24 md:flex-col md:items-center md:text-center"
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold transition-all',
                    state === 'active' &&
                      'bg-primary text-white ring-2 ring-primary/50 ring-offset-2 ring-offset-[#0A0A0F]',
                    state === 'done' && 'bg-primary/20 text-primary',
                    state === 'future' && 'bg-surface-2 text-white/40'
                  )}
                >
                  {num(i)}
                </span>
                <span
                  className={cn(
                    'text-xs leading-tight transition-colors',
                    i === selected ? 'text-white' : 'text-white/50'
                  )}
                >
                  {s.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Деталь шага */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard glow="blue" className="p-8">
              <p className="font-mono text-sm text-primary">Шаг {num(selected)}</p>
              <h3 className="mt-1 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 text-white/70">{step.description}</p>

              <div className="mt-6 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-wider text-white/40">
                    Вход
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-spam/20 bg-spam/10 p-3 font-mono text-sm">
                    {step.inputExample}
                  </pre>
                </div>

                <ArrowRight className="mx-auto hidden h-6 w-6 text-primary md:block" />

                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-wider text-white/40">
                    Выход
                  </p>
                  <pre className="overflow-x-auto rounded-lg border border-ham/20 bg-ham/10 p-3 font-mono text-sm text-ham">
                    {step.outputExample}
                  </pre>
                </div>
              </div>

              {/* Навигация */}
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <button
                  onClick={() => setSelected((s) => Math.max(0, s - 1))}
                  disabled={selected === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>

                <span className="font-mono text-sm text-white/50">
                  Шаг {selected + 1} из {total}
                </span>

                <button
                  onClick={() => setSelected((s) => Math.min(total - 1, s + 1))}
                  disabled={selected === total - 1}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Вперёд <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function MethodologySection() {
  return (
    <SectionWrapper id="methodology">
      <SectionTitle
        badge="Методология"
        title="Pipeline"
        highlight="предобработки"
        subtitle="Каждое письмо проходит 7 последовательных этапов очистки и трансформации перед подачей в модели."
      />

      <div className="mt-12">
        <Pipeline />
      </div>

      {/* TF-IDF */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">Векторизация TF-IDF</h3>
          <div className="mt-4 space-y-2">
            <p className="rounded-lg bg-surface-2 px-4 py-3 text-center font-mono text-sm md:text-base">
              TF-IDF(t, d) = TF(t, d) × IDF(t)
            </p>
            <p className="rounded-lg bg-surface-2 px-4 py-3 text-center font-mono text-sm md:text-base">
              IDF(t) = log(N / df(t))
            </p>
          </div>
          <p className="mt-4 text-sm text-white/70">
            <span className="text-primary">TF</span> — частота термина в письме,{' '}
            <span className="text-primary">IDF</span> — обратная частота документа
            (редкие слова получают больший вес). <span className="text-primary">N</span>{' '}
            — общее число писем, <span className="text-primary">df(t)</span> — число
            писем, содержащих термин.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-surface-2/50 p-4 font-mono text-sm">
            {TFIDF_CONFIG.map(([k, v]) => (
              <div key={k} className="flex justify-between py-0.5">
                <span className="text-white/50">{k}</span>
                <span className="text-primary">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold">
            TF-IDF веса · пример спам-письма
          </h3>
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tfidfData}
                layout="vertical"
                margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
              >
                <defs>
                  <linearGradient id="tfidfGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF453A" />
                    <stop offset="100%" stopColor="#0A84FF" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 1]} stroke="#9a9aa6" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="word"
                  stroke="#9a9aa6"
                  fontSize={12}
                  width={70}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    background: '#1A1A24',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#fff',
                  }}
                  formatter={(v: number) => [v, 'TF-IDF']}
                />
                <Bar dataKey="tfidf" fill="url(#tfidfGradient)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  )
}
