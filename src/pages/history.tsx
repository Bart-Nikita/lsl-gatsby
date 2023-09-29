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
        historyHeroImageKompyuterX1 {
          altText
          sourceUrl
        }
        historyHeroImageKompyuterX2 {
          altText
          sourceUrl
        }
        historyHeroImageTelefonX1 {
          altText
          sourceUrl
        }
        historyHeroImageTelefonX2 {
          altText
          sourceUrl
        }
        historyHeroMalyjTekst
        historyHistoryList {
          god
          tekst
        }
        historyHistoryZagolovok
        historyProjectsSpisok {
          kompyuterX1 {
            altText
            sourceUrl
          }
          kompyuterX2 {
            altText
            sourceUrl
          }
          telefonX1 {
            altText
            sourceUrl
          }
          telefonX2 {
            altText
            sourceUrl
          }
        }
        historyProjectsTekst
        historyProjectsZagolovok
        historySendedGoroda {
          strokaGorodov {
            nazvanieGoroda
            izobrazhenie {
              altText
              sourceUrl
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
          sourceUrl
        }
        historyWeFirstImageKompyuterX2 {
          altText
          sourceUrl
        }
        historyWeFirstImageTelefonX1 {
          altText
          sourceUrl
        }
        historyWeFirstImageTelefonX2 {
          altText
          sourceUrl
        }
        historyWeSecondImageKompyuterX1 {
          altText
          sourceUrl
        }
        historyWeSecondImageKompyuterX2 {
          altText
          sourceUrl
        }
        historyWeSecondImageTelefonX1 {
          altText
          sourceUrl
        }
        historyWeSecondImageTelefonX2 {
          altText
          sourceUrl
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
}
`

