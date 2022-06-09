require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  plugins: [
    `@raae/gatsby-theme-queen`,
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "CrowdcastWebinar",
        imagePath: "coverSrc",
        name: "cover",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `dominantColor`,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
  ],
};
