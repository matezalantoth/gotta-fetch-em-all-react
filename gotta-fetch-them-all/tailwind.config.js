/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/sections/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scale: {
        '200': '2',
      },
      backgroundImage: {
        locationsPage: "url('./src/assets/main.jpg')",
        battlePage: "url('./src/assets/battle.jpg')",
        pokemonLogo: "url('./src/assets/pokemon_logo.jpg')",
      },
      animation: {
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        'shake': {
          '10%, 90%': {
            transform: 'translate(-2px, 0) scale(2)',
          },
          '20%, 80%': {
            transform: 'translate(4px, 0) scale(2)',
          },
          '30%, 50%, 70%': {
            transform: 'translate(-8px, 0) scale(2)',
          },
          '40%, 60%': {
            transform: 'translate(8px, 0) scale(2)',
          },
        },
      },
    },
  },
  plugins: [],
};
