import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.HistoryPageQuery>) => {
    console.log(data?.site)


    return (
        <Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}




const HistoryPage: React.FC<PageProps<Queries.HistoryPageQuery>> = ({ data }: PageProps<Queries.HistoryPageQuery>) => {
    console.log(data)
    return <div>
        {data?.wpPage?.metaData?.metaZagolovok}
    </div>
}

export default HistoryPage

export const query = graphql` query HistoryPage {
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

