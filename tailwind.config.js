/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B1E2D',
          light: '#A52A3A',
          dark: '#6B1723',
        },
        surface: {
          DEFAULT: '#FAFAF9',
          dark: '#1C1917',
        }
      }
    }
  },
  plugins: [],
}
