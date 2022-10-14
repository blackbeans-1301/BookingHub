module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#37b5ff",
        "light-primary": "#B0E2FF",
        "colorText": "#555555",
        "light-close": "#F6B297",
        "close-color": "#E33539",
      },
      height: {
        '1000': '32rem',
      },
      backgroundImage: {
        'ownerPageBG': "url('https://img.freepik.com/free-vector/organic-flat-new-normal-hotels-illustration_23-2148926018.jpg?w=2000')",
      }
    },
  },
  plugins: [],
}
