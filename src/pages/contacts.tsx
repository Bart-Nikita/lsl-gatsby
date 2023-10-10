import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { graphql } from "gatsby"
import Seo from "../components/seo/Seo"
import Layout from "../components/layout/Layout"
import LeaveContacts from "../components/common/LeaveContacts/LeaveContacts"
import Messenger from "../components/common/Messenger/Messenger"
import { GlobalContext, globalState } from "../context/context"

export const Head = ({ data }: PageProps<Queries.ContactsPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.favikon?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
}

const ContactsPage: React.FC<PageProps<Queries.ContactsPageQuery>> = ({ data }: PageProps<Queries.ContactsPageQuery>) => {
  //@ts-ignore
  const state = globalState(data)
  return <GlobalContext.Provider value={state}>
    <Layout>
      <LeaveContacts title={data?.wpPage?.contacts?.contactsPageZagolovok || ''} buttonText={data?.wpPage?.contacts?.contactsPageTekstKnopki || ''}></LeaveContacts>
      <Messenger text={data?.wpPage?.contacts?.contactsPagePodzagolovok || ''}></Messenger>
    </Layout>
  </GlobalContext.Provider>
}

export default ContactsPage

export const query = graphql` query ContactsPage {
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
  wpPage(slug: {eq: "kontakty"}) {
    slug
    metaData {
      metaOpisanie
      metaZagolovok
    }
    contacts {
        contactsPagePodzagolovok
        contactsPageTekstKnopki
        contactsPageZagolovok
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

