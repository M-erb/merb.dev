export default (pollen) => ({
  output: './src/styles/variables.css',
  modules: {
    color: {
      ...pollen.color,
      'red-100': '#fff0f0',
      white: '#fff',
      black: '#1b1b1b',
      'blue-300': '#5fd7ef',
      'blue-500': '#47afc2',
      'blue-700': '#3897A8',
      'orange-300': '#faad9e',
      'orange-500': '#F55F41',
      'orange-700': '#e9310c',
      'purple-300': '#C9AFD5',
      'purple-500': '#A072B5',
      'purple-700': '#7d4d93'
    }
  }
})
