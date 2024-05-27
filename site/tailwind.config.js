const colors = require('tailwindcss/colors');

// Import the necessary modules

module.exports = {
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './index.html'
  ],
  darkMode: 'media', // Set darkMode to 'media'
  theme: {
    extend: {
      colors: {
        // Add any custom colors you need
        teal: colors.teal,
      },
      aspectRatio: {
        '5/13': '5 / 13',
        '16/10': '16 / 10',
      },
      borderRadius: {
        'large': '50px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
