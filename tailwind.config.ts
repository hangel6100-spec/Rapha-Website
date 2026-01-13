import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Medical Professional Colors
        'medical-teal': {
          DEFAULT: '#1B4965',
          light: '#2A5F7A',
          dark: '#0D2434',
        },
        // Luxury Gold Accents
        'luxury-gold': {
          DEFAULT: '#D4AF37',
          light: '#E4BF47',
          dark: '#B49327',
        },
        // Health & Wellness Green
        'health-green': {
          DEFAULT: '#5FA777',
          light: '#7FBF94',
          dark: '#4A8660',
        },
        // Brand Colors from your spec
        'brand-gold': '#FDC500',
        'brand-blue': '#6D8CE8',
        'brand-coral': '#FF9770',
        'brand-pink': '#FF70A6',
        // Clean Background
        'clean-bg': '#F8F9FA',
      },
      fontFamily: {
        // Professional Typography
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
