import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Victorian estate + GTA 6 style blend
        neon: {
          pink: '#C85A7C',       // Burgundy-rose (wedding primary)
          cyan: '#7DB5B0',       // Sage green accent
          purple: '#1B3B4D',     // Deep navy-blue
          orange: '#D4845E',     // Terracotta
          lime: '#E8DCC8',       // Cream accent
        },
        // Dark backgrounds (for contrast)
        dark: {
          navy: '#1B3B4D',       // Deep navy (hero background)
          charcoal: '#2B4A5C',   // Charcoal
          slate: '#3D5A6F',      // Slate for secondary backgrounds
        },
        // Semantic colors
        success: '#7DB5B0',      // Sage green
        warning: '#D4845E',      // Terracotta
        error: '#C85A7C',        // Burgundy (error state)
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
