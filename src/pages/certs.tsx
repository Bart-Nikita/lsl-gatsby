import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"
import { GatsbyImage } from "gatsby-plugin-image";
import { typo } from "../tipograf"
import { useStaticFile } from "../hooks/useStaticFile"
import { InView } from "react-intersection-observer"
import FirstSection from "../components/pages/CertsPage/Order/FirstSection/FirstSection"
import SecondSection from "../components/pages/CertsPage/Order/SecondSection/SecondSection"
import ThirdSection from "../components/pages/CertsPage/Order/ThirdSection/ThirdSection"
import ArrowDown from "../components/svg/ArrowDown"

export const Head = ({ data }: PageProps<Queries.CertsPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const isBrowser = typeof window !== "undefined"

const orderSectionArr: string[] = ['Для получения онлайн', 'Для получения в руки', 'Юридически лицам']


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

  const [orderSectionType, setOrderSectionType] = React.useState<string>(orderSectionArr[0])

  const [selectedQuestion, setSelectedQuestion] = React.useState<string | null>(null)

  const [isFaqInView, setIsFaqInView] = React.useState(false)

  return (
    <GlobalContext.Provider value={state}>
      <Layout>
        <section className="container mt-[-10px] mb-[158px] xl:mb-[100px] md:mb-[56px] grid grid-cols-2 gap-[30px] xl:gap-[20px] md:grid-cols-1 md:mt-[-2px] md:gap-[12px]">
          <div className="flex flex-col justify-between gap-[30px] xl:gap-[16px] md:gap-[12px] rounded-[26px] xl:rounded-[10px] bg-[#FEC955] px-[40px] pt-[32px] pb-[36px] xl:px-[16px] xl:py-[20px] md:px-[12px] md:pt-[16px] md:pb-[12px]">
            <div>
              <h1 className="font-bold text-[42px] leading-[1.2] xl:text-[32px] md:text-[22px] mb-[20px] md:mb-[8px]" >
                {typo.execute(data?.wpPage?.certs?.certsHeroZagolovok || '')}
              </h1>
              <p className="font-medium text-[24px] leading-[1.4] xl:text-[16px] xl:leading-[1.3]">{typo.execute(data?.wpPage?.certs?.certsHeroPodzagolovok || '')}</p>
            </div>
            <a className="button-primary-new mr-auto px-[40px] py-[20px] xl:px-[20px] xl:py-[15px] md:w-full" href="#form">{typo.execute(data?.wpPage?.certs?.certsHeroTekstKnopki || "")}</a>
          </div>
          <div className="rounded-[25px] xl:rounded-[12px] [box-shadow:_0px_12px_24px_0px_rgba(0,_0,_0,_0.10)] flex items-center justify-center" >
            <div className="w-[515px] h-[391px] xl:w-[39vw] xl:h-[30vw] md:w-[82vw] md:h-[70vw]">
              {data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage && <GatsbyImage imgStyle={{ transition: 'none' }} className="w-full h-full" imgClassName="w-full h-full contain" image={data.wpPage?.certs?.certsHeroIzobrazhenie?.gatsbyImage} alt={data.wpPage?.certs?.certsHeroIzobrazhenie?.altText || ''} ></GatsbyImage>}
            </div>
          </div>
        </section>
        <section className="mb-[116px] xl:mb-[96px] md:mb-[56px] container">
          <h2 className="text-[38px] leading-[1.4] mb-[56px] ml-[40px]  font-bold xl:leading-[1.2] xl:text-[24px] xl:mb-[48px] md:mb-[24px] md:text-[20px]">{typo.execute(data?.wpPage?.certs?.certsTypesZagolovok || '')}</h2>
          <div className="grid grid-cols-2 gap-[30px] xl:gap-[20px] md:grid-cols-1 ">
            {data?.wpPage?.certs?.certsTypesSpisok?.map((item, index) => <div className={`relative overflow-hidden h-fit rounded-[26px] px-[36px] py-[48px] xl:px-[16px] xl:py-[24px] ${index % 2 === 0 ? ` pr-[141px] xl:pr-[0px]` : ` translate-y-[-122px] xl:translate-y-[-80px] md:translate-y-[0px]`}`} key={index}>
              <div className="relative z-[3]">
                <h3 className="text-[32px] leading-[1.4] font-bold mb-[32px] xl:text-[20px] xl:mb-[12px] max-w-[480px]">{typo.execute(item?.zagolovok || '')}</h3>
                <ul className="flex flex-col gap-[21px] xl:gap-[16px] mb-[32px] xl:mb-[12px] list-disc pl-[34px] xl:pl-[30px]">
                  {item?.opisanie?.map((text, index) => <li className="text-[24px] font-medium leading-[1.4] xl:text-[16px]" key={index} >{typo.execute(text?.tekst || '')}</li>)}
                </ul>
                <a href="#form" className="button-primary-new  w-fit py-[20px] px-[40px] xl:px-[20px] xl:py-[15px]">Оформить</a>
              </div>
              <div className={`absolute z-[2] w-full h-full top-0 left-0 ${index % 2 === 0 ? '[background:radial-gradient(78.75%_65.87%_at_94.77%_52.75%,_rgba(255,_244,_222,_0.50)_0%,_#FFF4DE_100%)]' : '[background:radial-gradient(68.62%_58.19%_at_83.83%_58.94%,_rgba(255,_244,_222,_0.50)_0%,_#FFF4DE_100%)]'}`}></div>
              {item?.fon?.gatsbyImage && <div className={`absolute z-[1]   ${index % 2 === 0 ? ' top-[0] left-[27%] right-[0px] bottom-[-32%]' : ' top-[-5px] left-[-5px] right-[-5px] bottom-[-5px]'}`}>
                <GatsbyImage imgStyle={{ transition: 'none' }} className="h-[102%] w-[102%]" image={item?.fon?.gatsbyImage} alt={item?.fon?.altText || ''}></GatsbyImage>
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
                <h2 className={'text-[38px] font-bold leading-[1.4] mb-[42px] xl:mb-[23px] xl:text-[24px] xl:leading-[1.2] md:text-[22px] md:mb-[20px]'}>{data?.wpPage?.certs?.certsGetZagolovok}</h2>
                <ul className={'grid grid-cols-3 gap-y-[27px] gap-x-[28px] xl:grid-cols-2 xl:gap-y-[28px] xl:gap-x-[20px] md:grid-cols-1 md:gap-y-[23px] md:pl-[5px]'}>
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
        <section id="form" className=" pt-[72px] mb-[140px] xl:pt-[48px] xl:mb-[72px] md:pt-[32px] md:mb-[56px] [background:linear-gradient(180deg,_#FFF4DE_0%,_rgba(255,_244,_222,_0.00)_100%)] md:bg-gradient-to-b md:from-[#FFF4DE] md:to-[rgba(255,_244,_222,_0.00)] to-50%">
          <div className="container max-w-[1061px]">
            <h2 className="text-center mb-[36px] text-[38px] leading-[1.4] font-bold xl:mb-[40px] xl:text-[24px] xl:leading-[1.2]  md:hidden">{typo.execute(data?.wpPage?.certs?.certsOrderZagolovok || '')}</h2>
            <ul className="flex md:gap-[16px] md:flex-col md:mb-[24px]">
              {orderSectionArr?.map((item, index) => {
                const onButtonClick = () => {
                  setOrderSectionType((item))
                }
                const selectedRight = orderSectionArr.indexOf(item) - orderSectionArr.indexOf(orderSectionType || item) === -1
                const selectedLeft = orderSectionArr.indexOf(item) - orderSectionArr.indexOf(orderSectionType || item) === 1
                const selectedAfterOneLeft = orderSectionArr.indexOf(item) - orderSectionArr.indexOf(orderSectionType || item) === -2
                const selectedAfterOneRight = orderSectionArr.indexOf(item) - orderSectionArr.indexOf(orderSectionType || item) === 2
                const firstItem = orderSectionArr.indexOf(item) === 0
                const secondItem = orderSectionArr.indexOf(item) === 1
                const lastItem = orderSectionArr.indexOf(item) === 2


                return <li className={`relative overflow-visible ${item === orderSectionType ? ' z-[3]' : secondItem ? 'z-[2]' : 'z-[1]'}`} key={item}>
                  <button className={`transition-all relative [box-shadow:0px_4px_10px_0px_rgba(0,_0,_0,_0.15)]  md:rounded-[12px] text-[24px] leading-[1.4] font-bold py-[24px] overflow-visible px-[36px] xl:text-[16px] xl:py-[16px] xl:px-[28px] md:py-[12px] md:px-[16px] ${item === orderSectionType ? 'bg-white rounded-t-[20px] ' : 'bg-[#FFF4DE]'} ${selectedRight ? 'rounded-tr-[20px]' : ''} ${selectedLeft ? 'rounded-tl-[20px]' : ''} ${index === 1 ? 'after:absolute after:top-[50%] after:translate-y-[-50%] after:bg-[#B3B3B3] after:rounded-[2px] after:w-[2px] after:h-[46px] xl:after:h-[28px] after:right-[0px] after:opacity-[0] before:absolute before:top-[50%] before:translate-y-[-50%]  before:bg-[#B3B3B3] before:rounded-[2px] before:w-[2px] before:h-[46px] xl:before:h-[28px] before:left-[0px] before:opacity-[0] md:after:hidden md:before:hidden' : ''} ${index === 1 && selectedLeft ? 'after:opacity-[1] [clip-path:inset(-5px_0px_-5px_-5px)]' : ''} ${index === 1 && selectedRight ? 'before:opacity-[1] [clip-path:inset(-5px_-5px_-5px_0px)]' : ''} ${selectedAfterOneLeft ? '[clip-path:inset(-5px_0px_-5px_-5px)]' : ""} ${selectedAfterOneRight ? "[clip-path:inset(-5px_-5px_-5px_0px)]" : ""} ${firstItem ? "rounded-tl-[20px]" : ''}  ${lastItem ? "rounded-tr-[20px]" : ''}`} onClick={onButtonClick}>{item}</button>
                </li>
              })}
            </ul>
            {orderSectionArr?.map((item, index) => {
              const selected = item === orderSectionType

              if (selected && index === 0) {
                return (
                  data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPolucheniyaOnlajn?.gatsbyImage && <FirstSection className='image-normalize' image={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPolucheniyaOnlajn.gatsbyImage} alt={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPolucheniyaOnlajn?.altText || ''}></FirstSection>
                )
              }
              if (selected && index === 1) {
                return data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.gatsbyImage && <SecondSection className='image-normalize' image={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.gatsbyImage} alt={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.altText || ''}></SecondSection>
              }

              if (selected && index === 2) {
                return data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.gatsbyImage && <ThirdSection className='image-normalize' whatsappLink={data?.wpPage?.certs?.certsOrderWhatsapp || ''} email={data?.wpPage?.certs?.certsOrderEmail || ''} image={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.gatsbyImage} alt={data?.wpPage?.certs?.certsOrderIzobrazhenieDlyaPoluceniaVRuki?.altText || ''}></ThirdSection>
              }

            })}
          </div>
        </section>
        <section className="container mb-[100px] xl:mb-[92px] md:mb-[56px]">
          <InView onChange={value => setIsFaqInView(value)}></InView>
          <h2 className="text-center text-[38px] leading-[1.4] font-bold mb-[64px] xl:text-[24px] xl:leading-[1.2] xl:mb-[32px] md:hidden">{typo.execute(data?.wpPage?.certs?.certsFaqZagolovok || '')}</h2>
          <ul className="flex flex-col gap-[16px] xl:gap-[12px] ml-[-10px]">
            {data?.wpPage?.certs?.certsFaqSpisokVoprosov?.map((item, index) => {
              const [isSelected, setIsSelected] = React.useState(false)
              const [isHover, setIsHover] = React.useState(false)
              const [initHeight, setInitHeight] = React.useState<number>(0)
              const [height, setHeight] = React.useState<number>(0)

              const [countView, setCountView] = React.useState(0)

              const onMouseEnter = () => {
                if (isBrowser && window.innerWidth < 1024) return
                setIsHover(true)
              }
              const onMouseLeave = () => {
                if (isBrowser && window.innerWidth < 1024) return
                setIsHover(false)

              }
              React.useEffect(() => {
                setIsSelected(selectedQuestion === item?.vopros)
              }, [selectedQuestion])

              const ref = React.createRef<HTMLParagraphElement>()

              React.useEffect(() => {
                if (isFaqInView) {
                  if (countView === 0) {
                    setInitHeight(ref?.current?.getBoundingClientRect()?.height || 0)
                  }
                  setCountView(countView + 1)
                }
              }, [isFaqInView])

              React.useEffect(() => {
                if (isSelected) {
                  setHeight(initHeight)
                } else {
                  setHeight(0)

                }
              }, [isSelected])

              const onClick = () => {

                const value = selectedQuestion === item?.vopros ? null : item?.vopros || null
                setSelectedQuestion(value)
              }
              return <li>
                <button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} className={`rounded-[20px] w-full relative transition-all pl-[54px] pr-[80px] py-[32px] xl:p-[24px] xl:pr-[80px] md:pr-[50px] md:py-[16px] md:pl-[12px] ${isSelected ? 'bg-gradient-to-b from-[#FFF4DE] to-transparent from-50%' : 'bg-[#FFF4DE]'} `}>
                  <h3 className={`text-left transition-all text-[24px] leading-[1.4] font-bold xl:text-[20px] md:text-[16px] ${isHover ? 'text-[#FEC955]' : ''}`}>{typo.execute(item?.vopros || '')}</h3>
                  <div className={`overflow-hidden transition-all`} style={{ height }}>
                    <p ref={ref} className="text-left text-[22px] leading-[1.4] max-w-[815px] pt-[28px] xl:pt-[15px] xl:text-[16px] md:pt-[12px]">{typo.execute(item?.otvet || '')}</p>
                  </div>
                  <ArrowDown className={`absolute w-[15px] h-[15px] top-[44px] right-[50px] transition-all xl:top-[33px] xl:right-[24px] ${isSelected ? 'rotate-[180deg]' : ''}`} stroke={isHover ? '#FEC955' : "#000"}></ArrowDown>
                </button>
              </li>
            })}
          </ul>
        </section>
        <section className="mb-[140px] relative xl:mb-[96px] md:mb-[56px] container pt-[92px] xl:pt-[0px]">
          <div className="rounded-[25px] bg-[#FFF4DE] px-[60px] py-[64px] xl:px-[20px] xl:py-[32px] md:pt-[36px] md:pb-[16px]">
            <div className="max-w-[654px] xl:max-w-[54%] md:max-w-full">
              <h2 className="text-[38px] leading-[1.2] font-bold mb-[20px] xl:text-[24px] xl:mb-[10px] md:text-[22px] md:mb-[17px]">{typo.execute(data?.wpPage?.certs?.certsNotFoundZagolovok || '')}</h2>
              <div className="mb-[40px] xl:mb-[20px] md:mb-[80vw]">
                {data?.wpPage?.certs?.certsNotFoundOpisanie?.map((item, index) => {
                  return <p className={`text-[24px] leading-[1.4] xl:text-[16px] md:text-[14px] ${index + 1 === data?.wpPage?.certs?.certsNotFoundOpisanie?.length ? '' : 'mb-[32px] xl:mb-[22px] md:mb-[18px]' }`}>
                    {typo.execute(item?.abzacz || '')}
                  </p>
                })}
              </div>
              <div className="flex gap-[24px] xl:flex-col xl:gap-[12px] xl:max-w-[72%] md:max-w-full relative z-[2] md:gap-[16px]">
                <a className="button-secondary-new px-[40px] py-[20px] xl:px-[30px] md:w-full md:py-[15px] shrink-0" href={data?.wpPage?.certs?.certsNotFoundWhatsapp || ''}>Написать в WhatsApp</a>
                <a className="button-primary-new px-[40px] py-[20px] xl:px-[30px] md:w-full md:py-[15px] shrink-0" href={`tel:${data?.wpPage?.certs?.certsNotFoundTelefon?.split(' ').join('').split('−').join('')}`}>{data?.wpPage?.certs?.certsNotFoundTelefon}</a>
              </div>
            </div>
          </div>
          {data?.wpPage?.certs?.certsNotFoundIzobrazhenie?.gatsbyImage && <div className="absolute w-[437px] bottom-0 right-[95px] xl:w-[280px]  xl:right-[38px] md:w-[56vw] md:bottom-[143px] md:right-[50%] md:translate-x-[50%] z-[1]">
            <GatsbyImage image={data?.wpPage?.certs?.certsNotFoundIzobrazhenie?.gatsbyImage} alt={data?.wpPage?.certs?.certsNotFoundIzobrazhenie?.altText || ''} className="image-normalize" imgClassName="contain"></GatsbyImage>
          </div>}
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
            certsNotFoundWhatsapp
            certsNotFoundTelefon
            certsOrderZagolovok
            certsOrderWhatsapp  
            certsOrderEmail
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
              gatsbyImage(formats: WEBP, width: 700, outputPixelDensities: 2)
            }
            certsNotFoundOpisanie {
              abzacz
            }
            certsOrderIzobrazhenieDlyaPoluceniaVRuki {
              altText
              gatsbyImage(width: 1000, formats: WEBP, outputPixelDensities: 2)
            }
            certsOrderIzobrazhenieDlyaPolucheniyaOnlajn {
              altText
              gatsbyImage(width: 1000, formats: WEBP, outputPixelDensities: 2)
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
      }
    }
}
`

