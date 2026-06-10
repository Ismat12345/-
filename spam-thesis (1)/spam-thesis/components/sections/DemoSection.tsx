'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Sparkles,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { classifyEmail, SPAM_FEATURE_SET } from '@/lib/spamClassifier'
import type { DemoResult } from '@/lib/types'

const EXAMPLES = [
  {
    title: '💰 Спам: приз',
    text: 'Congratulations! You have been SELECTED as our weekly WINNER!!! Claim your FREE prize of $5,000 IMMEDIATELY. Click here NOW. Limited time offer ONLY for you!',
  },
  {
    title: '📧 Нормальное',
    text: "Hi Sarah, I wanted to follow up on our project discussion from Tuesday's meeting. Please review the attached report and let me know your thoughts. Best regards, John",
  },
  {
    title: '🎰 Спам: казино',
    text: 'EXCLUSIVE casino bonus just for you! Get 500% deposit bonus + FREE spins guaranteed! Claim your money NOW, this exclusive discount expires tonight! Subscribe to win!',
  },
  {
    title: '💼 Нормальное',
    text: 'Dear team, the quarterly budget review is scheduled for Thursday at 2 PM. Please come prepared with your department updates and Q4 forecast. Agenda is attached. Thanks, David',
  },
]

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function DemoSection() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState<DemoResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeExample, setActiveExample] = useState<number | null>(null)

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0

  const analyze = async (text: string) => {
    if (text.trim().length < 10) return
    setIsAnalyzing(true)
    setResult(null)
    await sleep(800)
    setResult(classifyEmail(text))
    setIsAnalyzing(false)
  }

  const pickExample = (i: number) => {
    setInputText(EXAMPLES[i].text)
    setActiveExample(i)
    analyze(EXAMPLES[i].text)
  }

  const isSpam = result?.label === 'spam'

  return (
    <SectionWrapper id="demo">
      <SectionTitle
        badge="Live Demo"
        title="Попробуй"
        highlight="классификатор"
        subtitle="Интерактивная демонстрация. Введи текст письма — алгоритм определит спам это или нет."
        centered
      />

      <GlassCard className="mx-auto mt-12 max-w-4xl">
        {/* Примеры */}
        <p className="mb-2 text-sm text-white/50">Готовые примеры:</p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {EXAMPLES.map((ex, i) => (
            <button
              key={ex.title}
              onClick={() => pickExample(i)}
              className={
                'shrink-0 rounded-full border px-4 py-2 text-sm transition-all ' +
                (activeExample === i
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-white/10 text-white/60 hover:text-white')
              }
            >
              {ex.title}
            </button>
          ))}
        </div>

        {/* Поле ввода */}
        <div className="mt-4">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
              setActiveExample(null)
            }}
            rows={6}
            placeholder="Введите текст письма для анализа..."
            className="w-full resize-none rounded-xl border border-white/10 bg-surface-2/60 p-4 font-mono text-sm outline-none transition-colors focus:border-primary/50"
          />
          <div className="mt-2 flex items-center justify-between text-sm text-white/40">
            <span>
              {inputText.length} символов · {wordCount} слов
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setInputText('')
                  setResult(null)
                  setActiveExample(null)
                }}
                className="inline-flex items-center gap-1 hover:text-white"
              >
                <Trash2 className="h-4 w-4" /> Очистить
              </button>
              <button
                onClick={() => pickExample(0)}
                className="inline-flex items-center gap-1 hover:text-white"
              >
                <Sparkles className="h-4 w-4" /> Вставить пример
              </button>
            </div>
          </div>
        </div>

        {/* Кнопка анализа */}
        <button
          onClick={() => analyze(inputText)}
          disabled={inputText.length < 10 || isAnalyzing}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Анализируем...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" /> Анализировать письмо
            </>
          )}
        </button>

        {/* Результат */}
        <AnimatePresence mode="wait">
          {result && !isAnalyzing && (
            <motion.div
              key={result.label + result.confidence}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <GlassCard glow={isSpam ? 'red' : 'green'}>
                <div className="flex items-center gap-4">
                  {isSpam ? (
                    <ShieldAlert className="h-12 w-12 shrink-0 text-spam" />
                  ) : (
                    <ShieldCheck className="h-12 w-12 shrink-0 text-ham" />
                  )}
                  <div>
                    <h3
                      className={
                        'text-2xl font-bold ' + (isSpam ? 'text-spam' : 'text-ham')
                      }
                    >
                      {isSpam ? '⚠️ ОБНАРУЖЕН СПАМ' : '✅ НОРМАЛЬНОЕ ПИСЬМО'}
                    </h3>
                    <p className="text-sm text-white/50">
                      Уверенность: {result.confidence}%
                    </p>
                  </div>
                </div>

                {/* Разбивка вероятностей */}
                <div className="mt-6 space-y-3">
                  <ProgressBar
                    label="Спам"
                    value={result.spamScore}
                    color="#FF453A"
                  />
                  <ProgressBar
                    label="Ham"
                    value={result.hamScore}
                    color="#30D158"
                  />
                </div>

                {/* Признаки */}
                {result.topFeatures.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-sm text-white/60">
                      Признаки, определившие класс:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.topFeatures.map((f) => {
                        const spammy = SPAM_FEATURE_SET.has(f)
                        return (
                          <Badge key={f} variant={spammy ? 'spam' : 'ham'}>
                            {spammy ? (
                              <AlertTriangle className="h-3 w-3" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                            {f}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                <p className="mt-4 text-xs text-white/30">
                  * Демонстрационный классификатор основан на эвристике. Реальная
                  модель (LSTM) достигает 98.9% точности.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </SectionWrapper>
  )
}
