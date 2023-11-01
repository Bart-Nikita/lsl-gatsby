import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import { GlobalContext, globalState } from "../context/context"
import Layout from "../components/layout/Layout"
import BlogList from "../components/pages/BlogPage/BlogList/BlogList"
import Online from "../components/common/Online/Online"
import {  SUBSCRIPTION_MAIL_SUBJECT } from "../config"

export const Head = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}


const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({ data }: PageProps<Queries.BlogPageQuery>) => {
    //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <BlogList></BlogList>
      <Online mailSubject={SUBSCRIPTION_MAIL_SUBJECT}></Online>
    </Layout>
  </GlobalContext.Provider>
}

export default BlogPage

export const query = graphql` query BlogPage {
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
  allFile {
    nodes {
      name
      publicURL
    }
  }
  wpPage(slug: {eq: "blog"}) {
    slug
    metaData {
        metaOpisanie
        metaZagolovok
      }
    blogPage {
      blogZagolovok
    }
  }
  allWpBlog(sort: {date: DESC}) {
    nodes {
      slug
      id
      blog {
        blogPostHeroKratkoeOpisanie
        blogPostHeroZagolovok
        blogPostPreviewIzobrazhenieDlyaKompyuteraX1 {
          altText
          gatsbyImage(width: 600, outputPixelDensities: 2, formats: WEBP)
        }
      }
    }
  }
  allWpCommonSection {
    nodes {
      slug
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
          gatsbyImage(outputPixelDensities: 2, width: 100, formats: WEBP,  placeholder: NONE)
        }
      }
      online {
        onlineTekst
        onlineTekstKnopki
        onlineZagolovok
      }
    }
  }
  allWpPublication {
    nodes {
      slug
      publications {
        publicationsAdresSsylki
        publicationsKratkoeOpisanie
        publicationsNazvanie
        publicationsPodrobnoeOpisanie
        publicationsImageKompyuter1x {
          altText
          gatsbyImage(width: 500, outputPixelDensities: 2, formats: WEBP)
        }
      }
    }
  }

}
`

