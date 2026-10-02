export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nebula: { bg: "#07070A", accent: "#3B82F6", gold: "#D4AF37" },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
}
