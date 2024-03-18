/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        locationsPage: "url('./src/assets/main.jpg')",
        battlePage: "url('./src/assets/battle.jpg')",
      },
    },
  },
  plugins: [],
};
