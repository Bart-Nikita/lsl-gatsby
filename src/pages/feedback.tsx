import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.FeedbacksPageQuery>) => {
  console.log(data?.site)


  return (
<Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>  )
}




const FeedbacksPage: React.FC<PageProps<Queries.FeedbacksPageQuery>> = ({ data }: PageProps<Queries.FeedbacksPageQuery>) => {
  console.log(data)
  return <div>
    {data?.wpPage?.metaData?.metaZagolovok}
  </div>
}

export default FeedbacksPage

export const query = graphql` query FeedbacksPage {
  site {
    siteMetadata {
      title
      url
    }
  }
  wpPage(slug: {eq: "otzyvy"}) {
    metaData {
      metaOpisanie
      metaZagolovok
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
      feedbacks {
        feedbacksPodzagolovok
        feedbacksPodzagolovok1
        feedbacksZagolovok
        feedbacksZagolovok1
        feedbacksZagolovok2
        feedbacksImageSlajder {
          feedbacksImageKompyuter1x {
            altText
            sourceUrl
          }
          feedbacksImageKompyuter2x {
            altText
            sourceUrl
          }
          feedbacksImageTelefon1x {
            altText
            sourceUrl
          }
          feedbacksImageTelefon2x {
            altText
            sourceUrl
          }
        }
        feedbacksSimpleSlajder {
          feedbacksSimpleImya
          feedbacksSimpleOpisanieKlienta
          feedbacksSimpleTekstOtzyva
          feedbacksSimpleKompyuter1x {
            altText
            sourceUrl
          }
          feedbacksSimpleKompyuter2x {
            altText
            sourceUrl
          }
          feedbacksSimpleTelefon1x {
            altText
            sourceUrl
          }
          feedbacksSimpleTelefon2x {
            altText
            sourceUrl
          }
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
      messenger {
        messengerPodzagolovok
        messengerSsylkaKnopki
        messengerTekstKnopki
        messengerTelefon
        messengerZagolovok
        messengerImageKompyuter1x {
          altText
          sourceUrl
        }
        messengerImageKompyuter2x {
          altText
          sourceUrl
        }
        messengerImageTelefon1x {
          altText
          sourceUrl
        }
        messengerImageTelefon2x {
          altText
          sourceUrl
        }
      }
    }
  }
  allWpPublication {
    nodes {
      slug
      id
      publications {
        publicationsAdresSsylki
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

