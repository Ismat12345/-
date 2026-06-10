'use client'

import { motion } from 'framer-motion'
import { CONFUSION_MATRIX } from '@/lib/constants'
import { formatNumber } from '@/lib/utils'

const { tp, tn, fp, fn } = CONFUSION_MATRIX
const total = tp + tn + fp + fn

// Производные метрики считаем из самой матрицы (внутренняя согласованность)
const accuracy = ((tp + tn) / total) * 100
const precision = (tp / (tp + fp)) * 100
const recall = (tp / (tp + fn)) * 100
const f1 = (2 * precision * recall) / (precision + recall)

interface CellDef {
  value: number
  title: string
  flow: string
  tone: 'good' | 'bad'
  note?: string
}

// Порядок ячеек 2x2: [TN, FP] / [FN, TP]
const CELLS: CellDef[] = [
  { value: tn, title: 'True Negative', flow: 'Ham → Ham ✓', tone: 'good' },
  {
    value: fp,
    title: 'False Positive',
    flow: 'Ham → Spam ✗',
    tone: 'bad',
    note: 'Ложная тревога — допустимо',
  },
  {
    value: fn,
    title: 'False Negative',
    flow: 'Spam → Ham ✗',
    tone: 'bad',
    note: '⚠️ Критическая ошибка — спам пропущен',
  },
  { value: tp, title: 'True Positive', flow: 'Spam → Spam ✓', tone: 'good' },
]

const DERIVED = [
  { label: 'Accuracy', formula: '(TP+TN) / N', value: accuracy },
  { label: 'Precision', formula: 'TP / (TP+FP)', value: precision },
  { label: 'Recall', formula: 'TP / (TP+FN)', value: recall },
  { label: 'F1', formula: '2·P·R / (P+R)', value: f1 },
]

export default function ConfusionMatrixChart() {
  return (
    <div>
      <div className="flex gap-3">
        {/* подпись оси Y */}
        <div className="flex items-center">
          <span className="rotate-180 text-xs uppercase tracking-wider text-white/40 [writing-mode:vertical-rl]">
            Предсказано
          </span>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-center text-xs uppercase tracking-wider text-white/40">
            Реальный класс
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CELLS.map((cell, i) => (
              <motion.div
                key={cell.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.4 }}
                className={
                  cell.tone === 'good'
                    ? 'rounded-xl border border-ham/40 bg-ham/20 p-4 text-center'
                    : i === 2
                      ? 'rounded-xl border border-spam/40 bg-spam/20 p-4 text-center'
                      : 'rounded-xl border border-spam/20 bg-spam/10 p-4 text-center'
                }
              >
                <div
                  className={
                    cell.tone === 'good'
                      ? 'text-3xl font-bold text-ham'
                      : 'text-3xl font-bold text-spam'
                  }
                >
                  {formatNumber(cell.value)}
                </div>
                <div className="mt-1 text-sm font-medium">{cell.title}</div>
                <div className="mt-0.5 font-mono text-xs text-white/50">
                  {cell.flow}
                </div>
                {cell.note && (
                  <div className="mt-1.5 text-[11px] text-white/40">{cell.note}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Производные метрики */}
      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {DERIVED.map((d) => (
          <div
            key={d.label}
            className="rounded-lg border border-white/10 bg-surface-2/50 p-3 text-center"
          >
            <p className="text-xs text-white/50">{d.label}</p>
            <p className="font-mono text-lg font-bold text-primary">
              {d.value.toFixed(1)}%
            </p>
            <p className="font-mono text-[10px] text-white/30">{d.formula}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
