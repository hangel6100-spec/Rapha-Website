import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Added src directory
    './public/**/*.html', // Added for any HTML in public
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Medical Professional Colors - Complete Scale
        'medical-teal': {
          50: '#E6F1F5',
          100: '#CCE3EB',
          200: '#99C7D7',
          300: '#66AAC3',
          400: '#338EAF',
          DEFAULT: '#1B4965',
          500: '#1B4965',
          600: '#163A51',
          700: '#102B3D',
          800: '#0B1C29',
          900: '#050E14',
          950: '#03070A',
        },
        // Luxury Gold Accents - Complete Scale
        'luxury-gold': {
          50: '#FDFAF0',
          100: '#FBF5E1',
          200: '#F7EBC3',
          300: '#F3E1A5',
          400: '#EFD787',
          DEFAULT: '#D4AF37',
          500: '#D4AF37',
          600: '#C09F2F',
          700: '#A08527',
          800: '#806B1F',
          900: '#605117',
          950: '#40360F',
        },
        // Health & Wellness Green - Complete Scale
        'health-green': {
          50: '#F0F7F3',
          100: '#E1EFE7',
          200: '#C3DFCF',
          300: '#A5CFB7',
          400: '#87BF9F',
          DEFAULT: '#5FA777',
          500: '#5FA777',
          600: '#4F8D63',
          700: '#3F734F',
          800: '#2F593B',
          900: '#1F3F27',
          950: '#0F2513',
        },
        // Brand Colors with Scales
        'brand-gold': {
          50: '#FFFEF5',
          100: '#FFFCEA',
          200: '#FFF9D5',
          300: '#FFF6C0',
          400: '#FFF3AB',
          DEFAULT: '#FDC500',
          500: '#FDC500',
          600: '#E4B100',
          700: '#CA9E00',
          800: '#B18A00',
          900: '#977700',
          950: '#7E6300',
        },
        'brand-blue': {
          50: '#F0F3FF',
          100: '#E1E7FF',
          200: '#C3CFFF',
          300: '#A5B7FF',
          400: '#879FFF',
          DEFAULT: '#6D8CE8',
          500: '#6D8CE8',
          600: '#5574E0',
          700: '#3D5CD8',
          800: '#2544D0',
          900: '#1E36A8',
          950: '#162880',
        },
        'brand-coral': {
          50: '#FFF5F2',
          100: '#FFEBE5',
          200: '#FFD7CB',
          300: '#FFC3B1',
          400: '#FFAF97',
          DEFAULT: '#FF9770',
          500: '#FF9770',
          600: '#FF7F50',
          700: '#FF6730',
          800: '#FF4F10',
          900: '#DF3700',
          950: '#BF1F00',
        },
        'brand-pink': {
          50: '#FFF0F4',
          100: '#FFE1E9',
          200: '#FFC3D3',
          300: '#FFA5BD',
          400: '#FF87A7',
          DEFAULT: '#FF70A6',
          500: '#FF70A6',
          600: '#FF5896',
          700: '#FF4086',
          800: '#FF2876',
          900: '#E71066',
          950: '#CF0056',
        },
        // Clean Backgrounds & Neutrals
        'clean-bg': {
          DEFAULT: '#F8F9FA',
          50: '#FFFFFF',
          100: '#FAFBFC',
          200: '#F8F9FA',
          300: '#F1F3F5',
          400: '#E9ECEF',
          500: '#DEE2E6',
          600: '#CED4DA',
          700: '#ADB5BD',
          800: '#6C757D',
          900: '#495057',
          950: '#343A40',
        },
        // Semantic Colors
        'success': {
          50: '#E6F7E6',
          100: '#C3E9C3',
          200: '#8DD68D',
          300: '#5BC35B',
          400: '#2FB02F',
          DEFAULT: '#28A745',
          500: '#28A745',
          600: '#239438',
          700: '#1E812B',
          800: '#196E1E',
          900: '#145B11',
        },
        'warning': {
          50: '#FFF9E6',
          100: '#FFF0C3',
          200: '#FFE48D',
          300: '#FFD85B',
          400: '#FFCC2F',
          DEFAULT: '#FFC107',
          500: '#FFC107',
          600: '#E6AD00',
          700: '#CC9900',
          800: '#B38600',
          900: '#997200',
        },
        'danger': {
          50: '#FFEBE9',
          100: '#FFCDC9',
          200: '#FF9B93',
          300: '#FF695D',
          400: '#FF3727',
          DEFAULT: '#DC3545',
          500: '#DC3545',
          600: '#C82E3D',
          700: '#B42735',
          800: '#A0202D',
          900: '#8C1925',
        },
        'info': {
          50: '#E6F4FF',
          100: '#C3E5FF',
          200: '#8DCDFF',
          300: '#5BB5FF',
          400: '#2F9DFF',
          DEFAULT: '#17A2B8',
          500: '#17A2B8',
          600: '#1592A6',
          700: '#138294',
          800: '#117282',
          900: '#0F6270',
        },
      },
      fontFamily: {
        // Professional Typography with Fallbacks
        heading: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', ...defaultTheme.fontFamily.sans],
        body: ['Open Sans', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', ...defaultTheme.fontFamily.mono],
        serif: ['Playfair Display', 'Georgia', ...defaultTheme.fontFamily.serif],
        medical: ['Roboto', 'Helvetica Neue', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // Custom font sizes for better hierarchy
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1.16' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],        // 60px
        '7xl': ['4.5rem', { lineHeight: '1.05' }],        // 72px
        '8xl': ['6rem', { lineHeight: '1' }],             // 96px
        '9xl': ['8rem', { lineHeight: '1' }],             // 128px
        // Display sizes
        'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
      },
      spacing: {
        // Custom spacing values
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        // Enhanced animations
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.3s ease-out forwards',
        'zoom-out': 'zoomOut 0.3s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        // Gradient presets
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-medical': 'linear-gradient(135deg, #1B4965 0%, #5FA777 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #D4AF37 0%, #FDC500 100%)',
        'gradient-health': 'linear-gradient(135deg, #5FA777 0%, #7FBF94 100%)',
        'gradient-premium': 'linear-gradient(135deg, #1B4965 0%, #D4AF37 100%)',
      },
      boxShadow: {
        // Custom shadows for depth
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
        'large': '0 10px 25px 0 rgba(0, 0, 0, 0.1)',
        'xl-soft': '0 20px 40px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(253, 197, 0, 0.3)',
        'glow-blue': '0 0 20px rgba(109, 140, 232, 0.3)',
        'glow-green': '0 0 20px rgba(95, 167, 119, 0.3)',
      },
      borderRadius: {
        // Custom border radius
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '999': '999',
        '9999': '9999',
        'max': '2147483647',
      },
      screens: {
        // Custom breakpoints
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Device-specific
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
        // Orientation
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        // Hover capability
        'hover-hover': { 'raw': '(hover: hover)' },
        'hover-none': { 'raw': '(hover: none)' },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      aspectRatio: {
        // Custom aspect ratios
        'golden': '1.618 / 1',
        'portrait': '3 / 4',
        'landscape': '4 / 3',
        'ultrawide': '21 / 9',
        'phone': '9 / 16',
      },
      blur: {
        xs: '2px',
      },
      backdropBlur: {
        xs: '2px',
      },
      gridTemplateColumns: {
        // Custom grid layouts
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        // Custom grid layouts
        '7': 'repeat(7, minmax(0, 1fr))',
        '8': 'repeat(8, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    // Recommended plugins (install separately)
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/container-queries'),
  ],
  // Safelist important utility classes
  safelist: [
    'animate-fade-in',
    'animate-slide-up',
    {
      pattern: /bg-(medical-teal|luxury-gold|health-green|brand)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern: /text-(medical-teal|luxury-gold|health-green|brand)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
  // Future-proof settings
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },
}

export default config
