import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Victorian coastal estate garden wedding palette
        navy: {
          DEFAULT: '#1F2B4D',
          dark: '#172243',
          light: '#2E3D5C',
        },
        burgundy: {
          DEFAULT: '#560216',
          light: '#8B2E47',
        },
        brown: {
          DEFAULT: '#2B1B10',
        },
        sage: {
          DEFAULT: '#5D7466',
          light: '#6F8E78',
        },
        terracotta: {
          DEFAULT: '#B16A4C',
          light: '#D4956B',
        },
        cream: {
          DEFAULT: '#EFE7D8',
          dark: '#D4C4B0',
        },
        ivory: {
          DEFAULT: '#F8F5EF',
        },
        'garden-mist': {
          DEFAULT: '#E4EBE3',
        },
        rose: {
          DEFAULT: '#8B4A6B',
          light: '#A85F86',
        },
        plum: {
          DEFAULT: '#2A1B3D',
          light: '#3D2A55',
        },
        charcoal: {
          DEFAULT: '#3A2F2A',
        },
        // Legacy aliases (used by existing sections) mapped to warm tones
        neon: {
          pink: '#8B4A6B',       // soft rose
          cyan: '#5D7466',       // sage
          purple: '#8B2E47',     // burgundy light
          orange: '#B16A4C',     // terracotta
          lime: '#F8F5EF',       // ivory
        },
        dark: {
          navy: '#172243',
          charcoal: '#3A2F2A',
          slate: '#2E3D5C',
        },
        // Semantic colors
        success: '#5D7466',
        warning: '#B16A4C',
        error: '#8B2E47',
      },
      backgroundImage: {
        'hero-art': "url('/images/hero/new-background-hero.png')",
        'gradient-hero': 'linear-gradient(135deg, rgba(23, 34, 67, 0.7) 0%, rgba(31, 43, 77, 0.7) 100%)',
        'gradient-neon': 'linear-gradient(90deg, #8B4A6B, #8B2E47, #B16A4C)',
        'gradient-sunset': 'linear-gradient(135deg, #D4956B, #8B4A6B, #B16A4C)',
        'gradient-cta': 'linear-gradient(135deg, #B16A4C 0%, #8B4A6B 55%, #560216 100%)',
        // Warm botanical scroll overlay with terracotta-to-burgundy transition
        'gta-overlay': 'linear-gradient(160deg, rgba(43, 27, 16, 0.95) 0%, rgba(86, 2, 22, 0.85) 45%, rgba(177, 106, 76, 0.75) 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(43, 27, 16, 0.08)',
        'card': '0 24px 60px rgba(23, 34, 67, 0.35)',
        'glow': '0 0 20px rgba(139, 74, 107, 0.35)',
        'glow-cyan': '0 0 20px rgba(93, 116, 102, 0.35)',
        'glow-soft': '0 8px 30px rgba(177, 106, 76, 0.25)',
        'neon': '0 0 10px rgba(139, 46, 71, 0.2), inset 0 0 10px rgba(139, 46, 71, 0.08)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Garamond', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
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
