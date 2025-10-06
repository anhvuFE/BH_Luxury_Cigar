/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbf0',
          100: '#fef7e0',
          200: '#fcebb8',
          300: '#f9dc8a',
          400: '#f5c550',
          500: '#f1b429',
          600: '#e2a11f',
          700: '#bb821a',
          800: '#976919',
          900: '#7c5719',
          950: '#462e0a',
        }
      }
    },
  },
  plugins: [],
}