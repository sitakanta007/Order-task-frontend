// tailwind.config.cjs  (or .js)
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // LIGHT
        lightBg: "#f7f8fb",
        lightCard: "#ffffff",
        lightCard2: "#fafbff",
        lightBorder: "#e5e9f2",
        lightBorderStrong: "#d7dce6",
        lightPrimary: "#0f172a",
        lightSecondary: "#475569",

        // DARK (you already have some—keeping consistent)
        darkBg: "#0d1117",
        darkBg2: "#0b0f14",
        darkCard: "#11161c",
        darkCard2: "#141a22",
        darkBorder: "#263041",
        darkPrimary: "#e6edf3",
        darkSecondary: "#9aa5b1",

        // Brand accents
        brand: {
          50:  "#f2f6ff",
          100: "#e6eeff",
          200: "#cdddfd",
          300: "#a7c3fb",
          400: "#7aa2f8",
          500: "#4f83f3", // main
          600: "#3569d9",
          700: "#2c55b3",
          800: "#24468f",
          900: "#1f3b76",
        },
        accent: "#4f83f3"
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(15, 23, 42, 0.06)",
        card: "0 6px 16px rgba(15, 23, 42, 0.08)",
      },
    },
  },
};
