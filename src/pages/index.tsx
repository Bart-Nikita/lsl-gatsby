import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
// import GlobalContextLay from "../components/common/Context"
import HomeTrainings from "../components/pages/HomePage/HomeTrainings/HomeTrainings"
import HomeSafety from "../components/pages/HomePage/HomeSafety/HomeSafety"
import Steps from "../components/common/Steps/Steps"
import Layout from "../components/layout/Layout"
import HomeHero from "../components/pages/HomePage/HomeHero/HomeHero"
import Messenger from "../components/common/Messenger/Messenger"
import HomeAbout from "../components/pages/HomePage/HomeAbout/HomeAbout"
import HomeValues from "../components/pages/HomePage/HomeValues/HomeValues"
import Blog from "../components/common/Blog/Blog"
import Feedbacks from "../components/common/Feedbacks/Feedbacks"
import Support from "../components/common/Support/Support"
import Publications from "../components/common/Publications/Publications"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"

export const Head = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)

  return (
    <GlobalContext.Provider value={state}>
      <Layout>
        <HomeHero></HomeHero>
        <HomeTrainings></HomeTrainings>
        <HomeSafety></HomeSafety>
        <Steps></Steps>
        <Messenger></Messenger>
        <HomeAbout></HomeAbout>
        <Publications></Publications>
        <HomeValues></HomeValues>
        <Blog title={data?.wpPage?.main?.mainBlogZagolovok || ''} remark={data?.wpPage?.main?.mainBlogRemarka || ''}
          linkHref={data?.wpPage?.main?.mainBlogAdresSsylki || ''}
          linkText={data?.wpPage?.main?.mainBlogTekstSsylki || ''}></Blog>
        <Feedbacks></Feedbacks>
        <Support></Support>
      </Layout>
    </GlobalContext.Provider>
  )
}

export default IndexPage

export const query = graphql`query IndexPage {
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
  wpPage(slug: {eq: "glavnaya"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
    }
    main {
      mainAboutImageKompyuter1x {
        gatsbyImage(width: 400, outputPixelDensities: 2, formats: WEBP)
      }
      mainAboutTekst
      mainAboutZagolovok
      mainBlogAdresSsylki
      mainBlogRemarka
      mainBlogTekstSsylki
      mainBlogZagolovok
      mainHeroAdresSsylki
      mainHeroMalyjTekst
      mainHeroPodzagolovok
      mainHeroSlajder {
        mainHeroSlajderKompyuter1x {
          altText
          gatsbyImage(width: 700, outputPixelDensities: 2, formats: WEBP)
        }
      }
      mainHeroTekst
      mainHeroTekstSsylki
      mainHeroZagolovok
      mainSafetyPervyjTekst
      mainSafetyThirdTekst
      mainSafetyVtorojTekst
      mainSafetyZagolovok
      mainSupportRemarka
      mainSupportRemarkaVnizu
      mainSupportTekst
      mainSupportTekstKnopki
      mainSupportZagolovok
      mainTrainingAdresSsylki
      mainTrainingTekstSsylki
      mainTrainingZagolovok
      mainValuesZagolovok
      mainSafetyVideo {
        mediaItemUrl
      }
      mainValuesSpisok {
        mainValuesNomer
        mainValuesTekst
      }
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
            gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 400)
          }
        }
        feedbacksSimpleSlajder {
          feedbacksSimpleImya
          feedbacksSimpleOpisanieKlienta
          feedbacksSimpleTekstOtzyva
          feedbacksSimpleKompyuter1x {
            altText
            gatsbyImage(formats: WEBP, width: 400, outputPixelDensities: 2)
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
          gatsbyImage(width: 200, outputPixelDensities: 2, formats: WEBP)
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
          gatsbyImage(outputPixelDensities: 2, width: 100, formats: WEBP)
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
      online {
        onlineTekst
        onlineTekstKnopki
        onlineZagolovok
      }
      orderSteps {
        zagolovok
        spisok {
          adresSsylki
          estLiSsylkaVTekste
          fieldGroupName
          nomer
          tekst
          tekstSsylki
        }
      }
      support {
        supportAdresSsylki
        supportTekst
        supportTekstSsylki
        supportZagolovok
        supportImageKompyuterX1 {
          altText
          gatsbyImage(outputPixelDensities: 2, width: 400, formats: WEBP)
        }
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
            gatsbyImage(width: 500, outputPixelDensities: 2, formats: WEBP)
          }
        }
        trainingImageKompyuter {
          altText
          gatsbyImage(width: 500, outputPixelDensities: 2, formats: WEBP)
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

