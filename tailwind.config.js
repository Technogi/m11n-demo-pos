/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["monospace"],
      },
      colors: {
        magenta: "#a70e9e",
        "blue-cli": "#0400a1",
      },
    },
  },
  plugins: [],
};
