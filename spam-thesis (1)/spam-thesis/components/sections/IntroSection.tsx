'use client'

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import {
  Globe,
  AlertTriangle,
  DollarSign,
  Clock,
  Megaphone,
  Fish,
  Bug,
  UserX,
  Crown,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

/* Глобальные факты */
const FACTS = [
  {
    icon: Globe,
    color: '#FF453A',
    end: 333,
    suffix: ' млрд',
    decimals: 0,
    text: 'Электронных писем ежедневно в мире',
    source: 'Statista, 2024',
  },
  {
    icon: AlertTriangle,
    color: '#FF453A',
    end: 45.6,
    suffix: '%',
    decimals: 1,
    text: 'Всего писем — это спам',
    source: 'SpamLaws, 2024',
  },
  {
    icon: DollarSign,
    color: '#FBBF24',
    end: 20,
    suffix: ' млрд $',
    decimals: 0,
    text: 'Ежегодные убытки от спама',
    source: 'FBI IC3, 2023',
  },
  {
    icon: Clock,
    color: '#0A84FF',
    end: 4.8,
    suffix: ' сек',
    decimals: 1,
    text: 'Каждые 4.8 секунды отправляется новый спам',
    source: 'Kaspersky Lab',
  },
]

/* Виды нежелательных писем */
const SPAM_TYPES = [
  {
    icon: Megaphone,
    color: '#FF453A',
    title: 'Коммерческий спам',
    desc: 'Массовая реклама без согласия получателя',
  },
  {
    icon: Fish,
    color: '#FF453A',
    title: 'Фишинг',
    desc: 'Поддельные письма для кражи учётных данных',
  },
  {
    icon: Bug,
    color: '#FF453A',
    title: 'Malware',
    desc: 'Письма с вредоносными вложениями и ссылками',
  },
  {
    icon: UserX,
    color: '#FBBF24',
    title: 'Спуфинг',
    desc: 'Подделка адреса отправителя',
  },
  {
    icon: Crown,
    color: '#FBBF24',
    title: 'Нигерийские письма',
    desc: 'Мошеннические схемы быстрого обогащения',
  },
]

/* Структура email-трафика */
const TRAFFIC = [
  { name: 'Спам', value: 45.6, color: '#FF453A' },
  { name: 'Личная переписка', value: 34.4, color: '#30D158' },
  { name: 'Транзакционные', value: 12, color: '#60A5FA' },
  { name: 'Рассылки', value: 8, color: '#FBBF24' },
]

function EmailTrafficDonut() {
  return (
    <div>
      <h3 className="mb-4 text-center text-lg font-semibold">
        Структура email-трафика 2024
      </h3>

      <div className="relative h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={TRAFFIC}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              stroke="none"
            >
              {TRAFFIC.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
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

        {/* центр donut */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="gradient-text font-mono text-2xl font-bold">
            333 млрд
          </span>
          <span className="text-xs text-white/50">писем/день</span>
        </div>
      </div>

      {/* легенда */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {TRAFFIC.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white/70">{entry.name}</span>
            <span className="ml-auto font-mono text-white/50">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function IntroSection() {
  return (
    <SectionWrapper id="intro">
      <SectionTitle
        badge="Введение"
        title="Что такое"
        highlight="спам-рассылки?"
        subtitle="Нежелательные письма создают серьёзные угрозы для безопасности и продуктивности миллиардов пользователей интернета."
        centered
      />

      {/* Глобальные факты */}
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {FACTS.map((fact) => (
          <GlassCard key={fact.text} hover className="text-center">
            <fact.icon
              className="mx-auto mb-3 h-7 w-7"
              style={{ color: fact.color }}
            />
            <div className="font-mono text-3xl font-bold">
              <AnimatedCounter
                end={fact.end}
                suffix={fact.suffix}
                decimals={fact.decimals}
              />
            </div>
            <p className="mt-2 text-sm text-white/60">{fact.text}</p>
            <p className="mt-2 text-xs text-white/30">{fact.source}</p>
          </GlassCard>
        ))}
      </div>

      {/* Двухколоночный блок */}
      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {/* Виды писем */}
        <div>
          <h3 className="mb-6 text-2xl font-bold">Виды нежелательных писем</h3>
          <div className="space-y-3">
            {SPAM_TYPES.map((type) => (
              <div
                key={type.title}
                className="glass-card flex items-start gap-4 rounded-xl border-l-2 p-4"
                style={{ borderLeftColor: type.color }}
              >
                <type.icon
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: type.color }}
                />
                <div>
                  <h4 className="font-semibold">{type.title}</h4>
                  <p className="text-sm text-white/60">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Диаграмма */}
        <GlassCard className="self-start">
          <EmailTrafficDonut />
        </GlassCard>
      </div>
    </SectionWrapper>
  )
}
