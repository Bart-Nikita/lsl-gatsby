import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"
import { GatsbyImage } from "gatsby-plugin-image";
import Typo from "../components/common/Typo/Typo"
import { typo } from "../tipograf"
import { useFile } from "../hooks/useFile"

export const Head = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const CertsPage: React.FC<PageProps<Queries.CertsPageQuery>> = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)

  const [certs] = useFile('certs')
  const [painting] = useFile('painting')


  return (
    <GlobalContext.Provider value={state}>
      <Layout>
        <section className="container mb-[158px] xl:mb-[100px] md:mb-[56px] grid grid-cols-2 gap-[30px] xl:gap-[20px] md:grid-cols-1 md:gap-[12px]">
          <div className="flex flex-col justify-between gap-[30px] xl:gap-[16px] md:gap-[12px] rounded-[26px] xl:rounded-[10px] bg-[#FEC955] px-[40px] pt-[32px] pb-[36px] xl:px-[16px] xl:py-[20px] md:px-[12px] md:pt-[16px] md:pb-[12px]">
            <div>
              <h1 className="font-bold text-[42px] leading-[1.2] xl:text-[32px] md:text-[22px] mb-[20px] md:mb-[8px]" >
                {typo.execute(data?.wpPage?.certs?.certsHeroZagolovok || '')}
              </h1>
              <p className="font-medium text-[24px] leading-[1.4] xl:text-[16px] xl:leading-[1.3]">{typo.execute(data?.wpPage?.certs?.certsHeroPodzagolovok || '')}</p>
            </div>
            <a className="button-primary-new mr-auto px-[40px] py-[20px]" href="#form">{typo.execute(data?.wpPage?.certs?.certsHeroTekstKnopki || "")}</a>
          </div>
          <div className="rounded-[25px] xl:rounded-[12px] [box-shadow:_0px_12px_24px_0px_rgba(0,_0,_0,_0.10)] flex items-center justify-center" >
            <div className="w-[562px] h-[452px] xl:w-[30vw] xl:h-[30vw] md:w-[80vw] md:h-[70vw]">
              {data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage && <GatsbyImage className="w-full h-full" imgClassName="w-full h-full" image={data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage} alt={data.wpPage?.certs?.certsHeroIzobrazhenie?.altText || ''} ></GatsbyImage>}
            </div>
          </div>
        </section>
        <section className="">
          <h2>{typo.execute(data?.wpPage?.certs?.certsTypesZagolovok || '')}</h2>
          {data?.wpPage?.certs?.certsTypesSpisok?.map((item, index) => <div className={`bg-[${index % 2 === 0 ? painting : certs}] rounded-[26px] `} key={index}>
            <div>
              <h3>{typo.execute(item?.zagolovok || '')}</h3>
              <ul>
                {item?.opisanie?.map((text, index) => <li key={index} >{typo.execute(text?.tekst || '')}</li>)}
              </ul>
            </div>
          </div>)}
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

