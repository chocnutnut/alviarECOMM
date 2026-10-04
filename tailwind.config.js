/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f5f7",
        ink: "#14161c",
        muted: "#5e6775",
        line: "#e3e6ee",
        accent: "#4f46e5",
        accentDark: "#3730a3",
        surface: "#ffffff",
      },
      fontFamily: {
        sans: ['Outfit', "Segoe UI", "sans-serif"],
        serif: ['Outfit', "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
}

