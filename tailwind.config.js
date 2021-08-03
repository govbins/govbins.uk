/* eslint-disable no-undef */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      colors: {
        pink: {
          400: "#ea47cb",
        },
        gray: {
          400: "#f8f8f8",
          500: "#1f2937",
        },
      },
      fontFamily: {
        rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      height: {
        128: "36rem",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
  purge: ["./components/*.js", "./pages/*.js"],
};
