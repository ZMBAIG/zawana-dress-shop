/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zawana: {
          50: '#fdf8f6',
          100: '#f9efe9',
          200: '#f2ddd0',
          300: '#e8c4b0',
          400: '#d9a288',
          500: '#c88a6e',
          600: '#b36f55',
          700: '#955a47',
          800: '#7a4b3e',
          900: '#644036',
          950: '#35201b',
        },
        gold: {
          400: '#d4af37',
          500: '#c9a227',
          600: '#b8860b',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
