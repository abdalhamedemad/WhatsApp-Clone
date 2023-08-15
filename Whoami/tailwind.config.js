/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primarywhite: {
          100: "blue",
          200: "#ffffff",
        },
        primaryblack: {
          1: "rgba(0, 0, 0, 0.8)",
          100: "#000000",
          200: "272729",
        },
        transparent: "transparent",
      },
      container: {
        center: true,
        screens: {
          sm: "600px",
          md: "728px",
          lg: "980px",
          xl: "980px",
          "2xl": "980px",
        },
      },
    },
  },
  plugins: [],
};
