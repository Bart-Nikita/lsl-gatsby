import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.InstructionsPageQuery>) => {
  console.log(data?.site)


  return (
<Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>  )
}




const InstructionsPage: React.FC<PageProps<Queries.InstructionsPageQuery>> = ({ data }: PageProps<Queries.InstructionsPageQuery>) => {
  console.log(data)
  return <div>
    {data?.wpPage?.metaData?.metaZagolovok}
  </div>
}

export default InstructionsPage

export const query = graphql` query InstructionsPage {
  site {
    siteMetadata {
      title
      url
    }
  }
  wpPage(slug: {eq: "obuchayushhie-posobiya"}) {
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
          sourceUrl
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
    }
  }
}
`

