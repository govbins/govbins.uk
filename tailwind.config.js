/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      backgroundColor: {
        gray: '#f8f8f8',
      },
      fontFamily: {
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    }
  },
  variants: {},
  plugins: [],
  purge: [
    './components/*.js',
    './pages/*.js',
  ],
};
