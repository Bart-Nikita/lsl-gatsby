import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import InstructionBooksAdvantages from "../components/pages/InstructionBooksPage/InstructionBooksAdvantages/InstructionBooksAdvantages"
import InstructionBooksInstructions from "../components/pages/InstructionBooksPage/InstructionBooksInstructions/InstructionBooksInstructions"
import InstructionBooksOrder from "../components/pages/InstructionBooksPage/InstructionBooksOrder/InstructionBooksOrder"
import InstructionBooksSteps from "../components/pages/InstructionBooksPage/InstructionBooksSteps/InstructionBooksSteps"
import { GlobalContext, globalState } from "../context/context"
import Layout from "../components/layout/Layout"
import InstructionBooksHome from "../components/pages/InstructionBooksPage/InstructionBooksHome/InstructionBooksHome"

export const Head = ({ data }: PageProps<Queries.InstructionsPageQuery>) => {

  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const InstructionsPage: React.FC<PageProps<Queries.InstructionsPageQuery>> = ({ data }: PageProps<Queries.InstructionsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <InstructionBooksHome></InstructionBooksHome>
      <InstructionBooksAdvantages></InstructionBooksAdvantages>
      <InstructionBooksInstructions></InstructionBooksInstructions>
      <InstructionBooksSteps></InstructionBooksSteps>
      <InstructionBooksOrder></InstructionBooksOrder>
    </Layout>
  </GlobalContext.Provider>
}

export default InstructionsPage

export const query = graphql` query InstructionsPage {
  
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
  wpPage(slug: {eq: "obuchayushhie-posobiya"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
    }
    instructionBooks {
      instructionsHeroPodzagolovok
      instructionsHeroTekstKnopki
      instructionsHeroTekstSleva
      instructionsHeroTekstSprava
      instructionsHeroZagolovok
      instructionsInstructionsZagolovok
      instructionsOrderPodzagolovok
      instructionsOrderZagolovok
      instructionsAdvantagesZagolovok {
        tekst
        zagolovok
        dekor {
          altText
          sourceUrl
        }
      }
      instructionsHeroFonovoeIzobrazhenie {
        altText
        sourceUrl
      }
      instructionsHeroIzobrazhenieDlyaKompyutera {
        altText
        sourceUrl
      }
      instructionsHeroIzobrazhenieDlyaTelefona {
        altText
        sourceUrl
      }
      instructionsInstructionsSpisok {
        czena
        kratkoeOpisanie
        nazvanie
        polnoeOpisanie
        izobrazhenieDlyaKompyutera {
          altText
          sourceUrl
        }
        izobrazhenieDlyaTelefona {
          altText
          sourceUrl
        }
        vRamkeVModalnomOkne {
          tekst
        }
        videoDlyaModalnogoOkna {
          altText
          mediaItemUrl
        }
      }
      instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera {
        altText
        sourceUrl
      }
      instructionsOrderFonovoeIzobrazhenieDlyaTelefona {
        altText
        sourceUrl
      }
      instructionsStepsStadiiOformleniya {
        opisanie
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
    }
  }
  allWpTraining {
    nodes {
      title
      slug
    }
  }
}
`

