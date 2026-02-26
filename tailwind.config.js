/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#007BFF",
        "cyber-purple": "#8A2BE2",
      },
      transitionProperty: {
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
        "background-color": "background-color",
        "box-shadow": "box-shadow",
      },
    },
  },
  plugins: [],
};