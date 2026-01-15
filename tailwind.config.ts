import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'medical-teal': {
          50: '#E6F1F5',
          100: '#CCE3EB',
          200: '#99C7D7',
          300: '#66AAC3',
          400: '#338EAF',
          500: '#1B4965',
          600: '#163A51',
          700: '#102B3D',
          800: '#0B1C29',
          900: '#050E14',
          DEFAULT: '#1B4965',
        },
        'luxury-gold': {
          50: '#FDFAF0',
          100: '#FBF5E1',
          200: '#F7EBC3',
          300: '#F3E1A5',
          400: '#EFD787',
          500: '#D4AF37',
          600: '#C09F2F',
          700: '#A08527',
          800: '#806B1F',
          900: '#605117',
          DEFAULT: '#D4AF37',
        },
        'health-green': {
          50: '#F0F7F3',
          100: '#E1EFE7',
          200: '#C3DFCF',
          300: '#A5CFB7',
          400: '#87BF9F',
          500: '#5FA777',
          600: '#4F8D63',
          700: '#3F734F',
          800: '#2F593B',
          900: '#1F3F27',
          DEFAULT: '#5FA777',
        },
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
