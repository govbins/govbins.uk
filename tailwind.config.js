/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {},
  plugins: [],
  purge: {
    layers: ['utilities'],
  }
};
