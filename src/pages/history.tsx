import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import { GlobalContext, globalState } from "../context/context"
import Layout from "../components/layout/Layout"
import HistoryHero from "../components/pages/HistoryPage/HistoryHero/HistoryHero"
import Support from "../components/common/Support/Support"
import HistoryFind from "../components/pages/HistoryPage/HistoryFind/HistoryFind"
import HistoryHistory from "../components/pages/HistoryPage/HistoryHistory/HistoryHistory"
import HistoryProjects from "../components/pages/HistoryPage/HistoryProjects/HistoryProjects"
import HistorySended from "../components/pages/HistoryPage/HistorySended/HistorySended"
import HistoryWe from "../components/pages/HistoryPage/HistoryWe/HistoryWe"

export const Head = ({ data }: PageProps<Queries.HistoryPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}




const HistoryPage: React.FC<PageProps<Queries.HistoryPageQuery>> = ({ data }: PageProps<Queries.HistoryPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <HistoryHero></HistoryHero>
      <HistoryWe></HistoryWe>
      <HistoryProjects></HistoryProjects>
      <HistoryFind></HistoryFind>
      <HistoryHistory></HistoryHistory>
      <HistorySended></HistorySended>
      <Support></Support>
    </Layout>
  </GlobalContext.Provider>
}

export default HistoryPage

export const query = graphql` query HistoryPage {
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
  wpPage(slug: {eq: "istoriya"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
    }
      history {
        historyFindTrainingAdresSsylki
        historyFindTrainingTekst
        historyFindTrainingTekstSsylki
        historyHeroBolshojTekst
        historyHeroMalyjTekst
        historyHistoryList {
          god
          tekst
        }
        historyHistoryZagolovok
        historyProjectsSpisok {
          kompyuterX1 {
            altText
            gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 400, placeholder: NONE)
          }
        }
        historyProjectsTekst
        historyProjectsZagolovok
        historySendedGoroda {
          strokaGorodov {
            nazvanieGoroda
            izobrazhenie {
              altText
              gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 200)
            }
          }
        }
        historySendedKoneczPervojStroki
        historySendedKoneczVtorojStroki
        historySendedNachaloPervojStroki
        historySendedTretyaStroka
        historySendedVydelennyjTekstPervojStroki
        historySendedVydelennyjTekstVtorojStroki
        historyWeCzitata
        historyWeFirstImageKompyuterX1 {
          altText
          gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 800, placeholder: NONE)
        }
        historyWeSecondImageKompyuterX1 {
          altText
          gatsbyImage(formats: WEBP, outputPixelDensities: 2, width: 800, placeholder: NONE)
        }
        historyWeTekstSverhu
        historyWeTekstVnizu
        historyWeZagolovok
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
}
`

