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
          gatsbyImage(outputPixelDensities: 2, width: 400, formats: WEBP, placeholder: NONE)
        }
      }
      instructionsHeroFonovoeIzobrazhenie {
        altText
        gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
      }
      instructionsHeroIzobrazhenieDlyaKompyutera {
        altText
        gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
      }

      instructionsInstructionsSpisok {
        czena
        kratkoeOpisanie
        nazvanie
        polnoeOpisanie
        izobrazhenieDlyaKompyutera {
          altText
          gatsbyImage(outputPixelDensities: 2, width: 800, formats: WEBP)
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
        gatsbyImage(outputPixelDensities: 2, width: 1900, formats: WEBP)
      }

      instructionsStepsStadiiOformleniya {
        opisanie
      }
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

