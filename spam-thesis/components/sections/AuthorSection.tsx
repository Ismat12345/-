import { GraduationCap } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import { AUTHOR, DATASET_STATS, MODEL_METRICS } from '@/lib/constants'

const TECH_STACK = [
  'Python',
  'TensorFlow/Keras',
  'scikit-learn',
  'NLTK',
  'pandas',
  'NumPy',
  'matplotlib',
  'Jupyter Notebook',
  'Next.js',
  'TypeScript',
]

const SUPERVISION: [string, string][] = [
  ['Руководитель', AUTHOR.supervisor],
  ['Рецензент', AUTHOR.reviewer],
  ['Зав. кафедрой', AUTHOR.headOfDepartment],
]

const DETAILS: [string, string][] = [
  ['Год защиты', String(AUTHOR.year)],
  ['Университет', AUTHOR.university],
  ['Факультет', AUTHOR.faculty],
  ['Кафедра', AUTHOR.department],
  ['Специальность', AUTHOR.specialty],
  ['Город', `${AUTHOR.city}, ${AUTHOR.country}`],
  ['Объём датасета', `${DATASET_STATS.total.toLocaleString('en-US')} писем`],
]

export default function AuthorSection() {
  return (
    <SectionWrapper id="author">
      <SectionTitle badge="Об авторе" title="Автор" highlight="работы" />

      <div className="mt-12 grid gap-8 md:grid-cols-[2fr_3fr]">
        {/* Карточка автора */}
        <GlassCard glow="blue" className="text-center">
          <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-ham text-3xl font-bold text-white">
            {AUTHOR.initials}
          </div>
          <h3 className="mt-4 text-2xl font-bold">{AUTHOR.fullName}</h3>
          <p className="mt-1 text-white/60">Выпускник, {AUTHOR.year}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge variant="primary">{AUTHOR.specialty}</Badge>
            <Badge variant="neutral">{AUTHOR.universityShort}</Badge>
          </div>

          {/* Научное руководство */}
          <div className="mt-6 rounded-xl border border-white/10 bg-surface-2/50 p-4 text-left">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/70">
              <GraduationCap className="h-4 w-4 text-primary" />
              Научное руководство
            </p>
            <dl className="space-y-2">
              {SUPERVISION.map(([role, person]) => (
                <div key={role} className="flex justify-between gap-3 text-sm">
                  <dt className="text-white/50">{role}</dt>
                  <dd className="text-right">{person}</dd>
                </div>
              ))}
            </dl>
          </div>
        </GlassCard>

        {/* О работе */}
        <GlassCard>
          <h3 className="text-xl font-bold">О дипломной работе</h3>
          <dl className="mt-4 divide-y divide-white/5">
            {DETAILS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-3">
                <dt className="text-sm text-white/50">{k}</dt>
                <dd className="col-span-2 text-sm">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-4 py-3">
              <dt className="text-sm text-white/50">Лучший результат</dt>
              <dd className="col-span-2">
                <Badge variant="ham">
                  {MODEL_METRICS[MODEL_METRICS.length - 1].shortName}, F1 = 98.8%
                </Badge>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-white/70">
              Инструменты и технологии:
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-surface-2/60 px-3 py-1 text-sm text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  )
}
