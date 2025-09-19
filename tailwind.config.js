/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nature-inspired premium real estate palette
        primary: {
          50: '#f0f7ee',
          100: '#daebd2',
          200: '#b8d8a7',
          300: '#91c175',
          400: '#6fa84c',
          500: '#4a5d3a', // Main brand color
          600: '#3a4a2d',
          700: '#2d3522',
          800: '#252b1d',
          900: '#1a1f16',
        },
        sage: {
          50: '#f6f8f4',
          100: '#e8f3e1',
          200: '#d1e6c3',
          300: '#9caf88',
          400: '#7a936b',
          500: '#5a6b52',
          600: '#495541',
          700: '#3b4336',
          800: '#31372e',
          900: '#2a2f27',
        },
        accent: {
          50: '#faf8f0',
          100: '#f4eddd',
          200: '#e8d7b6',
          300: '#dbb98a',
          400: '#d4b068', // Gold accent
          500: '#c49c4a',
          600: '#a6813c',
          700: '#8a6832',
          800: '#725530',
          900: '#5e472b',
        },
        neutral: {
          50: '#fafbfa',
          100: '#f5f6f5',
          200: '#e6e8e6',
          300: '#d1d5d1',
          400: '#8e9b87',
          500: '#5a6b52',
          600: '#4a5943',
          700: '#3d4839',
          800: '#343a31',
          900: '#2c3129',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'bounce-soft': 'bounceSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        soft: '0 2px 15px 0 rgba(0, 0, 0, 0.08)',
        medium: '0 4px 25px 0 rgba(0, 0, 0, 0.12)',
        large: '0 8px 40px 0 rgba(0, 0, 0, 0.16)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
