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
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

