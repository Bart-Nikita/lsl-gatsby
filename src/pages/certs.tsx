import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"
import { GatsbyImage } from "gatsby-plugin-image";
import Typo from "../components/common/Typo/Typo"
import { typo } from "../tipograf"
import { useStaticFile } from "../hooks/useStaticFile"
import { link } from "fs"
import { InView } from "react-intersection-observer"

export const Head = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const isBrowser = typeof window !== "undefined"


const CertsPage: React.FC<PageProps<Queries.CertsPageQuery>> = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)

  const files = data?.allFile?.nodes
  //@ts-ignore
  const [certs] = useStaticFile('certs', files)
  //@ts-ignore
  const [painting] = useStaticFile('painting', files)

  const [gettingTypeId, setGettingTypeId] = React.useState<string>()

  React.useEffect(() => {
    setGettingTypeId(data?.wpPage?.certs?.certsGetVidyPolucheniya && data?.wpPage?.certs?.certsGetVidyPolucheniya[0]?.nazvanieTipaPolucheniya || '')
  }, [])


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
        <section className="mb-[140px] xl:mb-[96px] md:mb-[56px] container">
          <h2 className="text-[38px] leading-[1.4] mb-[56px]  font-bold xl:leading-[1.2] xl:text-[24px] xl:mb-[48px] md:mb-[24px] md:text-[20px]">{typo.execute(data?.wpPage?.certs?.certsTypesZagolovok || '')}</h2>
          <div className="grid grid-cols-2 gap-[30px] xl:gap-[20px] md:grid-cols-1 ">
            {data?.wpPage?.certs?.certsTypesSpisok?.map((item, index) => <div className={`relative overflow-hidden h-fit rounded-[26px] px-[36px] py-[48px] xl:px-[16px] xl:py-[24px] ${index % 2 === 0 ? ` pr-[100px] xl:pr-[0px]` : ` translate-y-[-130px] xl:translate-y-[-80px] md:translate-y-[0px]`}`} key={index}>
              <div className="relative z-[3]">
                <h3 className="text-[32px] leading-[1.4] font-bold mb-[32px] xl:text-[20px] xl:mb-[12px]">{typo.execute(item?.zagolovok || '')}</h3>
                <ul className="flex flex-col gap-[24px] xl:gap-[16px] mb-[32px] xl:mb-[12px] list-disc pl-[40px] xl:pl-[30px]">
                  {item?.opisanie?.map((text, index) => <li className="text-[24px] font-medium leading-[1.4] xl:text-[16px]" key={index} >{typo.execute(text?.tekst || '')}</li>)}
                </ul>
                <a href="#form" className="button-primary-new  w-fit py-[20px] px-[40px] xl:px-[20px] xl:py-[15px]">Оформить</a>
              </div>
              <div className={`absolute z-[2] w-full h-full top-0 left-0 ${index % 2 === 0 ? '[background:radial-gradient(78.75%_65.87%_at_94.77%_52.75%,_rgba(255,_244,_222,_0.50)_0%,_#FFF4DE_100%)]' : '[background:radial-gradient(68.62%_58.19%_at_83.83%_58.94%,_rgba(255,_244,_222,_0.50)_0%,_#FFF4DE_100%)]'}`}></div>
              {item?.fon?.gatsbyImage && <div className={`absolute z-[1]   ${index % 2 === 0 ? ' top-[0] left-[30%] right-[-10%] bottom-[-60%]' : ' top-[-5px] left-[-5px] right-[-5px] bottom-[-5px]'}`}>
                <GatsbyImage className="h-[102%] w-[102%]" image={item?.fon?.gatsbyImage} alt={item?.fon?.altText || ''}></GatsbyImage>
              </div>}
            </div>)}
          </div>
        </section>
        <section className="container mb-[68px] xl:mb-[100px] md:mb-[56px]">
          <ul className="flex w-fit mb-[17px] xl:mb-[36px] md:mb-[32px]">
            {data?.wpPage?.certs?.certsGetVidyPolucheniya?.map(item => {
              const onClick = () => {
                setGettingTypeId(item?.nazvanieTipaPolucheniya || '')
              }
              return <li className="block p-[0px] leading-none" key={item?.nazvanieTipaPolucheniya}>
                <button onClick={onClick} className={`px-[36px] py-[24px] overflow-hidden translate-all rounded-t-[20px] text-[24px] leading-[1.4] font-bold xl:px-[32px] xl:py-[16px] xl:text-[20px] md:text-[16px] md:p-[12px] ${gettingTypeId === item?.nazvanieTipaPolucheniya ? `[background:linear-gradient(180deg,_#FFF4DE_0%,_rgba(255,_244,_222,_0.00)_100%),_#FFF]` : `bg-[#FFF4DE]`}`}>{item?.nazvanieTipaPolucheniya}</button>
              </li>
            })}
          </ul>
          <div>
            {data?.wpPage?.certs?.certsGetVidyPolucheniya?.map((item, index) => {
              const [int, setInt] = React.useState(0)
              const [decorArray, setDecorArray] = React.useState<boolean[]>([])
              const [isInView, setIsInView] = React.useState(false)

              const listItem = React.createRef<HTMLLIElement>()
              const decorItem = React.createRef<HTMLDivElement>()

              React.useLayoutEffect(() => {
                if (decorItem?.current && listItem?.current && isBrowser) {

                  const fullWith = window.innerWidth < 768 ? listItem.current.getBoundingClientRect().height : listItem.current.getBoundingClientRect().width
                  const itemWith = decorItem.current.getBoundingClientRect().width
                  const int = Math.floor(fullWith / (itemWith + 10))
                  console.log('fullWith', fullWith)
                  console.log('itemWith', itemWith)
                  console.log('int', int)

                  setInt(int)
                }
              }, [decorItem, listItem, isInView, isBrowser])

              React.useEffect(() => {
                if (int > 0) {
                  const arr: boolean[] = []
                  for (let i = 0; i < int; i++) {
                    arr.push(true)
                  }
                  setDecorArray(arr)
                }
              }, [int]);
              return <div key={index} className={` ${gettingTypeId === item?.nazvanieTipaPolucheniya ? `block` : `hidden`}`}>
                <InView onChange={value => setIsInView(value)}></InView>
                <h2 className={'text-[38px] font-bold leading-[1.4] mb-[52px] xl:mb-[23px] xl:text-[24px] xl:leading-[1.2] md:text-[22px] md:mb-[20px]'}>{data?.wpPage?.certs?.certsGetZagolovok}</h2>
                <ul className={'grid grid-cols-3 gap-y-[55px] gap-x-[28px] xl:grid-cols-2 xl:gap-y-[28px] xl:gap-x-[20px] md:grid-cols-1 md:gap-y-[23px] md:pl-[5px]'}>
                  {item?.etapy?.map((step, index) =>
                    <li ref={index === 0 ? listItem : null} key={index} className={'md:flex md:gap-[10px]'}>
                      <div
                        className={'relative flex items-center gap-[68px] mb-[30px] xl:gap-[19px] xl:mb-[10px] md:mb-[0px] md:flex-row md:gap-[0px] '}>
                        <div
                          className={'relative z-10 rounded-full bg-[#FEC955] flex items-center justify-center text-[22px] leading-none px-[25px] py-[10px] font-bold xl:px-[20px] xl:py-[8px] xl:text-[14px]'}>{'0' + (index + 1)}</div>
                        {index + 1 !== item?.etapy?.length &&
                          <div
                            className={'flex gap-[5px] absolute top-[50%] translate-y-[-50%] left-[100px] z-0 xl:left-[72px] md:left-[31px] md:top-[100%] md:translate-y-[0px] md:rotate-[90deg] md:translate-x-[-50%]'}>
                            <div {...index === 0 ? { ref: decorItem } : {}} className={'rounded-full h-[2px] w-[12px] bg-[#FEC955] md:w-[7px]'}></div>
                            {!!decorArray.length && decorArray.map((item, index) =>
                              <div key={index}
                                className={'rounded-full h-[2px] w-[12px] bg-[#FEC955] md:w-[7px]'}></div>)}
                          </div>}
                      </div>
                      <p className={'text-[24px] leading-[1.4] font-light xl:text-[16px]'}>{typo.execute(step?.tekst || '')}</p>
                    </li>)}
                </ul>
              </div>
            })}
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
              gatsbyImage(width: 800, outputPixelDensities: 2, formats: WEBP)
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
              fon {
                altText
                gatsbyImage(width: 700, outputPixelDensities: 2, formats: WEBP)
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

