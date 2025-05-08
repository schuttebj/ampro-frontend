/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        background: '#f5f5f5',
        text: '#333333',
      },
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 