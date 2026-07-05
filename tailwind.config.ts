import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Muted wedding palette
        navy: {
          DEFAULT: '#1B2440',
          dark: '#131A30',
          light: '#2A3454',
        },
        burgundy: {
          DEFAULT: '#7A2E3F',
          light: '#9C4257',
        },
        brown: {
          DEFAULT: '#6B4A3A',
        },
        sage: {
          DEFAULT: '#8FA98F',
          light: '#AFC4AB',
        },
        terracotta: {
          DEFAULT: '#C96F4A',
          light: '#DA8E6B',
        },
        cream: {
          DEFAULT: '#F5EDE0',
          dark: '#E8DCC8',
        },
        rose: {
          DEFAULT: '#D98BA3',
          light: '#E8AFC0',
        },
        // Legacy aliases (used by existing sections) mapped to muted tones
        neon: {
          pink: '#D98BA3',       // muted rose
          cyan: '#8FA98F',       // sage
          purple: '#9C4257',     // burgundy light
          orange: '#C96F4A',     // terracotta
          lime: '#F5EDE0',       // cream
        },
        dark: {
          navy: '#131A30',
          charcoal: '#1B2440',
          slate: '#2A3454',
        },
        // Semantic colors
        success: '#8FA98F',
        warning: '#C96F4A',
        error: '#9C4257',
      },
      backgroundImage: {
        'hero-art': "url('/images/hero/new-background-hero.png')",
        'gradient-hero': 'linear-gradient(135deg, rgba(19, 26, 48, 0.7) 0%, rgba(27, 36, 64, 0.7) 100%)',
        'gradient-neon': 'linear-gradient(90deg, #D98BA3, #9C4257, #C96F4A)',
        'gradient-sunset': 'linear-gradient(135deg, #DA8E6B, #D98BA3, #C96F4A)',
        'gradient-cta': 'linear-gradient(135deg, #DA8E6B 0%, #D98BA3 55%, #C96F4A 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(217, 139, 163, 0.45)',
        'glow-cyan': '0 0 20px rgba(143, 169, 143, 0.45)',
        'glow-soft': '0 8px 30px rgba(201, 111, 74, 0.35)',
        'neon': '0 0 10px rgba(156, 66, 87, 0.3), inset 0 0 10px rgba(156, 66, 87, 0.1)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      keyframes: {
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 8px 30px rgba(201, 111, 74, 0.35)' },
          '50%': { transform: 'scale(1.015)', boxShadow: '0 8px 40px rgba(217, 139, 163, 0.45)' },
        },
      },
      animation: {
        'fade-down': 'fade-down 0.8s ease-out both',
        'fade-up': 'fade-up 0.9s ease-out both',
        'pulse-soft': 'pulse-soft 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
