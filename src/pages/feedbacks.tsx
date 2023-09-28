import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import { GlobalContext, globalState } from "../context/context"
import FeedbacksSimple from "../components/common/Feedbacks/FeedbacksSimple/FeedbacksSimple"
import FeedbacksSocial from "../components/common/Feedbacks/FeedbacksSocial/FeedbacksSocial"
import Publications from "../components/common/Publications/Publications"
import Messenger from "../components/common/Messenger/Messenger"
import Layout from "../components/layout/Layout"

export const Head = ({ data }: PageProps<Queries.FeedbacksPageQuery>) => {

  return (
    <Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const FeedbacksPage: React.FC<PageProps<Queries.FeedbacksPageQuery>> = ({ data }: PageProps<Queries.FeedbacksPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <h1 className="hidden">Отзывы</h1>
      <div className="  mt-[70px]
 xl:mt-[50px] md:mt-[37px] sm:mt-[7px]">
        <FeedbacksSimple className={'section-indent-new'}></FeedbacksSimple>
      </div>
      <FeedbacksSocial></FeedbacksSocial>
      <Publications className=" mb-[120px] xl:mb-[75px] xl:mb-[66px] md:mb-[43px] sm:mb-[40px]"></Publications>
      <Messenger className="mb-[130px]  mb-[121px] xl:mb-[18px] xl:mb-[10px] md:mb-[-12px]"></Messenger>
    </Layout>
  </GlobalContext.Provider>
}

export default FeedbacksPage

export const query = graphql` query FeedbacksPage {
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
  wpPage(slug: {eq: "otzyvy"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
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

