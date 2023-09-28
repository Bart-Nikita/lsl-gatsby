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
    <Seo url={data?.site?.siteMetadata?.url || ''} title={data.wpPage?.metaData?.metaZagolovok || ''} description={data.wpPage?.metaData?.metaOpisanie || ''}></Seo>)
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
    }
  }
}
`

