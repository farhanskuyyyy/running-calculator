/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['"DM Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#C17E61',
          light: '#D4967B',
          dark: '#A66B50',
        },
        surface: {
          DEFAULT: '#F9FAFB',
          dark: '#1A1A1A',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
        },
        rule: {
          DEFAULT: '#E5E7EB',
          dark: '#2A2A2A',
        },
      },
    },
  },
  plugins: [],
}
