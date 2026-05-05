/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Tu może dodać specyficzne dla RPG kolory, np. złoty dla XP
    },
  },
  plugins: [],
}