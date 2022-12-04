/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': {
          '50': '#f1fcf4',
          '100': '#ddfbe7',
          '200': '#bef4d1',
          '300': '#8beaad',
          '400': '#51d782',
          '500': '#2abd60',
          '600': '#1d9f4d',
          '700': '#1a7b3e',
          '800': '#1a6135',
          '900': '#17502e',
        },
      }
    },
  },
  plugins: [],
}
