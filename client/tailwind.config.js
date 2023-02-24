/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          base: "#FFFFFF",
          primary: "#708C4F",
          secondary: "#42542D",
          typoStrong: "#1C1C1C",
          typoSoft: "#7E7E7F"
        },
        dark: {
          base: "#43465B",
          primary: "#708C4F",
          secondary: "#42542D",
          typoStrong: "#BABABA",
          typoSoft: "#F4F4F4"
        }
      }
    },
  },
  plugins: [
  ],
}
