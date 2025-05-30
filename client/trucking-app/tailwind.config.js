/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      height: {
        200: "400px",
      },
      width: {
        200: "400px",
      },
      colors: {
        orange: "#FFA726",
      },
      backgroundColor: {
        thinblue: "#ebf2f2",
        greey: "#e0e0de",
      },
      fontWeight: {
        hundred: "100",
      },
      borderColor: {
        lightblack: "#0000",
      },
      borderWidth: {
        "1": "1px", // Ensure the key is a string
        greey: "1px", // If this is supposed to be `#e0e0de`, move it to `colors`
        orangeTwo: "1px", // If this is a color, move it to `colors`
      },
      animation: {
        "blink-colors": "blink-colors 2s infinite",
      },
      keyframes: {
        "blink-colors": {
          "0%": { color: "#ef4444" },
          "20%": { color: "#3b82f6" },
          "40%": { color: "#10b981" },
          "60%": { color: "#f59e0b" },
          "80%": { color: "#8b5cf6" },
          "100%": { color: "#ec4899" },
        },
      },
    },
  },
  plugins: [],
};
