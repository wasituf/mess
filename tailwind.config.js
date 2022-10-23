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
        'whitePiece': '0 5px 15px rgba(0,0,0,0.2)',
        'blackPiece': '0 5px 10px rgba(0,0,0,0.7)',
      },
      screens: {
        'edge': '960px',
      },
      fontFamily: {
        'sans': ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
