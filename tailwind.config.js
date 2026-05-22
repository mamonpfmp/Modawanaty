/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: 'rgba(255,255,255,0.05)',
          100: 'rgba(255,255,255,0.08)',
          200: '#4a4a8a',
          300: '#7878aa',
          400: '#9999bb',
          500: '#2e2eff',
          600: '#1a1aee',
          700: '#151550',
          800: '#0e0e3a',
          900: '#0a0a2e',
          950: '#070720',
        },
        teal: {
          400: '#33ffe0',
          500: '#00d6d6',
          600: '#00b3b3',
        },
        surface: '#0f0f3d',
        'surface-light': '#161655',
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
