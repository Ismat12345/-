'use client'

import { useState } from 'react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { MODEL_METRICS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const AXES: { key: 'accuracy' | 'precision' | 'recall' | 'f1' | 'auc'; label: string }[] = [
  { key: 'accuracy', label: 'Accuracy' },
  { key: 'precision', label: 'Precision' },
  { key: 'recall', label: 'Recall' },
  { key: 'f1', label: 'F1' },
  { key: 'auc', label: 'AUC' },
]

const chartData = AXES.map((axis) => {
  const row: Record<string, string | number> = { metric: axis.label }
  MODEL_METRICS.forEach((m) => {
    row[m.shortName] = m[axis.key]
  })
  return row
})

export default function RadarCompareChart() {
  const [visible, setVisible] = useState<string[]>(
    MODEL_METRICS.map((m) => m.shortName)
  )

  const toggle = (short: string) =>
    setVisible((prev) =>
      prev.includes(short)
        ? prev.filter((s) => s !== short)
        : [...prev, short]
    )

  return (
    <div>
      {/* Чекбоксы моделей */}
      <div className="mb-4 flex flex-wrap gap-2">
        {MODEL_METRICS.map((m) => {
          const on = visible.includes(m.shortName)
          return (
            <button
              key={m.shortName}
              onClick={() => toggle(m.shortName)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all',
                on
                  ? 'border-white/20 text-white'
                  : 'border-white/5 text-white/30'
              )}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: on ? m.color : 'transparent',
                  border: `1px solid ${m.color}`,
                }}
              />
              {m.shortName}
            </button>
          )
        })}
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="72%">
            <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
            />
            <PolarRadiusAxis domain={[94, 100]} tick={false} axisLine={false} />
            {MODEL_METRICS.filter((m) => visible.includes(m.shortName)).map((m) => (
              <Radar
                key={m.shortName}
                name={m.shortName}
                dataKey={m.shortName}
                stroke={m.color}
                fill={m.color}
                fillOpacity={0.05}
                strokeWidth={2}
              />
            ))}
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
  )
}
