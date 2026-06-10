import type { DemoResult } from './types'

/* Веса спам-слов */
export const SPAM_WORDS: Record<string, number> = {
  free: 2.5,
  click: 2.0,
  offer: 2.0,
  winner: 3.0,
  prize: 3.0,
  urgent: 2.5,
  verify: 2.0,
  account: 1.5,
  limited: 1.8,
  guaranteed: 2.5,
  dollar: 2.0,
  casino: 3.0,
  subscribe: 1.5,
  exclusive: 1.5,
  money: 1.8,
  cheap: 2.0,
  bonus: 2.0,
  congratulations: 2.5,
  selected: 2.0,
  claim: 2.5,
  won: 2.5,
  million: 2.0,
  thousand: 1.5,
  percent: 1.2,
  discount: 1.8,
  investment: 1.5,
  credit: 1.5,
  loan: 2.0,
  profit: 1.8,
}

/* Веса ham-слов (отрицательные) */
export const HAM_WORDS: Record<string, number> = {
  meeting: -1.5,
  project: -1.5,
  report: -1.2,
  please: -1.0,
  review: -1.2,
  team: -1.5,
  schedule: -1.3,
  update: -1.0,
  discuss: -1.3,
  regards: -2.0,
  sincerely: -2.0,
  hello: -0.8,
  thanks: -1.0,
  thank: -1.0,
  attached: -1.2,
  presentation: -1.5,
  deadline: -1.3,
  agenda: -1.5,
  conference: -1.5,
  budget: -1.2,
}

/* Фразы и символы (поиск по подстроке) */
const SPAM_PHRASES: Record<string, number> = {
  'click here': 3.0,
  'act now': 3.0,
  'limited time': 2.5,
  '!!!': 2.0,
}

/* Метки эвристик */
const HEUR_EXCLAIM = 'много восклицаний'
const HEUR_CAPS = 'текст ЗАГЛАВНЫМИ'
const HEUR_URL = 'подозрительные ссылки'

/* Набор «спам-признаков» — нужен UI, чтобы раскрасить теги */
export const SPAM_FEATURE_SET = new Set<string>([
  ...Object.keys(SPAM_WORDS),
  ...Object.keys(SPAM_PHRASES),
  HEUR_EXCLAIM,
  HEUR_CAPS,
  HEUR_URL,
])

const round1 = (n: number) => Math.round(n * 10) / 10

interface Feature {
  feature: string
  weight: number
}

export function classifyEmail(text: string): DemoResult {
  const lower = text.toLowerCase()
  const tokens = lower.match(/[a-z0-9]+/g) ?? []

  let spamPoints = 0
  let hamPoints = 0
  const feats: Feature[] = []
  const seen = new Set<string>()

  // Одиночные слова
  for (const tok of tokens) {
    if (tok in SPAM_WORDS && !seen.has(`s:${tok}`)) {
      spamPoints += SPAM_WORDS[tok]
      feats.push({ feature: tok, weight: SPAM_WORDS[tok] })
      seen.add(`s:${tok}`)
    }
    if (tok in HAM_WORDS && !seen.has(`h:${tok}`)) {
      const w = Math.abs(HAM_WORDS[tok])
      hamPoints += w
      feats.push({ feature: tok, weight: -w })
      seen.add(`h:${tok}`)
    }
  }

  // Фразы и символы
  for (const [phrase, w] of Object.entries(SPAM_PHRASES)) {
    if (lower.includes(phrase)) {
      spamPoints += w
      feats.push({ feature: phrase, weight: w })
    }
  }

  // Эвристики
  const exclaim = (text.match(/!/g) ?? []).length
  if (exclaim > 2) {
    spamPoints += 2.0
    feats.push({ feature: HEUR_EXCLAIM, weight: 2.0 })
  }

  const alpha = text.replace(/[^a-zA-Z]/g, '')
  if (alpha.length > 10 && alpha === alpha.toUpperCase()) {
    spamPoints += 1.5
    feats.push({ feature: HEUR_CAPS, weight: 1.5 })
  }

  const urlCount = (lower.match(/https?:\/\/|www\.|\.com/g) ?? []).length
  if (urlCount > 0) {
    const w = Math.min(urlCount * 1.0, 3.0)
    spamPoints += w
    feats.push({ feature: HEUR_URL, weight: w })
  }

  // Нормализация в вероятность (sigmoid)
  const net = spamPoints - hamPoints
  const pSpam = 1 / (1 + Math.exp(-0.7 * net))
  const label: 'spam' | 'ham' = pSpam >= 0.5 ? 'spam' : 'ham'
  const confidence = (label === 'spam' ? pSpam : 1 - pSpam) * 100

  const topFeatures = feats
    .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
    .slice(0, 6)
    .map((f) => f.feature)

  return {
    label,
    confidence: round1(confidence),
    spamScore: round1(pSpam * 100),
    hamScore: round1((1 - pSpam) * 100),
    topFeatures,
  }
}
