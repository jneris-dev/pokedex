/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        types: {
          bug: '#8CB230',
          dark: '#58575F',
          dragon: '#0F6AC0',
          electric: '#eab308',
          fairy: '#ED6EC7',
          fighting: '#D04164',
          fire: '#FD7D24',
          flying: '#748FC9',
          ghost: '#556AAE',
          grass: '#62B957',
          ground: '#DD7748',
          ice: '#61CEC0',
          normal: '#9DA0AA',
          poison: '#A552CC',
          psychic: '#EA5D60',
          rock: '#BAAB82',
          steel: '#417D9A',
          water: '#4A90DA',
          stellar: '#d1d1d1',
          unknown: '#6FC996'
        },
        backgroundType: {
          bug: '#8BD674',
          dark: '#6F6E78',
          dragon: '#7383B9',
          electric: '#F2CB55',
          fairy: '#EBA8C3',
          fighting: '#EB4971',
          fire: '#FFA756',
          flying: '#83A2E3',
          ghost: '#8571BE',
          grass: '#8BBE8A',
          ground: '#F78551',
          ice: '#91D8DF',
          normal: '#B5B9C4',
          poison: '#9F6E97',
          psychic: '#FF6568',
          rock: '#D4C294',
          steel: '#4C91B2',
          water: '#58ABF6',
          stellar: '#4A90DA',
          unknown: '#81E5AD'
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
