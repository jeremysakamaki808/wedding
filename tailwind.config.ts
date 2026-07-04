import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary neon (GTA 6 style Hawaiian)
        neon: {
          pink: '#FF1493',      // Hot pink primary
          cyan: '#00CED1',       // Aqua/turquoise
          purple: '#9D00FF',     // Vibrant purple
          orange: '#FFA500',     // Sunset orange
          lime: '#ADFF2F',       // Electric lime accent
        },
        // Dark backgrounds (for contrast)
        dark: {
          navy: '#0A0E27',       // Deep navy (hero background)
          charcoal: '#1A1A2E',   // Charcoal
          slate: '#2D2D44',      // Slate for secondary backgrounds
        },
        // Semantic colors
        success: '#00FF41',      // Bright green
        warning: '#FFB81C',      // Warm yellow
        error: '#FF006E',        // Neon pink (error state)
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0A0E27 0%, #1A0033 50%, #0A1A2E 100%)',
        'gradient-neon': 'linear-gradient(90deg, #FF1493, #FF006E, #9D00FF)',
        'gradient-sunset': 'linear-gradient(135deg, #FFA500, #FF1493, #00CED1)',
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
