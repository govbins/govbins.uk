const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  theme: {
    fontFamily: {
      ...defaultTheme.fontFamily,
      rubik: ["Rubik", ...defaultTheme.fontFamily.sans]
    }
  },
  variants: {},
  plugins: [],
}
