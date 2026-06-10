import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A84FF',
          dark: '#0060D1',
          light: '#47A9FF',
        },
        spam: {
          DEFAULT: '#FF453A',
          light: '#FF6B63',
          dark: '#CC2A21',
        },
        ham: {
          DEFAULT: '#30D158',
          light: '#5EE07F',
          dark: '#1FA83A',
        },
        surface: {
          DEFAULT: '#111118',
          2: '#1A1A24',
          3: '#22222E',
          4: '#2A2A38',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'matrix-fall': 'matrixFall 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(10,132,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(10,132,255,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        matrixFall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
