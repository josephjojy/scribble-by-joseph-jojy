
module.exports = {
  important: true,
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {

    extend: {
      colors:{
        indigo_50:"#EEF2FF",
      },
      spacing: {
        500: '500px',
        600: '600px',
        800: '800px',
      }

    },
  },
  variants: {
    backgroundColor: ["odd", "even"],
  },

  plugins: [],
}
