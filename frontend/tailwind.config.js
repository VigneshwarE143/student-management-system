/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf3',
          100: '#d1fadf',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#0f766e',
          600: '#0d5c56',
          700: '#0b443f',
        },
        surface: '#0b1726',
        card: '#0f1f33',
        border: '#22344d',
      },
      fontFamily: {
        display: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 50px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
