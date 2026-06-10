import { Shield, Triangle, BrainCircuit, FileCode, Github, Send, Instagram } from 'lucide-react'
import { NAV_ITEMS, AUTHOR } from '@/lib/constants'

const techStack = [
  { name: 'Python', icon: FileCode },
  { name: 'TensorFlow / scikit-learn', icon: BrainCircuit },
  { name: 'Next.js', icon: Triangle },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0F] py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Колонка 1 — лого + описание */}
          <div>
            <div className="flex items-center gap-2.5">
              <Shield className="h-6 w-6 text-primary" />
              <span className="gradient-text text-lg font-bold">SpamGuard</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Дипломная работа по специальности {AUTHOR.specialty}. Обнаружение
              нежелательных почтовых писем на основе машинного обучения.
            </p>
          </div>

          {/* Колонка 2 — быстрые ссылки */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Разделы
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 — стек технологий */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Стек технологий
            </h3>
            <ul className="mt-4 space-y-2">
              {techStack.map((tech) => (
                <li
                  key={tech.name}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <tech.icon className="h-4 w-4 text-primary" />
                  {tech.name}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={AUTHOR.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" />
                Исходный код на GitHub
              </a>
              <a
                href={AUTHOR.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Send className="h-4 w-4" />
                Telegram: {AUTHOR.telegramHandle}
              </a>
              <a
                href={AUTHOR.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Instagram: {AUTHOR.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-sm text-white/50 sm:flex-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span>
              Дипломная работа · {AUTHOR.specialty} · {AUTHOR.universityShort} ·{' '}
              {AUTHOR.year}
            </span>
            <span className="text-white/40">© {AUTHOR.fullName}</span>
          </div>
          <span>Разработано с ❤️ и Next.js</span>
        </div>
      </div>
    </footer>
  )
}
