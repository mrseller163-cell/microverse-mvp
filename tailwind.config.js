/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",           // ← новая папка App Router
    "./components/**/*.{js,ts,jsx,tsx}",    // ← общие компоненты
    "./pages/**/*.{js,ts,jsx,tsx}",         // ← старый Pages Router (если используешь)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}