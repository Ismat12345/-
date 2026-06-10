# Spam Detection Thesis Website

Профессиональный академический сайт дипломной работы на тему **«Обнаружение
нежелательных почтовых писем на основе машинного обучения»**. Интерактивная
презентация исследования: сравнение 5 алгоритмов МО, визуализация метрик и
живая демонстрация классификатора прямо в браузере.

## Стек

- **Next.js 14** (App Router) + **React 18**
- **TypeScript**
- **Tailwind CSS 3** — тёмная тема по умолчанию, glassmorphism
- **Framer Motion** — анимации и переходы
- **Recharts** — графики (bar, donut, ROC, radar)
- **lucide-react** — иконки
- **next-themes** — переключение светлой/тёмной темы

## Команды

```bash
npm install      # установка зависимостей
npm run dev      # разработка → http://localhost:3000
npm run build    # production-сборка
npm run start    # запуск собранной версии
npm run lint     # проверка ESLint
```

## Структура проекта

```
app/
  layout.tsx              корневой layout, шрифты, SEO-метаданные, ThemeProvider
  page.tsx                сборка всех секций
  globals.css             темы, glass-card, градиенты, скроллбар
components/
  layout/                 Header (scrollspy + progress bar), MobileNav, Footer
  sections/               9 секций: Hero, Intro, Problem, Dataset, Methodology,
                          Models, Results, Demo, Author
  ui/                     SectionWrapper, SectionTitle, GlassCard, Badge,
                          ProgressBar, AnimatedCounter, ChartSkeleton, BackToTop
  charts/                 MetricsBarChart, ConfusionMatrixChart, ROCCurveChart,
                          RadarCompareChart
lib/
  constants.ts            все данные исследования (метрики, датасет, ROC и т.д.)
  types.ts                TypeScript-интерфейсы
  utils.ts                cn(), форматирование чисел/процентов
  spamClassifier.ts       клиентский эвристический классификатор для Demo
```

## Демонстрационный классификатор

`lib/spamClassifier.ts` содержит функцию `classifyEmail(text)`, которая
имитирует ML-классификацию на основе взвешенных признаков (спам/ham-словари,
эвристики по восклицаниям, CAPS и ссылкам) и нормализует результат через
сигмоиду. Это демо для UX — реальная модель (LSTM) обучается отдельно.

## Деплой на Vercel

Проект готов к деплою без дополнительной настройки (`vercel.json` и заголовки
безопасности уже добавлены):

```bash
npm i -g vercel     # если ещё не установлен
vercel --prod
```

Либо подключите Git-репозиторий в дашборде Vercel — фреймворк определится
автоматически.

## Важные примечания

- **next.config — `.mjs`, а не `.ts`.** Нативная поддержка `next.config.ts`
  появилась только в Next.js 15; в Next 14 файл `.ts` игнорируется, поэтому
  конфиг размещён в `next.config.mjs`.
- **Шрифты** (Inter, JetBrains Mono) подключены через `next/font/google` +
  `@import` в `globals.css`. Для сборки нужен доступ к Google Fonts (на Vercel и
  локально работает из коробки).
- `experimental.optimizeCss` требует пакет `critters` — уже в зависимостях.
- Замените заглушки в объекте `AUTHOR` (`lib/constants.ts`) на свои данные.
