/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        matematica: '#6366f1',
        portugues: '#ec4899',
        ciencias: '#10b981',
        historia: '#f59e0b',
        geografia: '#3b82f6',
        ingles: '#8b5cf6',
      },
    },
  },
  plugins: [],
};
