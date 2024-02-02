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
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
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
          publicUrl
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
            gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 400, placeholder: NONE)
          }
        }
        feedbacksSimpleSlajder {
          feedbacksSimpleImya
          feedbacksSimpleOpisanieKlienta
          feedbacksSimpleTekstOtzyva
          feedbacksSimpleKompyuter1x {
            altText
            gatsbyImage(formats: WEBP, width: 400, outputPixelDensities: 2, placeholder: NONE)
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
      messenger {
        messengerPodzagolovok
        messengerSsylkaKnopki
        messengerTekstKnopki
        messengerTelefon
        messengerZagolovok
        messengerImageKompyuter1x {
          altText
          gatsbyImage(width: 400, formats: WEBP, outputPixelDensities: 2)
        }
      }
    }
  }
  allWpPublication(sort: {date: DESC}) {
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

