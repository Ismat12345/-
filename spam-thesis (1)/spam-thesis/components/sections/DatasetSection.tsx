'use client'

import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Shield, Building2, BookOpen } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { DATASET_STATS, SPAM_KEYWORDS, HAM_KEYWORDS } from '@/lib/constants'
import { formatNumber } from '@/lib/utils'

const distData = [
  { name: 'Spam', count: DATASET_STATS.spam, percent: DATASET_STATS.spamPercent, color: '#FF453A' },
  { name: 'Ham', count: DATASET_STATS.ham, percent: DATASET_STATS.hamPercent, color: '#30D158' },
]

interface TooltipItem {
  payload: { count: number; percent: number; name: string }
}

function DistTooltip({ active, payload }: { active?: boolean; payload?: TooltipItem[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="rounded-xl border border-white/10 bg-surface-2 px-4 py-2 text-sm">
      <p className="font-semibold">{d.name}</p>
      <p className="text-white/70">{formatNumber(d.count)} писем</p>
      <p className="text-white/50">{d.percent}%</p>
    </div>
  )
}

const SOURCES = [
  {
    icon: Shield,
    title: 'SpamAssassin Public Corpus',
    desc: '~6 000 писем, 1998–2005, Apache Foundation',
  },
  {
    icon: Building2,
    title: 'Enron Email Dataset',
    desc: '~30 000 писем, корпоративная переписка Enron Corp.',
  },
  {
    icon: BookOpen,
    title: 'Ling-Spam Dataset',
    desc: '~2 893 письма, академический корпус',
  },
]

function WordBar({
  word,
  count,
  max,
  color,
}: {
  word: string
  count: number
  max: number
  color: string
}) {
  const pct = (count / max) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 truncate font-mono text-sm">{word}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-xs text-white/50">
        {formatNumber(count)}
      </span>
    </div>
  )
}

const maxSpam = SPAM_KEYWORDS[0].count
const maxHam = HAM_KEYWORDS[0].count

export default function DatasetSection() {
  return (
    <SectionWrapper id="dataset">
      <SectionTitle
        badge="Данные"
        title="Датасет и"
        highlight="анализ данных"
        subtitle="Исследование проводилось на объединённом датасете из трёх публичных корпусов электронных писем."
        centered
      />

      {/* Статистика */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {/* Общий объём */}
        <GlassCard glow="blue" className="text-center">
          <p className="text-sm text-white/50">Общий объём</p>
          <div className="mt-1 font-mono text-4xl font-bold gradient-text">
            <AnimatedCounter end={DATASET_STATS.total} />
          </div>
          <p className="text-sm text-white/50">писем</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="spam">Spam: {formatNumber(DATASET_STATS.spam)}</Badge>
            <Badge variant="ham">Ham: {formatNumber(DATASET_STATS.ham)}</Badge>
          </div>
          <p className="mt-4 text-xs text-white/30">
            SpamAssassin · Enron · Ling-Spam
          </p>
        </GlassCard>

        {/* Разделение */}
        <GlassCard>
          <p className="mb-4 text-sm text-white/50">Разделение выборки</p>
          <div className="space-y-4">
            <div>
              <ProgressBar
                label="Обучающая выборка (80%)"
                value={80}
                color="#0A84FF"
              />
              <p className="mt-1 text-right font-mono text-xs text-white/40">
                {formatNumber(DATASET_STATS.trainSize)} train
              </p>
            </div>
            <div>
              <ProgressBar
                label="Тестовая выборка (20%)"
                value={20}
                color="#30D158"
              />
              <p className="mt-1 text-right font-mono text-xs text-white/40">
                {formatNumber(DATASET_STATS.testSize)} test
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Характеристики */}
        <GlassCard>
          <p className="mb-4 text-sm text-white/50">Характеристики</p>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span className="text-white/60">Средняя длина</span>
              <span className="font-mono">{DATASET_STATS.avgLength} симв.</span>
            </li>
            <li className="flex justify-between">
              <span className="text-white/60">Уникальных слов</span>
              <span className="font-mono">{formatNumber(DATASET_STATS.uniqueWords)}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-white/60">Признаков TF-IDF</span>
              <span className="font-mono">50,000</span>
            </li>
            <li className="flex justify-between">
              <span className="text-white/60">N-gram диапазон</span>
              <span className="font-mono">(1, 2)</span>
            </li>
          </ul>
        </GlassCard>
      </div>

      {/* Распределение классов */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold">Распределение по классам</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distData} margin={{ top: 16, right: 8, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#9a9aa6" fontSize={12} />
                <YAxis stroke="#9a9aa6" fontSize={12} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<DistTooltip />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} isAnimationActive>
                  {distData.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold">Соотношение классов</h3>
          <div className="relative h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distData}
                  dataKey="percent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  stroke="none"
                  label={({ name, value }: { name?: string; value?: number }) =>
                    `${name} ${value}%`
                  }
                >
                  {distData.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1A1A24',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    color: '#fff',
                  }}
                  formatter={(v: number) => [`${v}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="gradient-text font-mono text-2xl font-bold">
                {formatNumber(DATASET_STATS.total)}
              </span>
              <span className="text-xs text-white/50">писем</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Частотный анализ */}
      <div className="mt-16">
        <SectionTitle badge="Частотный анализ" title="Топ ключевых слов" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="spam">SPAM</Badge>
              <h3 className="font-semibold">Топ-10 слов</h3>
            </div>
            <div className="space-y-2.5">
              {SPAM_KEYWORDS.slice(0, 10).map((w) => (
                <WordBar
                  key={w.word}
                  word={w.word}
                  count={w.count}
                  max={maxSpam}
                  color="#FF453A"
                />
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="ham">HAM</Badge>
              <h3 className="font-semibold">Топ-10 слов</h3>
            </div>
            <div className="space-y-2.5">
              {HAM_KEYWORDS.slice(0, 10).map((w) => (
                <WordBar
                  key={w.word}
                  word={w.word}
                  count={w.count}
                  max={maxHam}
                  color="#30D158"
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Источники */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {SOURCES.map((s) => (
          <GlassCard key={s.title} hover>
            <s.icon className="mb-3 h-7 w-7 text-primary" />
            <h4 className="font-bold">{s.title}</h4>
            <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
            <div className="mt-3">
              <Badge variant="ham">Public</Badge>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
