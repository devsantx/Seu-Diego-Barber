/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#C9A24A', light: '#EAD38F', dark: '#8E6B2C', darker: '#59431F' },
        bark: { DEFAULT: '#151515', gray: '#3A3A3A', deep: '#050505' },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
