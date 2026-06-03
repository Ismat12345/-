'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ModelMetrics } from '@/lib/types'
import { cn } from '@/lib/utils'

interface MetricsBarChartProps {
  data: ModelMetrics[]
  selectedMetric: string
  onMetricChange: (metric: string) => void
}

const METRIC_BUTTONS: { key: keyof ModelMetrics; label: string }[] = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1' },
  { key: 'auc', label: 'AUC' },
]

export default function MetricsBarChart({
  data,
  selectedMetric,
  onMetricChange,
}: MetricsBarChartProps) {
  const metricKey = selectedMetric as keyof ModelMetrics

  const sorted = [...data].sort(
    (a, b) => (b[metricKey] as number) - (a[metricKey] as number)
  )

  const metricLabel =
    METRIC_BUTTONS.find((m) => m.key === selectedMetric)?.label ?? selectedMetric

  // Custom tooltip с местом в рейтинге
  interface TipPayload {
    payload: ModelMetrics
    value: number
  }
  function CustomTooltip({
    active,
    payload,
  }: {
    active?: boolean
    payload?: TipPayload[]
  }) {
    if (!active || !payload?.length) return null
    const m = payload[0].payload
    const rank = sorted.findIndex((s) => s.shortName === m.shortName) + 1
    return (
      <div className="rounded-xl border border-white/10 bg-surface-2 px-4 py-3 text-sm">
        <p className="font-semibold" style={{ color: m.color }}>
          {m.name}
        </p>
        <p className="text-white/70">
          {metricLabel}: {payload[0].value}%
        </p>
        <p className="text-white/50">Место в рейтинге: #{rank}</p>
      </div>
    )
  }

  // Лейбл «🏆 Best» над лучшим баром (LSTM всегда #1 по любой метрике)
  function bestLabel(props: {
    x?: number
    y?: number
    width?: number
    index?: number
  }) {
    const { x = 0, y = 0, width = 0, index = 0 } = props
    if (sorted[index]?.shortName !== 'LSTM') return <g />
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        fontSize={13}
        fontWeight={600}
        fill="#FBBF24"
      >
        🏆 Best
      </text>
    )
  }

  return (
    <div>
      {/* Переключатель метрик */}
      <div className="mb-6 flex flex-wrap gap-4">
        {METRIC_BUTTONS.map((m) => (
          <button
            key={m.key}
            onClick={() => onMetricChange(m.key)}
            className={cn(
              'border-b-2 pb-1 text-sm font-medium transition-colors',
              selectedMetric === m.key
                ? 'border-primary text-primary'
                : 'border-transparent text-white/50 hover:text-white'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} margin={{ top: 28, right: 8, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="shortName" stroke="#9a9aa6" fontSize={12} />
            <YAxis domain={[94, 100]} stroke="#9a9aa6" fontSize={12} unit="%" />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey={selectedMetric}
              radius={[8, 8, 0, 0]}
              isAnimationActive
              animationBegin={0}
              animationDuration={800}
              label={bestLabel}
            >
              {sorted.map((m) => (
                <Cell key={m.shortName} fill={m.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
