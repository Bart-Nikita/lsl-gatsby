import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Online from "../components/common/Online/Online"
import TrainingsAbout from "../components/pages/TrainingsPage/TrainingsAbout/TrainingsAbout"
import TrainingsAdvantages from "../components/pages/TrainingsPage/TrainingsAdvantages/TrainingsAdvantages"
import TrainingsDelivery from "../components/pages/TrainingsPage/TrainingsDelivery/TrainingsDelivery"
import TrainingsFeedbacks from "../components/pages/TrainingsPage/TrainingsFeedbacks/TrainingsFeedbacks"
import TrainingsGift from "../components/pages/TrainingsPage/TrainingsGift/TrainingsGift"
import TrainingsHero from "../components/pages/TrainingsPage/TrainingsHero/TrainingsHero"
import TrainingsSelect from "../components/pages/TrainingsPage/TrainingsSelect/TrainingsSelect"
import TrainingsSteps from "../components/pages/TrainingsPage/TrainingsSteps/TrainingsSteps"
import { GlobalContext, globalState } from "../context/context"
import Layout from "../components/layout/Layout"

export const Head = ({ data }: PageProps<Queries.TrainingsPageQuery>) => {

  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const TrainingsPage: React.FC<PageProps<Queries.TrainingsPageQuery>> = ({ data }: PageProps<Queries.TrainingsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <TrainingsHero></TrainingsHero>
      <TrainingsAdvantages></TrainingsAdvantages>
      <TrainingsSelect></TrainingsSelect>
      <TrainingsGift></TrainingsGift>
      <TrainingsDelivery></TrainingsDelivery>
      <TrainingsSteps></TrainingsSteps>
      <TrainingsFeedbacks></TrainingsFeedbacks>
      <Online className={'mb-[140px] xl:mb-[92px] md:mb-[64px]'}></Online>
      <TrainingsAbout></TrainingsAbout>
    </Layout>
  </GlobalContext.Provider>
}

export default TrainingsPage

export const query = graphql` query TrainingsPage {

   wpMenu(slug: {eq: "osnovnoe"}) {
    favicon {
      favikon {
        sourceUrl
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
  wpPage(slug: {eq: "trenazhery"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
    }
    trainings {
      trainingsAboutIzobrazhenieDlyaKompyutera {
        altText
        gatsbyImage(width: 800, outputPixelDensities: 2, formats: WEBP, placeholder: NONE)
      }
      trainingsAboutTekst
      trainingsAboutZagolovok
      trainingsDeliveryZagolovok
      trainingsAdvantagesSpisok {
        tekst
        zagolovok
        dekor {
          altText
          gatsbyImage(width: 400, outputPixelDensities: 2, formats: WEBP, placeholder: NONE)
        }
      }
      trainingsDeliverySpisok {
        tekst
        dekor {
          altText
          gatsbyImage(height: 200, outputPixelDensities: 2, formats: WEBP, placeholder: NONE)
        }
      }
      trainingsGiftIzobrazhenieDlyaKompyuteraX1 {
        altText
        gatsbyImage(width: 700, outputPixelDensities: 2, formats: WEBP)
      }
      trainingsGiftTekst
      trainingsHeroIzobrazhenieDlyaKompyuteraX1 {
        altText
          gatsbyImage(width: 1500, outputPixelDensities: 2, formats: WEBP)
      }
      trainingsHeroPodzagolovok
      trainingsHeroZagolovok
      trainingsModalSpisokGorodov {
        nazvanieGoroda
      }
      trainingsSelectPodzagolovok
      trainingsSelectZagolovok
      trainingsStepsList {
        tekst
      }
      trainingsStepsRemarka
      trainingsStepsZagolovok
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
          gatsbyImage(width: 200, outputPixelDensities: 2, formats: WEBP, placeholder: NONE)
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
            gatsbyImage(width: 100, outputPixelDensities: 2, formats: WEBP)
          }
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
 
  allWpTraining(sort: {date: DESC}) {
    nodes {
      title
      slug
      training {
        trainingCzena
        trainingEstVNalichii
        trainingKratkoeOpisanie
        trainingPodrobnoeOpisanie
        trainingGallereya {
          izobrazhenieDlyaKompyutera {
            altText
            gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
          }
          video {
            mediaItemUrl
          }
        }
        trainingImageKompyuter {
          altText
          gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
        }
        trainingVRamke {
          tekst
        }
      }
    }
  }
}
`

