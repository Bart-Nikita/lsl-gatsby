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
      "url": process.env.GATSBY_GRAPHQL_ENDPOINT || "https://admin.littlesweetlemon.ru//graphql"
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,

    },
  }, {
    resolve: `gatsby-plugin-sharp`,
    options: {
      icon: 'src/images/gatsby-icon.png' 
  }
  },{
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Детские развивающие тренажеры Little Sweet Lemon`,
      short_name: `Little Sweet Lemon`,
      description: `Производство развивающих тренажеров для нужд детей, проходящих путь восстановления и тренировок разных групп мышц. Чуткий подход к восстановлению детей`,
      lang: `ru`,
      display: `standalone`,
      icon: `src/images/gatsby-icon.png`,
      icons: [
        {
          src: `/favicons/android-chrome-192x192.png`,
          sizes: `192x192`,
          type: `image/png`,
        },
        {
          src: `/favicons/android-chrome-512x512.png`,
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
      start_url: `/`,
      background_color: `#000`,
      theme_color: `#fff`,
    
    },
  }, "gatsby-plugin-image", "gatsby-transformer-sharp", "gatsby-plugin-postcss"]
};

export default config;
