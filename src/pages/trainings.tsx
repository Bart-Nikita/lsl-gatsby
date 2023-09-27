import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.TrainingsPageQuery>) => {
  console.log(data?.site)


  return (
<Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>  )
}




const TrainingsPage: React.FC<PageProps<Queries.TrainingsPageQuery>> = ({ data }: PageProps<Queries.TrainingsPageQuery>) => {
  console.log(data)
  return <div>
    {data?.wpPage?.metaData?.metaZagolovok}
  </div>
}

export default TrainingsPage

export const query = graphql` query TrainingsPage {
  site {
    siteMetadata {
      title
      url
    }
  }
  wpPage(slug: {eq: "trenazhery"}) {
    metaData {
      metaOpisanie
      metaZagolovok
    }
    trainings {
      trainingsAboutIzobrazhenieDlyaKompyutera {
        altText
        sourceUrl
      }
      trainingsAboutIzobrazhenieDlyaPlansheta {
        altText
        sourceUrl
      }
      trainingsAboutIzobrazhenieDlyaTelefona {
        altText
        sourceUrl
      }
      trainingsAboutTekst
      trainingsAboutZagolovok
      trainingsDeliveryZagolovok
      trainingsAdvantagesSpisok {
        tekst
        zagolovok
        dekor {
          altText
          sourceUrl
        }
      }
      trainingsDeliverySpisok {
        tekst
        dekor {
          altText
          sourceUrl
        }
      }
      trainingsGiftIzobrazhenieDlyaKompyuteraX1 {
        altText
        sourceUrl
      }
      trainingsGiftIzobrazhenieDlyaKompyuteraX2 {
        altText
        sourceUrl
      }
      trainingsGiftIzobrazhenieDlyaTelefonaX1 {
        altText
        sourceUrl
      }
      trainingsGiftIzobrazhenieDlyaTelefonaX2 {
        altText
        sourceUrl
      }
      trainingsGiftTekst
      trainingsHeroIzobrazhenieDlyaKompyuteraX1 {
        altText
        sourceUrl
      }
      trainingsHeroIzobrazhenieDlyaKompyuteraX2 {
        altText
        sourceUrl
      }
      trainingsHeroIzobrazhenieDlyaTelefonaX1 {
        altText
        sourceUrl
      }
      trainingsHeroIzobrazhenieDlyaTelefonaX2 {
        altText
        sourceUrl
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
  allWpBlog {
    nodes {
      slug
      blog {
        blogPostContentTekst
        blogPostHeroKratkoeOpisanie
        blogPostHeroZagolovok
        blogPostMediaTekstNadIzobrazheniem
        blogPostMediaTekstPodVideo
        blogPostHeroImageKompyuter1x {
          altText
          sourceUrl
        }
        blogPostHeroImageKompyuter2x {
          altText
          sourceUrl
        }
        blogPostHeroImageTelefon1x {
          altText
          sourceUrl
        }
        blogPostHeroImageTelefon2x {
          altText
          sourceUrl
        }
        blogPostMediaIzobrazhenieDlyaKompyuteraX1 {
          altText
          sourceUrl
        }
        blogPostMediaIzobrazhenieDlyaKompyuteraX2 {
          altText
          sourceUrl
        }
        blogPostMediaIzobrazhenieDlyaTelefonaX1 {
          altText
          sourceUrl
        }
        blogPostMediaIzobrazhenieDlyaTelefonaX2 {
          altText
          sourceUrl
        }
        blogPostMediaVideo {
          mediaItemUrl
        }
        blogPostMediaZastavkaDlyaVideoKompyuter {
          altText
          sourceUrl
        }
        blogPostMediaZastavkaDlyaVideoKompyuterKopiya {
          altText
          sourceUrl
        }
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
      online {
        onlineTekst
        onlineTekstKnopki
        onlineZagolovok
      }
    }
  }
 
  allWpTraining {
    nodes {
      slug
      training {
        trainingCzena
        trainingEstVNalichii
        trainingKratkoeOpisanie
        trainingPodrobnoeOpisanie
        trainingGallereya {
          izobrazhenieDlyaKompyutera {
            altText
            sourceUrl
          }
          izobrazhenieDlyaTelefona {
            altText
            sourceUrl
          }
        }
        trainingImageKompyuter {
          altText
          sourceUrl
        }
        trainingImageTelefon {
          altText
          sourceUrl
        }
        trainingMedia {
          mediaItemUrl
        }
        trainingVRamke {
          tekst
        }
      }
    }
  }
}
`

