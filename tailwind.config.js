/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A3830",
        },
      },

      fontFamily: {
        dmSans: "'DM Sans', sans-serif",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
