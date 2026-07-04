import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sunset wedding palette
        neon: {
          pink: '#FF69B4',       // Hot pink primary
          cyan: '#FF8C42',       // Warm orange
          purple: '#FF1493',     // Deep pink
          orange: '#FFB84D',     // Sunset orange
          lime: '#FFE4B5',       // Moccasin/warm cream
        },
        // Dark backgrounds (for contrast)
        dark: {
          navy: '#1A0F2E',       // Very dark purple-navy
          charcoal: '#2D1B3D',   // Dark plum
          slate: '#3D2850',      // Dark slate-plum
        },
        // Semantic colors
        success: '#FF69B4',      // Hot pink
        warning: '#FFB84D',      // Sunset orange
        error: '#FF1493',        // Deep pink (error state)
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, rgba(26, 15, 46, 0.7) 0%, rgba(45, 27, 61, 0.7) 100%)',
        'gradient-neon': 'linear-gradient(90deg, #FF69B4, #FF1493, #FFB84D)',
        'gradient-sunset': 'linear-gradient(135deg, #FFB84D, #FF69B4, #FF8C42)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 20, 147, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 206, 209, 0.5)',
        'neon': '0 0 10px rgba(157, 0, 255, 0.3), inset 0 0 10px rgba(157, 0, 255, 0.1)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
