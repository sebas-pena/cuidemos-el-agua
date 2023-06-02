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
    }
  }
}
export const plugins = []