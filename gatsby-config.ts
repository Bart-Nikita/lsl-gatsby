import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Little Sweet Lemon`,
    url: process.env.BASE_URL || 'http://localhost:9000'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url":process.env.GATSBY_GRAPHQL_ENDPOINT || "https://lsl-test.bart-group.com/back/graphql"
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `images`,
        path: `${__dirname}/src/images`,

    },
}, "gatsby-plugin-image", "gatsby-transformer-sharp",  `gatsby-plugin-sharp`, "gatsby-plugin-postcss"]
};

export default config;
