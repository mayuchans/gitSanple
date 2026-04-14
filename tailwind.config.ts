import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFFBF0',
          50: '#FFFDF7',
          100: '#FFFBF0',
          200: '#FFF5D6',
          300: '#FDECC0',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8CC7A',
          dark: '#8B6914',
          muted: '#D4AF6A',
        },
        warm: {
          900: '#2D1B0E',
          800: '#3D2B1F',
          700: '#5C3D2A',
          600: '#7A5540',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8CC7A 50%, #C9A84C 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFFBF0 0%, #FFF5D6 100%)',
      },
      boxShadow: {
        gold: '0 4px 24px rgba(201,168,76,0.25)',
        'gold-lg': '0 8px 40px rgba(201,168,76,0.35)',
      },
    },
  },
  plugins: [],
}

export default config
