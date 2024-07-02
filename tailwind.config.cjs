const colors = require('tailwindcss/colors');

deleteDeprecatedColors(colors);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      'theme-blue': '#00acdd',
      'theme-green': '#74d813',
      'theme-border': '#e0e0e0',
      'theme-light-gray': '#c6c6c6',
      'theme-medium-gray': '#8e8e8e',
      'theme-dark-gray': '#6b6b6b',
      'theme-extra-dark-gray': '#3d3d3d',
    },
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};

function deleteDeprecatedColors(colors) {
  ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray'].forEach(
    function deleteColor(color) {
      delete colors[color];
    }
  );
}
