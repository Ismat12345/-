import { X, Check, Database, Cpu, BarChart3, CheckCircle2, Info } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import ProgressBar from '@/components/ui/ProgressBar'

const TRADITIONAL_CONS = [
  'Чёрные списки IP/доменов: легко обходятся сменой адреса',
  'Фильтрация по ключевым словам: много ложных срабатываний',
  'Ручные правила: требуют постоянного обновления',
  'Нет адаптации: не учатся на новых примерах',
]

const ML_PROS = [
  'Автоматическое обучение на примерах',
  'Адаптация к новым видам спама',
  'Анализ контекста и семантики',
  'Масштабируемость на большие объёмы',
]

const GOALS = [
  {
    num: '01',
    icon: Database,
    title: 'Сбор данных',
    desc: 'Сбор и предобработка датасета из 33,716 писем из трёх источников',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Обучение моделей',
    desc: 'Реализация и обучение 5 алгоритмов: NB, LR, SVM, RF, LSTM',
  },
  {
    num: '03',
    icon: BarChart3,
    title: 'Сравнение метрик',
    desc: 'Сравнительный анализ по метрикам: Accuracy, Precision, Recall, F1, AUC',
  },
  {
    num: '04',
    icon: CheckCircle2,
    title: 'Выбор модели',
    desc: 'Выбор оптимального алгоритма для production-применения',
  },
]

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem">
      <SectionTitle
        badge="Постановка задачи"
        title="Почему нужно"
        highlight="машинное обучение?"
        subtitle="Традиционные методы фильтрации несовершенны. Спамеры постоянно адаптируются, обходя статические правила."
      />

      {/* Сравнение подходов */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Традиционные методы */}
        <div className="rounded-2xl border border-spam/30 p-6">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <span className="h-3 w-3 rounded-full bg-spam" />
            Традиционные фильтры
          </h3>
          <ul className="space-y-3">
            {TRADITIONAL_CONS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-spam" />
                <span className="text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ProgressBar label="Точность" value={84} color="#FF453A" />
            <p className="mt-1 text-xs text-white/40">Диапазон ~82–88%</p>
          </div>
        </div>

        {/* Машинное обучение */}
        <div className="rounded-2xl border border-ham/30 p-6">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold">
            <span className="h-3 w-3 rounded-full bg-ham" />
            Алгоритмы МО
          </h3>
          <ul className="space-y-3">
            {ML_PROS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ham" />
                <span className="text-sm text-white/70">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ProgressBar label="Точность" value={98} color="#30D158" />
            <p className="mt-1 text-xs text-white/40">Диапазон 96–99%</p>
          </div>
        </div>
      </div>

      {/* Цели исследования */}
      <div className="mt-16">
        <SectionTitle badge="Цели и задачи" title="Задачи дипломной работы" />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {GOALS.map((goal) => (
            <GlassCard
              key={goal.num}
              glow="blue"
              hover
              className="relative overflow-hidden"
            >
              <span className="pointer-events-none absolute -right-1 -top-3 text-6xl font-bold text-primary/20">
                {goal.num}
              </span>
              <goal.icon className="mb-3 h-8 w-8 text-primary" />
              <h4 className="text-lg font-semibold">{goal.title}</h4>
              <p className="mt-1.5 text-sm text-white/60">{goal.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Актуальность */}
      <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-8">
        <h3 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <Info className="h-6 w-6 text-primary" />
          Актуальность исследования
        </h3>
        <p className="text-white/70">
          В 2024 году объём спама достиг исторического максимума. Фишинговые атаки
          через email стали причиной 94% всех кибератак (IBM Security Report,
          2023). Эффективные автоматические системы классификации критически
          необходимы для корпоративной безопасности и защиты персональных данных
          пользователей.
        </p>
      </div>
    </SectionWrapper>
  )
}
