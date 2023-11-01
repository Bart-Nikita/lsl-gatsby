import { CreatePagesArgs } from "gatsby"
import path from "path"
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql<Queries.AllBlogPostQuery>(
    `
    query AllBlogPost {
      allWpMenuItem(filter: {parentId: {eq: null}}, sort: {order: ASC}) {
        nodes {
            label
            url
            childItems {
                nodes {
                    url
                    label
                    childItems {
                        nodes {
                            url
                            label
                        }
                    }
                }
            }
        }
    }
    wpMenu(slug: {eq: "osnovnoe"}) {
      favicon {
        favikon {
          sourceUrl
        }
      }
      formMails {
        formsMails {
          email
        }
      }
    }
     site {
      siteMetadata {
        title
        url
      }
    }
      allFile {
        nodes {
          name
          publicURL
        }
      }
      allWpCommonSection {
        nodes {
          slug
          online {
            onlineTekst
            onlineTekstKnopki
            onlineZagolovok
          }
          cookies {
            fieldGroupName
            cookiesPolitikaKonfidenczialnosti {
              publicUrl
            }
          }
          footer {
            footerAdresSajta
            footerContactsZagolovok
            footerKopirajt
            footerMenuZagolovok
            footerSocialRemarka
            footerSocialZagolovok
            footerContactsSpisok {
              footerContactsEstKommentarij
              footerContactsHref
              footerContactsKommentarij
              footerContactsTekst
            }
            footerLogotip {
              altText
              gatsbyImage(
                width: 200
                outputPixelDensities: 2
                formats: WEBP
                placeholder: NONE
              )
            }
            footerPublichnayaOferta {
              publicUrl
            }
            footerSocialSpisok {
              footerSocialAdres
              footerSocialTekst
              footerSocialIkonka {
                altText
                gatsbyImage(width: 100, outputPixelDensities: 2, formats: WEBP)
              }
            }
            footerPolitikaKonfidenczialnosti {
              publicUrl
            }
            footerSoglasieNaObrabotkuPersonalnyhDannyh {
              publicUrl
            }
            footerSoglasieNaReklamu {
              publicUrl
            }
          }
          header {
            headerAdresSajta
            headerLogotipAlt
            headerTelefon
            headerLogotip {
              altText
              gatsbyImage(outputPixelDensities: 2, width: 100, formats: WEBP)
            }
          }
         
        }
      }
        allWpBlog(sort: {date: DESC}) {
          nodes {
            pageStatus {
              status
            }
            slug
            blog {
              blogPostContentTekst
              blogPostHeroKratkoeOpisanie
              blogPostHeroZagolovok
              blogPostMediaTekstNadIzobrazheniem
              blogPostMediaTekstPodVideo
              blogPostHeroImageKompyuter1x {
                altText
                gatsbyImage(outputPixelDensities: 2, width: 1500, formats: WEBP)
              }
              blogPostMediaIzobrazhenieDlyaKompyuteraX1 {
                altText
                gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
              }
              blogPostMediaVideo {
                mediaItemUrl
              }
              blogPostMediaZastavkaDlyaVideoKompyuter {
                altText
                gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
              }
              blogPostPreviewIzobrazhenieDlyaKompyuteraX1 {
                altText
                gatsbyImage(outputPixelDensities: 2, width: 500, formats: WEBP)
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors || !result) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`)


  result.data?.allWpBlog.nodes.forEach((node) => {
    createPage({
      path:`/blog/${node.slug}`,
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        menuItems: result.data?.allWpMenuItem.nodes,
        site: result.data?.site,
        allFiles:  result.data?.allFile?.nodes,
        slug: 'blogPost',
        commonSections: result.data?.allWpCommonSection.nodes,
        allPosts: result.data?.allWpBlog.nodes,
        post: node,
        url: process.env.BASE_URL || 'http://localhost:9000',
        favicon: result.data?.wpMenu?.favicon?.favikon?.sourceUrl,
        emails: result.data?.wpMenu?.formMails?.formsMails
      },
    })
  })
}