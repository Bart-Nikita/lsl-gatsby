import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"
import {GatsbyImage} from "gatsby-plugin-image";
import Typo from "../components/common/Typo/Typo"
import { typo } from "../tipograf"

export const Head = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const CertsPage: React.FC<PageProps<Queries.CertsPageQuery>> = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)

  return (
    <GlobalContext.Provider value={state}>
      <Layout>
<section>
    <div>
       <h1 >
        {typo.execute(data?.wpPage?.certs?.certsHeroZagolovok || '')}
        </h1> 
    </div>
    <div>
       {data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage && <GatsbyImage image={data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage} alt={data.wpPage?.certs?.certsHeroIzobrazhenie?.altText || ''} ></GatsbyImage>}
    </div>
</section>
      </Layout>
    </GlobalContext.Provider>
  )
}

export default CertsPage

export const query = graphql` query CertsPage {
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
      wpPage(slug: {eq: "podarochnye-sertifikaty"}) {
        slug
        metaData {
          metaOpisanie
          metaZagolovok
        }
        certs {
            certsFaqZagolovok
            certsGetZagolovok
            certsHeroPodzagolovok
            certsHeroTekstKnopki
            certsHeroZagolovok
            certsNotFoundZagolovok
            certsOrderZagolovok
            certsTypesZagolovok
            certsGetVidyPolucheniya {
              nazvanieTipaPolucheniya
              etapy {
                tekst
              }
            }
            certsFaqSpisokVoprosov {
              otvet
              vopros
            }
            certsHeroIzobrazhenie {
              altText
              gatsbyImage(width: 800, formats: WEBP)
            }
            certsNotFoundIzobrazhenie {
              altText
              gatsbyImage(formats: WEBP, width: 700)
            }
            certsNotFoundOpisanie {
              abzacz
            }
            certsOrderIzobrazhenieDlyaPoluceniaVRuki {
              altText
              gatsbyImage(width: 700, formats: WEBP)
            }
            certsOrderIzobrazhenieDlyaPolucheniyaOnlajn {
              altText
              gatsbyImage(width: 700, formats: WEBP)
            }
            certsTypesSpisok {
              zagolovok
              opisanie {
                tekst
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
}
`

