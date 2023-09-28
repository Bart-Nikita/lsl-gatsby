import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import { GlobalContext, globalState } from "../context/context"
import Layout from "../components/layout/Layout"
import BlogList from "../components/pages/BlogPage/BlogList/BlogList"
import Online from "../components/common/Online/Online"

export const Head = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  return (
    <Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}




const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({ data }: PageProps<Queries.BlogPageQuery>) => {
    //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <BlogList></BlogList>
      <Online></Online>
    </Layout>
  </GlobalContext.Provider>
}

export default BlogPage

export const query = graphql` query BlogPage {
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
  allWpBlog {
    nodes {
      slug
      id
      blog {
        blogPostHeroKratkoeOpisanie
        blogPostHeroZagolovok
        blogPostPreviewIzobrazhenieDlyaKompyuteraX1 {
          altText
          sourceUrl
        }
        blogPostPreviewIzobrazhenieDlyaKompyuteraX2 {
          altText
          sourceUrl
        }
        blogPostPreviewIzobrazhenieDlyaTelefonaX1 {
          altText
          sourceUrl
        }
        blogPostPreviewIzobrazhenieDlyaTelefonaX2 {
          altText
          sourceUrl
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
          mediaItemUrl
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
          sourceUrl
        }
        footerLogotipMobile {
          altText
          sourceUrl
        }
        footerPolitikaKonfidenczialnosti {
          mediaItemUrl
        }
        footerPublichnayaOferta {
          mediaItemUrl
        }
        footerSocialSpisok {
          footerSocialAdres
          footerSocialTekst
          footerSocialIkonka {
            altText
            sourceUrl
          }
        }
      }
      header {
        headerAdresSajta
        headerLogotipAlt
        headerTelefon
        headerLogotip {
          altText
          sourceUrl
        }
        headerLogotipMobile {
          altText
          sourceUrl
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
          sourceUrl
        }
        publicationsImageKompyuter2x {
          altText
          sourceUrl
        }
        publicationsImageTelefon1x {
          altText
          sourceUrl
        }
        publicationsImageTelefon2x {
          altText
          sourceUrl
        }
      }
    }
  }

}
`

