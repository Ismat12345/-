'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Trophy } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'
import ChartSkeleton from '@/components/ui/ChartSkeleton'
import { MODEL_METRICS } from '@/lib/constants'

// Ленивая загрузка тяжёлых recharts-компонентов со скелетоном
const MetricsBarChart = dynamic(
  () => import('@/components/charts/MetricsBarChart'),
  { ssr: false, loading: () => <ChartSkeleton height={420} /> }
)
const ConfusionMatrixChart = dynamic(
  () => import('@/components/charts/ConfusionMatrixChart'),
  { ssr: false, loading: () => <ChartSkeleton height={320} /> }
)
const ROCCurveChart = dynamic(() => import('@/components/charts/ROCCurveChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height={400} />,
})
const RadarCompareChart = dynamic(
  () => import('@/components/charts/RadarCompareChart'),
  { ssr: false, loading: () => <ChartSkeleton height={440} /> }
)

const best = MODEL_METRICS[MODEL_METRICS.length - 1] // LSTM

const KEY_RESULTS = [
  { label: 'Лучшая точность', value: best.accuracy, decimals: 1, suffix: '%' },
  { label: 'Лучший F1-Score', value: best.f1, decimals: 1, suffix: '%' },
  { label: 'Лучший AUC', value: best.auc / 100, decimals: 3, suffix: '' },
]

export default function ResultsSection() {
  const [selectedMetric, setSelectedMetric] = useState('accuracy')

  return (
    <SectionWrapper id="results">
      <SectionTitle
        badge="Результаты"
        title="Метрики"
        highlight="качества моделей"
        subtitle="Все модели протестированы на независимой тестовой выборке из 6,744 писем. LSTM показал наилучшие результаты по всем метрикам."
        centered
      />

      {/* Key results */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {KEY_RESULTS.map((r) => (
          <GlassCard key={r.label} glow="green" className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-sm text-white/60">
              <Trophy className="h-4 w-4 text-yellow-400" />
              {r.label}
            </div>
            <div className="font-mono text-4xl font-bold gradient-text">
              <AnimatedCounter
                end={r.value}
                decimals={r.decimals}
                suffix={r.suffix}
              />
            </div>
            <div className="mt-3">
              <Badge variant="ham">LSTM Neural Network</Badge>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Bar chart */}
      <div className="mt-16">
        <h3 className="mb-6 text-2xl font-bold">Сравнение точности алгоритмов</h3>
        <GlassCard>
          <MetricsBarChart
            data={MODEL_METRICS}
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </GlassCard>
      </div>

      {/* Confusion + Radar */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h3 className="text-xl font-bold">Матрица ошибок LSTM</h3>
          <p className="mb-5 text-sm text-white/50">
            Тест. выборка: 6,744 письма
          </p>
          <ConfusionMatrixChart />
        </GlassCard>

        <GlassCard>
          <h3 className="mb-5 text-xl font-bold">Многомерное сравнение</h3>
          <RadarCompareChart />
        </GlassCard>
      </div>

      {/* ROC */}
      <div className="mt-16">
        <h3 className="mb-6 text-2xl font-bold">ROC-кривые всех моделей</h3>
        <GlassCard>
          <ROCCurveChart />
        </GlassCard>
      </div>

      {/* Вывод */}
      <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-ham/10 p-8">
        <Trophy className="h-12 w-12 text-yellow-400" />
        <h3 className="mt-4 text-2xl font-bold">Результат исследования</h3>
        <p className="mt-3 max-w-3xl text-white/70">
          Алгоритм LSTM Neural Network показал наилучшие результаты среди всех
          исследованных подходов. Достигнута точность 98.9% при AUC = 0.995 на
          тестовой выборке из 6,744 писем. Модель рекомендуется для внедрения в
          production-системы фильтрации электронной почты.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Badge variant="ham">F1: 98.8%</Badge>
          <Badge variant="ham">AUC: 0.995</Badge>
          <Badge variant="primary">Rank: #1</Badge>
        </div>
      </div>
    </SectionWrapper>
  )
}
