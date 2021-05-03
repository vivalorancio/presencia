const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#d7deee",
          200: "#afbddd",
          300: "#879ccb",
          400: "#5f7bba",
          500: "#375aa9",
          600: "#2c4887",
          700: "#213665",
          800: "#162444",
          900: "#0b1222",
        },

        accent: {
          100: "#ccf3ff",
          200: "#99e7ff",
          300: "#66dbff",
          400: "#33cfff",
          500: "#00c3ff",
          600: "#009ccc",
          700: "#007599",
          800: "#004e66",
          900: "#002733",
        },
        secondary: {
          100: "#f2d6d3",
          200: "#e6ada6",
          300: "#d9847a",
          400: "#cd5b4d",
          500: "#c03221",
          600: "#9a281a",
          700: "#731e14",
          800: "#4d140d",
          900: "#260a07",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
