import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  console.log(data?.site)


  return (
<Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>  )
}




const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  console.log(data)
  return <div>
    {data?.wpPage?.metaData?.metaZagolovok}
  </div>
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
        fieldGroupName
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

