import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import { GlobalContext, globalState, useGlobalContext } from "../context/context"
import { typo } from "../tipograf"
import { useCommonSection } from "../hooks/useCommonSection"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { stack } from "../hooks/useClassName"
import Messenger from "../components/common/Messenger/Messenger"

export const Head = ({ data }: PageProps<Queries.MerchPageQuery>) => {
    return (
        <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const heroBlockStyle = "col-span-1 border-box rounded-[26px] overflow-hidden xl:rounded-[10px] md:rounded-[12px] border-[4px] border-[#FEC955] "

const MerchPage: React.FC<PageProps<Queries.MerchPageQuery>> = ({ data }: PageProps<Queries.MerchPageQuery>) => {
    //@ts-ignore
    const state = globalState(data)

    const merch = data?.wpPage?.merch

    const header = data?.allWpCommonSection?.nodes?.find(el => el.slug === "shapka")
    const messenger = data?.allWpCommonSection?.nodes?.find(el => el.slug === "messendzher")


    return (
        <GlobalContext.Provider value={state}>
            <Layout>
                <section className="container mt-[-8px] xl:mt-[0px] mb-[42px] xl:mb-[32px] md:mb-[20px] grid grid-cols-2 gap-[30px] xl:gap-[20px] md:flex md:gap-[28px] md:flex-col-reverse">
                    <div className={stack(heroBlockStyle, 'relative z-10 xl:flex xl:items-center xl:justify-center md:border-none')}>
                        <div className="absolute z-0 top-0 right-0 left-0 bottom-0 md:hidden">
                            {merch?.merchFonovoeIzobrazhenie?.gatsbyImage && <GatsbyImage image={merch?.merchFonovoeIzobrazhenie?.gatsbyImage} alt={merch?.merchFonovoeIzobrazhenie?.altText || ''} className="image-normalize"></GatsbyImage>}
                        </div>
                        <div className="bg-white z-[1] bg-opacity-90 absolute top-0 right-0 left-0 bottom-0 md:hidden">
                        </div>
                        <div className=" h-full p-[58px] relative z-10 pt-[128px] xl:p-[26px] xl:pt-[32px] xl:pr-[45px] md:p-0">
                            <h1 className="leading-[1.2] text-[42px] font-bold mb-[24px] xl:text-[32px] xl:mb-[20px] md:text-[22px] md:mb-[12px]">{typo.execute(merch?.merchZagolovok || '')}</h1>
                            <p className="xl:max-w-[275px] md:max-w-none leading-[1.4] xl:leading-[1.3] font-medium text-[24px] xl:text-[16px] mb-[24px] xl:mb-[12px] md:mb-[20px]">{typo.execute(merch?.merchTekst || '')}</p>
                            <a target='_blank' href={`https://wa.me/${header?.header?.headerTelefon?.split('-').join('').split('(').join('').split(')').join('').split(' ').join('').split('−').join('')}`} className={stack('button-secondary-new font-bold text-[24px] leading-[1.4] flex items-center gap-[12px] xl:text-[16px] xl:gap-[10px] py-[20px] px-[40px] xl:py-[15px] xl:px-[20px] w-fit md:w-full')}>
                                Связаться<StaticImage className='w-[24px] h-[24px] xl:w-[16px] xl:h-[16px] ' src="../images/wa.png" alt="whatsapp-logo" /> </a>
                        </div>
                    </div>
                    <div className={stack(heroBlockStyle)}>
                        {merch?.merchIzobrazhenie?.gatsbyImage && <GatsbyImage image={merch?.merchIzobrazhenie?.gatsbyImage} alt={merch?.merchIzobrazhenie?.altText || ''} className="image-normalize h-[623px] xl:h-[45vw] md:h-[82vw]"></GatsbyImage>}
                    </div>
                </section>
                <section className="container flex flex-col gap-[20px] xl:gap-[14px] md:gap-[12px] mb-[197px] xl:mb-[65px] md:mb-[36px]">
                    {merch?.merchGallereya?.map((item, index) => {
                        return <div className="rounded-[20px] xl:rounded-[20px] md:rounded-[12px]">
                            {item?.izobrazhenie?.gatsbyImage && <GatsbyImage image={item?.izobrazhenie?.gatsbyImage} alt={item?.izobrazhenie?.altText || ''} className="image-normalize"></GatsbyImage>}
                        </div>
                    })}
                </section>
                <section className="mb-[140px] relative xl:mb-[27px] md:mb-[56px] container pt-[92px] xl:pt-[0px]">
                    <div className="rounded-[25px] bg-[#FFF4DE] px-[60px] py-[64px] xl:px-[32px] xl:py-[90px] md:pt-[36px] md:pb-[16px]">
                        <div className="max-w-[654px] xl:max-w-[54%] md:max-w-full">
                            <h2 className="text-[38px] leading-[1.2] font-bold mb-[20px] xl:text-[24px] xl:mb-[10px] md:text-[22px] md:mb-[17px]">{typo.execute(messenger?.messenger?.messengerZagolovok || '')}</h2>
                            <div className="mb-[40px] xl:mb-[20px] md:mb-[268px]">
                                   <p className={`text-[24px] leading-[1.4] xl:text-[16px] md:text-[14px]`} dangerouslySetInnerHTML={{__html: messenger?.messenger?.messengerPodzagolovok  || ''}} ></p>
                                
                            </div>
                            <div className="flex gap-[24px]  xl:flex-col xl:gap-[12px] xl:w-fit md:max-w-full relative z-[2] md:gap-[16px] md:mx-auto sm:w-full">
                                <a target="_blank" className="button-secondary-new px-[40px] py-[20px] xl:px-[30px] md:w-full md:py-[15px] shrink-0 xl:text-[18px] md:text-[16px] sm:w-full sm:px-0" href={messenger?.messenger?.messengerSsylkaKnopki || ''}>Написать в WhatsApp</a>
                            </div>
                        </div>
                    </div>
                    {messenger?.messenger?.messengerImageKompyuter1x?.gatsbyImage && <div className="absolute h-[536px] w-[437px] bottom-0 right-[95px] xl:w-[299px] xl:bottom-0 xl:h-[367px] xl:right-[38px] md:h-[244px] md:w-[200px] md:bottom-[70px] md:right-[50%] md:translate-x-[50%] z-[1]">
                        <GatsbyImage image={messenger?.messenger?.messengerImageKompyuter1x?.gatsbyImage} alt={messenger?.messenger?.messengerImageKompyuter1x?.altText || ''} className="image-normalize" objectFit="contain" imgClassName="contain"></GatsbyImage>
                    </div>}
                </section>
            </Layout>
        </GlobalContext.Provider>
    )
}

export default MerchPage

export const query = graphql`query MerchPage {
    allFile {
        nodes {
          name
          publicURL
        }
      }
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
  wpPage(slug: {eq: "merch"}) {
    metaData {
        metaOpisanie
        metaZagolovok
      }
    merch {
      merchTekst
      merchZagolovok
      merchIzobrazhenie {
        altText
        gatsbyImage(
          formats: WEBP
          placeholder: NONE
          sizes: "300px 600px 800px"
          width: 800
          fit: COVER
        )
      }
      merchFonovoeIzobrazhenie {
        altText
        gatsbyImage(
          formats: WEBP
          placeholder: NONE
          sizes: "300px 600px 800px"
          width: 800
          fit: COVER
        )
      }
      merchGallereya {
        izobrazhenie {
          altText
           gatsbyImage(
          formats: WEBP
          placeholder: NONE
          sizes: "300px 600px 1000px 1400px"
          width: 1500
          fit: COVER
        )
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
    }
  }
}
`

