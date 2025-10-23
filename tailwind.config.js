/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1a2a52",
        "navy-light": "#2a3a72",
      },
      fontFamily: {
        babycakes: ["Qilka", "sans-serif"],
      },
    },
  },
  plugins: [],
};
