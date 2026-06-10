import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Обнаружение спама | Дипломная работа — Баротов И.Л.',
  description:
    'Дипломная работа: Обнаружение нежелательных почтовых писем на основе машинного обучения. ТАТУ, 2026. Баротов Исмат Латиф угли.',
  keywords: [
    'спам',
    'машинное обучение',
    'LSTM',
    'SVM',
    'Naive Bayes',
    'ТАТУ',
    'дипломная работа',
    '2026',
  ],
  authors: [{ name: 'Баротов Исмат Латиф угли' }],
  openGraph: {
    title: 'Обнаружение спама на основе МО | ТАТУ 2026',
    description:
      'Сравнительный анализ 5 алгоритмов машинного обучения. Точность до 98.9%.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-[#0A0A0F] text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
