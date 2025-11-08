/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0d1117",
        darkCard: "#161b22",
        darkBorder: "#30363d",
        darkText: "#e6edf3",
        accent: "#238636"
      }
    },
  },
  darkMode: "class",
};
