import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}'
]

export const theme = {
  extend: {
    fontFamily: {
      coolvetica: ['var(--font-coolvetica)', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      'mine-shaft': {
        50: '#f7f7f7',
        100: '#e3e3e3',
        200: '#c8c8c8',
        300: '#a4a4a4',
        400: '#818181',
        500: '#666666',
        600: '#515151',
        700: '#434343',
        800: '#383838',
        900: '#333333',
        950: '#1a1a1a'
      }
    },
    keyframes: {
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      'fade-out': {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' }
      },
      'slide-up': {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0)' }
      },
      'slide-down': {
        '0%': { transform: 'translateY(0)' },
        '100%': {
          transform: 'translateY(100%)'
        }
      }
    },
    animation: {
      'fade-in': 'fade-in 0.3s ease-in-out',
      'fade-out': 'fade-out 0.3s ease-in-out',
      'slide-up': 'slide-up 0.3s ease-in-out forwards',
      'slide-down': 'slide-down 0.3s ease-in-out forwards'
    }
  }
}
export const plugins = []