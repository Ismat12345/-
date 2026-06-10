'use client'

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ROC_DATA, MODEL_METRICS } from '@/lib/constants'

const ROC_KEYS = [
  'Naive Bayes',
  'Logistic Regression',
  'SVM',
  'Random Forest',
  'LSTM',
]

const SERIES = MODEL_METRICS.map((m, i) => ({
  key: ROC_KEYS[i],
  data: ROC_DATA[ROC_KEYS[i]],
  color: m.color,
  short: m.shortName,
  auc: (m.auc / 100).toFixed(3),
}))

const DIAGONAL = [
  { fpr: 0, tpr: 0 },
  { fpr: 1, tpr: 1 },
]

interface TipEntry {
  name?: string
  value?: number
  color?: string
  payload?: { fpr: number }
}

function RocTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: TipEntry[]
}) {
  if (!active || !payload?.length) return null
  const fpr = payload[0]?.payload?.fpr
  return (
    <div className="rounded-xl border border-white/10 bg-surface-2 px-4 py-2 text-sm">
      {typeof fpr === 'number' && (
        <p className="mb-1 font-mono text-xs text-white/50">FPR = {fpr}</p>
      )}
      {payload
        .filter((p) => p.name !== 'Случайный')
        .map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: TPR {p.value}
          </p>
        ))}
    </div>
  )
}

export default function ROCCurveChart() {
  const lstm = SERIES[4]

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 16, right: 24, bottom: 24, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            type="number"
            dataKey="fpr"
            domain={[0, 1]}
            stroke="#9a9aa6"
            fontSize={12}
            allowDuplicatedCategory={false}
            label={{
              value: 'False Positive Rate (FPR)',
              position: 'insideBottom',
              offset: -12,
              fill: '#9a9aa6',
              fontSize: 12,
            }}
          />
          <YAxis
            type="number"
            dataKey="tpr"
            domain={[0, 1]}
            stroke="#9a9aa6"
            fontSize={12}
            label={{
              value: 'True Positive Rate (TPR)',
              angle: -90,
              position: 'insideLeft',
              fill: '#9a9aa6',
              fontSize: 12,
            }}
          />
          <Tooltip content={<RocTooltip />} />
          <Legend />

          {/* Диагональ случайного классификатора */}
          <Line
            data={DIAGONAL}
            dataKey="tpr"
            name="Случайный"
            stroke="#6b6b76"
            strokeDasharray="5 5"
            strokeWidth={1}
            dot={false}
            legendType="plainline"
          />

          {/* Заливка под LSTM */}
          <Area
            data={lstm.data}
            dataKey="tpr"
            name={`${lstm.short} · AUC ${lstm.auc}`}
            stroke={lstm.color}
            strokeWidth={3}
            fill="#30D158"
            fillOpacity={0.05}
            dot={false}
          />

          {/* Остальные модели */}
          {SERIES.slice(0, 4).map((s) => (
            <Line
              key={s.key}
              data={s.data}
              dataKey="tpr"
              name={`${s.short} · AUC ${s.auc}`}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
