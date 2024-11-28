/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "8/10": "80%",
      },
      maxWidth: {
        128: "36rem",
      },
    },
  },
  plugins: [],
};
