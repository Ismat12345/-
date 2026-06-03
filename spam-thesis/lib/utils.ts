import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет классы Tailwind, корректно разрешая конфликты.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Форматирует число с разделителями групп разрядов.
 * 33716 -> '33,716'
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

/**
 * Форматирует число как процент.
 * 98.9 -> '98.9%'
 */
export function formatPercent(n: number): string {
  return `${n}%`
}

/**
 * Возвращает CSS-класс цвета в зависимости от значения метрики.
 * > 98  -> text-ham
 * > 96  -> text-primary
 * иначе -> text-yellow-400
 */
export function getScoreColor(score: number): string {
  if (score > 98) return 'text-ham'
  if (score > 96) return 'text-primary'
  return 'text-yellow-400'
}
