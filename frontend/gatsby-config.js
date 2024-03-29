require("dotenv").config({
  path: `.env.development`,
})

module.exports = {
  siteMetadata: {
    title: `BookingHub`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
    DEV_SSR: false
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/images/icon.png",
      },
    },
    "gatsby-plugin-use-query-params",
  ],
}
