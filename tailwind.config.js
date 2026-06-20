/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F4D6D6",
        sage: "#A8BBA3",
        butter: "#F6E8A6",
        taupe: "#C7B8A3",
        dustyblue: "#AFC4D5",
        silver: "#D8D8D8"
      }
    }
  },
  plugins: []
}