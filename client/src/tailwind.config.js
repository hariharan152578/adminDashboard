// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // Keep your brand colors
      colors: {
        'brand-orange': '#F57C00',
        'brand-orange-dark': '#E65100',
        'brand-blue-dark': '#0D47A1',
        'brand-blue-primary': '#1976D2',
        'brand-blue-light': '#E3F2FD',
        'brand-red': '#D32F2F',
        'brand-green': '#10B981',
      },
      // ... (your animations)
    },
  },
  plugins: [],
};