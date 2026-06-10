'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  Check,
  X,
  Trophy,
  Cpu,
  Calculator,
  Activity,
  Spline,
  Trees,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { MODEL_METRICS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { ModelMetrics } from '@/lib/types'

/* Маппинг имён иконок (из constants) → компоненты lucide */
const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  Activity,
  Spline,
  Trees,
  BrainCircuit,
}

const METRIC_FIELDS: { key: keyof ModelMetrics; label: string }[] = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1' },
]

type BadgeVariant = 'primary' | 'spam' | 'ham' | 'neutral'

function metricVariant(v: number): BadgeVariant {
  if (v >= 98) return 'ham'
  if (v >= 96) return 'primary'
  return 'neutral'
}

function speedBadge(timeMs: number): { variant: BadgeVariant; label: string } {
  if (timeMs < 100) return { variant: 'ham', label: 'Очень быстро' }
  if (timeMs <= 500) return { variant: 'primary', label: 'Быстро' }
  return { variant: 'neutral', label: 'Умеренно' }
}

const bestIndex = MODEL_METRICS.reduce(
  (best, m, i) => (m.f1 > MODEL_METRICS[best].f1 ? i : best),
  0
)

/* ─── LSTM-архитектура ─── */
const LAYERS = [
  { name: 'Embedding', sub: '50000 → 128', color: '#7C3AED' },
  { name: 'LSTM', sub: '128 units', color: '#2563EB' },
  { name: 'Dropout', sub: '0.5', color: '#D97706' },
  { name: 'Dense', sub: '64 · ReLU', color: '#059669' },
  { name: 'Output', sub: 'Sigmoid', color: '#DC2626' },
]

const TRAINING_PARAMS = [
  ['Optimizer', 'Adam'],
  ['Learning rate', '0.001'],
  ['Batch size', '64'],
  ['Epochs', '10'],
  ['Dropout', '0.5'],
  ['Loss', 'Binary CE'],
  ['Embedding dim', '128'],
  ['LSTM units', '128'],
]

function LstmArchitecture() {
  return (
    <div>
      <div className="flex items-stretch gap-2 overflow-x-auto pb-2">
        {LAYERS.map((layer, i) => (
          <div key={layer.name} className="flex items-center gap-2">
            <div
              className="flex min-w-[110px] flex-col items-center justify-center rounded-xl border p-4 text-center"
              style={{
                backgroundColor: `${layer.color}22`,
                borderColor: `${layer.color}66`,
              }}
            >
              <span className="text-sm font-bold" style={{ color: layer.color }}>
                {layer.name}
              </span>
              <span className="mt-1 font-mono text-xs text-white/60">
                {layer.sub}
              </span>
            </div>
            {i < LAYERS.length - 1 && (
              <motion.div
                animate={{ x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                className="text-primary"
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
        {TRAINING_PARAMS.map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-white/10 bg-surface-2/50 px-3 py-2 text-center"
          >
            <p className="text-xs text-white/40">{k}</p>
            <p className="font-mono text-sm font-medium text-primary">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ModelsSection() {
  const [selected, setSelected] = useState(0)
  const model = MODEL_METRICS[selected]
  const Icon = ICON_MAP[model.icon] ?? Cpu
  const speed = speedBadge(model.timeMs)

  const radarData = [
    { metric: 'Accuracy', value: model.accuracy },
    { metric: 'Precision', value: model.precision },
    { metric: 'Recall', value: model.recall },
    { metric: 'F1', value: model.f1 },
    { metric: 'AUC', value: model.auc },
  ]

  return (
    <SectionWrapper id="models">
      <SectionTitle
        badge="Алгоритмы МО"
        title="5 алгоритмов"
        highlight="машинного обучения"
        subtitle="Каждый алгоритм обучен на одинаковых данных при одинаковых условиях для корректного сравнения производительности."
        centered
      />

      {/* Селектор */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {MODEL_METRICS.map((m, i) => {
          const MIcon = ICON_MAP[m.icon] ?? Cpu
          const isActive = i === selected
          return (
            <button
              key={m.shortName}
              onClick={() => setSelected(i)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'glass-card text-white/60 hover:text-white'
              )}
            >
              <MIcon className="h-4 w-4" />
              {m.shortName}
            </button>
          )
        })}
      </div>

      {/* Деталь модели */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <GlassCard className="overflow-hidden p-0">
            <div className="grid md:grid-cols-[2fr_3fr]">
              {/* Левая часть */}
              <div>
                <div
                  className="p-6"
                  style={{ background: `${model.color}1A` }}
                >
                  <Icon
                    className="animate-float h-20 w-20"
                    style={{ color: model.color }}
                    strokeWidth={1.4}
                  />
                  <h3 className="mt-4 text-2xl font-bold">{model.name}</h3>
                  <div className="mt-2">
                    <Badge variant="primary">{model.shortName}</Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      F1-score
                    </p>
                    <div className="text-5xl font-bold">
                      <AnimatedCounter
                        end={model.f1}
                        suffix="%"
                        decimals={1}
                        className="gradient-text font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-white/70">{model.description}</p>

                  <div className="mt-5">
                    <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ham">
                      <Check className="h-4 w-4" /> Преимущества
                    </p>
                    <ul className="space-y-1.5">
                      {model.pros.map((p) => (
                        <li key={p} className="text-sm text-white/70">
                          • {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-spam">
                      <X className="h-4 w-4" /> Недостатки
                    </p>
                    <ul className="space-y-1.5">
                      {model.cons.map((c) => (
                        <li key={c} className="text-sm text-white/70">
                          • {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="text-sm text-white/50">Скорость обучения:</span>
                    <Badge variant={speed.variant}>
                      {speed.label} · {model.timeMs} мс
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Правая часть */}
              <div className="border-t border-white/5 bg-white/[0.03] md:border-l md:border-t-0">
                <div className="grid grid-cols-2 gap-4 p-6">
                  {METRIC_FIELDS.map((field) => {
                    const value = model[field.key] as number
                    return (
                      <div
                        key={field.key}
                        className="rounded-xl border border-white/10 p-4"
                      >
                        <p className="text-xs text-white/50">{field.label}</p>
                        <div className="my-1 font-mono text-2xl font-bold">
                          <AnimatedCounter end={value} suffix="%" decimals={1} />
                        </div>
                        <ProgressBar
                          value={value}
                          color={model.color}
                          showValue={false}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="p-6 pt-0">
                  <h4 className="mb-2 text-sm font-semibold text-white/70">
                    Профиль модели
                  </h4>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} outerRadius="75%">
                        <PolarGrid stroke="rgba(255,255,255,0.12)" />
                        <PolarAngleAxis
                          dataKey="metric"
                          tick={{ fill: '#9a9aa6', fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[90, 100]}
                          tick={{ fill: '#6b6b76', fontSize: 10 }}
                        />
                        <Radar
                          dataKey="value"
                          stroke={model.color}
                          fill={model.color}
                          fillOpacity={0.15}
                          strokeWidth={2}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#1A1A24',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12,
                            color: '#fff',
                          }}
                          formatter={(v: number) => [`${v}%`, '']}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Сравнительная таблица */}
      <div className="mt-16">
        <SectionTitle badge="Сравнение" title="Сравнение всех моделей" />
        <div className="mt-8 overflow-x-auto">
          <table className="glass-card w-full min-w-[760px] overflow-hidden rounded-2xl text-sm">
            <thead>
              <tr className="bg-white/[0.03] text-xs uppercase tracking-wider text-white/50">
                <th className="px-4 py-3 text-left">Алгоритм</th>
                <th className="px-4 py-3">Accuracy</th>
                <th className="px-4 py-3">Precision</th>
                <th className="px-4 py-3">Recall</th>
                <th className="px-4 py-3">F1</th>
                <th className="px-4 py-3">AUC</th>
                <th className="px-4 py-3">Скорость</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_METRICS.map((m, i) => {
                const isBest = i === bestIndex
                const fast = m.timeMs < 500
                return (
                  <tr
                    key={m.shortName}
                    className={cn(
                      'border-t border-white/5',
                      isBest && 'bg-white/5'
                    )}
                  >
                    <td className="px-4 py-3 text-left">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: m.color }}
                        />
                        <span className="font-medium">{m.name}</span>
                        {isBest && <Trophy className="h-4 w-4 text-yellow-400" />}
                      </span>
                    </td>
                    {([m.accuracy, m.precision, m.recall, m.f1, m.auc] as number[]).map(
                      (v, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          <Badge variant={metricVariant(v)}>{v}%</Badge>
                        </td>
                      )
                    )}
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-white/70">
                        {fast ? '⚡' : '🔄'} {m.timeMs} мс
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Архитектура LSTM */}
      <div className="mt-16">
        <SectionTitle
          badge="Лучшая модель"
          title="Архитектура"
          highlight="LSTM"
        />
        <GlassCard className="mt-8">
          <LstmArchitecture />
        </GlassCard>
      </div>
    </SectionWrapper>
  )
}
