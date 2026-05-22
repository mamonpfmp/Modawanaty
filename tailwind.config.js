/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#eeedfa',
          100: '#d0cef5',
          200: '#a8a5eb',
          300: '#7a75de',
          400: '#5350d4',
          500: '#2e2eff',
          600: '#2424cc',
          700: '#1a1a99',
          800: '#111166',
          900: '#0d065b',
        },
        teal: {
          50: '#e0fafa',
          100: '#b3f2f2',
          200: '#80ebeb',
          300: '#4de3e3',
          400: '#1adcdc',
          500: '#00d6d6',
          600: '#00abab',
          700: '#008080',
          800: '#005555',
          900: '#002b2b',
        },
        surface: '#f3f3f1',
      },
    },
  },
  plugins: [],
};
