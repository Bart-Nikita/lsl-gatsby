import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import GlobalContextLay from "../components/common/Context"
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
import { useGlobalContext } from "../context/context"

export const Head = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return (
    <Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const IndexPage: React.FC<PageProps<Queries.IndexPageQuery>> = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const { setMainPage, setCommonSections } = useGlobalContext()

  React.useEffect(() => {
    if (data) {
  setMainPage(data)
    //@ts-ignore
  setCommonSections(data?.allWpCommonSection?.nodes)
    }
  }, [data])
  return (
      <div>
         {/* <Layout>
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
      </Layout> */}
      </div>
     
  )
}

export default IndexPage

export const query = graphql` query IndexPage {
  site {
    siteMetadata {
      title
      url
    }
  }
  wpPage(slug: {eq: "glavnaya"}) {
    metaData {
      metaOpisanie
      metaZagolovok
    }
    main {
      mainAboutImageKompyuter1x {
        altText
        sourceUrl
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
          sourceUrl
        }
        mainHeroSlajderKompyuter2x {
          altText
          sourceUrl
        }
        mainHeroSlajderTelefon1x {
          altText
          sourceUrl
        }
        mainHeroSlajderTelefon2x {
          altText
          sourceUrl
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
      mainAboutImageKompyuter2x {
        altText
        sourceUrl
      }
      mainAboutImageTelefon1x {
        altText
        sourceUrl
      }
      mainAboutImageTelefon2x {
        altText
        sourceUrl
      }
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
          sourceUrl
        }
        supportImageKompyuterX2 {
          altText
          sourceUrl
        }
        supportImageTelefonX1 {
          altText
          sourceUrl
        }
        supportImageTelefonX2 {
          altText
          sourceUrl
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

