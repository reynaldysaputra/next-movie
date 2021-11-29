module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '850px',
        xl: '1000px'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
