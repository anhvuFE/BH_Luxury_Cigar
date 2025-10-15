/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7e8',
          100: '#feebc2',
          200: '#fcdb88',
          300: '#fac54f',
          400: '#f8b024',
          500: '#D5B266',
          600: '#b8941a',
          700: '#9a7b15',
          800: '#7c6214',
          900: '#654f13',
        },
        dark: {
          900: '#1b1f23',
        }
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'heading': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
        'body': ['Source Sans Pro', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'luxury': ['Crimson Text', 'Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

