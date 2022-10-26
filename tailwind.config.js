/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'darkGray': '#242424',
        'lightGray': '#ededed',
      },
      boxShadow: {
        'whitePiece': '0 0 15px rgba(0,0,0,0.3)',
        'blackPiece': '0 0 10px rgba(0,0,0,0.8)',
      },
      screens: {
        'edge': '960px',
      },
      fontFamily: {
        'sans': ['Teko', 'sans-serif'],
        'amatic': ['Amatic SC', 'cursive'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-slow': 'fade-in 1s linear',
      },
    },
  },
  plugins: [],
}
