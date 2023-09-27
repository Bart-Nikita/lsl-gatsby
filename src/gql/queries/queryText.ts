export default `query Data {
    allBlog(last: 9999999) {
      nodes {
        id
        slug
        date
        blog {
          blogPostContentTekst
          blogPostHeroKratkoeOpisanie
          blogPostHeroZagolovok
          blogPostMediaTekstPodVideo
          blogPostMediaTekstNadIzobrazheniem
          blogPostMediaVideo {
            mediaItemUrl
            sourceUrl
            altText
          }
          blogPostMediaIzobrazhenieDlyaTelefonaX2 {
            sourceUrl
            altText
          }
          blogPostMediaIzobrazhenieDlyaTelefonaX1 {
            altText
            sourceUrl
          }
          blogPostMediaIzobrazhenieDlyaKompyuteraX2 {
            altText
            sourceUrl
          }
          blogPostMediaIzobrazhenieDlyaKompyuteraX1 {
            altText
            sourceUrl
          }
          blogPostHeroImageTelefon2x {
            sourceUrl
            altText
          }
          blogPostHeroImageTelefon1x {
            altText
            sourceUrl
          }
          blogPostHeroImageKompyuter2x {
            altText
            sourceUrl
          }
          blogPostHeroImageKompyuter1x {
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
          blogPostMediaZastavkaDlyaVideoKompyuter {
            altText
            sourceUrl
          }
          blogPostMediaZastavkaDlyaVideoKompyuterKopiya {
            altText
            sourceUrl
          }
        }
      }
    }
    pages {
      nodes {
        slug
        metaData {
          metaOpisanie
          metaZagolovok
        }
        contacts {
          contactsPageTekstKnopki
          contactsPageZagolovok
          contactsPagePodzagolovok
        }
        main {
          mainAboutTekst
          mainAboutZagolovok
          mainBlogAdresSsylki
          mainBlogRemarka
          mainBlogTekstSsylki
          mainBlogZagolovok
          mainHeroAdresSsylki
          mainHeroMalyjTekst
          mainHeroPodzagolovok
          mainHeroTekst
          mainHeroTekstSsylki
          mainHeroZagolovok
          mainSafetyPervyjTekst
          mainSafetyVtorojTekst
          mainSafetyThirdTekst
          mainSafetyZagolovok
          mainSupportRemarka
          mainSupportRemarkaVnizu
          mainSupportTekst
          mainSupportTekstKnopki
          mainSupportZagolovok
          mainTrainingAdresSsylki
          mainTrainingTekstSsylki
          mainTrainingZagolovok
          mainValuesZagolovok
          mainAboutImageKompyuter1x {
            sourceUrl
            altText
          }
          mainAboutImageKompyuter2x {
            sourceUrl
            altText
          }
          mainAboutImageTelefon1x {
            sourceUrl
            altText
          }
          mainAboutImageTelefon2x {
            sourceUrl
            altText
          }
          mainHeroSlajder {
            mainHeroSlajderKompyuter1x {
              sourceUrl
              altText
            }
            mainHeroSlajderKompyuter2x {
              sourceUrl
              altText
            }
            mainHeroSlajderTelefon1x {
              sourceUrl
              altText
            }
            mainHeroSlajderTelefon2x {
              sourceUrl
              altText
            }
          }
          mainSupportSpisokVozmozhnyhPozhertvovanij {
            mainSupportSpisokSumma
          }
          mainSafetyVideo {
            mediaItemUrl
          }
          mainValuesSpisok {
            mainValuesNomer
            mainValuesTekst
          }
        }
        history {
          historyFindTrainingAdresSsylki
          historyFindTrainingTekst
          historyFindTrainingTekstSsylki
          historyHeroBolshojTekst
          historyHeroMalyjTekst
          historyHistoryZagolovok
          historyProjectsTekst
          historyProjectsZagolovok
          historySendedKoneczPervojStroki
          historySendedKoneczVtorojStroki
          historySendedNachaloPervojStroki
          historySendedTretyaStroka
          historySendedVydelennyjTekstPervojStroki
          historySendedVydelennyjTekstVtorojStroki
          historyWeCzitata
          historyWeTekstSverhu
          historyWeTekstVnizu
          historyWeZagolovok
          historyHistoryList {
            god
            tekst
          }
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
            sourceUrl
          }
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
          historySendedGoroda {
            strokaGorodov {
              nazvanieGoroda
              izobrazhenie {
                altText
                sourceUrl
              }
            }
          }
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
        }
        blogPage {
          blogZagolovok
        }
        trainings {
          trainingsAboutTekst
          trainingsDeliveryZagolovok
          trainingsGiftTekst
          trainingsHeroPodzagolovok
          trainingsHeroZagolovok
          trainingsSelectPodzagolovok
          trainingsSelectZagolovok
          trainingsAdvantagesSpisok {
            tekst
            zagolovok
            dekor {
              altText
              sourceUrl
            }
          }
          trainingsDeliverySpisok {
            tekst
            dekor {
              altText
              sourceUrl
            }
          }
          trainingsGiftIzobrazhenieDlyaKompyuteraX1 {
            altText
            sourceUrl
          }
          trainingsGiftIzobrazhenieDlyaKompyuteraX2 {
            altText
            sourceUrl
          }
          trainingsGiftIzobrazhenieDlyaTelefonaX1 {
            altText
            sourceUrl
          }
          trainingsGiftIzobrazhenieDlyaTelefonaX2 {
            altText
            sourceUrl
          }
          trainingsHeroIzobrazhenieDlyaKompyuteraX1 {
            altText
            sourceUrl
          }
          trainingsHeroIzobrazhenieDlyaKompyuteraX2 {
            altText
            sourceUrl
          }
          trainingsHeroIzobrazhenieDlyaTelefonaX1 {
            altText
            sourceUrl
          }
          trainingsHeroIzobrazhenieDlyaTelefonaX2 {
            altText
            sourceUrl
          }
          trainingsAboutZagolovok
          trainingsAboutIzobrazhenieDlyaKompyutera {
            altText
            sourceUrl
          }
          trainingsAboutIzobrazhenieDlyaPlansheta {
            altText
            sourceUrl
          }
          trainingsAboutIzobrazhenieDlyaTelefona {
            altText
            sourceUrl
          }
          trainingsStepsList {
            tekst
          }
          trainingsStepsRemarka
          trainingsStepsZagolovok
          trainingsModalSpisokGorodov {
            nazvanieGoroda
          }
        }
        instructionBooks {
          instructionsHeroPodzagolovok
          instructionsHeroTekstKnopki
          instructionsHeroTekstSleva
          instructionsHeroTekstSprava
          instructionsHeroZagolovok
          instructionsAdvantagesZagolovok {
            tekst
            zagolovok
            dekor {
              altText
              sourceUrl
            }
          }
          instructionsInstructionsZagolovok
          instructionsOrderPodzagolovok
          instructionsOrderZagolovok
          instructionsInstructionsSpisok {
            kratkoeOpisanie
            nazvanie
            polnoeOpisanie
            videoDlyaModalnogoOkna {
              mediaItemUrl
            }
            czena
            izobrazhenieDlyaKompyutera {
              altText
              sourceUrl
            }
            vRamkeVModalnomOkne {
              tekst
            }
            izobrazhenieDlyaTelefona {
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
    }
    commonSections {
      nodes {
        slug
        cookies {
          cookiesPolitikaKonfidenczialnosti {
            mediaItemUrl
          }
        }
        feedbacks {
          feedbacksPodzagolovok
          feedbacksZagolovok
          feedbacksPodzagolovok1
          feedbacksZagolovok1
          feedbacksZagolovok2
          feedbacksImageSlajder {
            feedbacksImageKompyuter1x {
              sourceUrl
              altText
            }
            feedbacksImageKompyuter2x {
              sourceUrl
              altText
            }
            feedbacksImageTelefon1x {
              sourceUrl
              altText
            }
            feedbacksImageTelefon2x {
              sourceUrl
              altText
            }
          }
          feedbacksSimpleSlajder {
            feedbacksSimpleImya
            feedbacksSimpleOpisanieKlienta
            feedbacksSimpleTekstOtzyva
            feedbacksSimpleKompyuter1x {
              sourceUrl
              altText
            }
            feedbacksSimpleKompyuter2x {
              sourceUrl
              altText
            }
            feedbacksSimpleTelefon1x {
              sourceUrl
              altText
            }
            feedbacksSimpleTelefon2x {
              sourceUrl
              altText
            }
          }
        }
        footer {
          footerAdresSajta
          footerKopirajt
          footerSocialZagolovok
          footerContactsSpisok {
            footerContactsEstKommentarij
            footerContactsHref
            footerContactsKommentarij
            footerContactsTekst
          }
          footerLogotip {
            sourceUrl
            altText
          }
          footerLogotipMobile {
            sourceUrl
            altText
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
              sourceUrl
              altText
            }
          }
          footerMenuZagolovok
          footerSocialRemarka
          footerContactsZagolovok
        }
        header {
          headerAdresSajta
          headerTelefon
          headerLogotip {
            sourceUrl
            altText
          }
          headerLogotipMobile {
            sourceUrl
            altText
          }
        }
        messenger {
          messengerPodzagolovok
          messengerSsylkaKnopki
          messengerTekstKnopki
          messengerZagolovok
          messengerTelefon
          messengerImageKompyuter1x {
            sourceUrl
            altText
          }
          messengerImageKompyuter2x {
            sourceUrl
            altText
          }
          messengerImageTelefon1x {
            sourceUrl
            altText
          }
          messengerImageTelefon2x {
            sourceUrl
            altText
          }
        }
        orderSteps {
          zagolovok
          spisok {
            adresSsylki
            estLiSsylkaVTekste
            nomer
            tekst
            tekstSsylki
          }
        }
        online {
          onlineTekst
          onlineTekstKnopki
          onlineZagolovok
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
    menu(id: "dGVybToxOQ==") {
      menuItems(where: {parentDatabaseId: 0}) {
        nodes {
          url
          label
          order
          childItems {
            nodes {
              label
              order
              url
            }
          }
        }
      }
    }
    publications {
      nodes {
        date
        slug
        publications {
          publicationsKratkoeOpisanie
          publicationsNazvanie
          publicationsPodrobnoeOpisanie
          publicationsAdresSsylki
          publicationsImageKompyuter1x {
            sourceUrl
            altText
          }
          publicationsImageKompyuter2x {
            sourceUrl
            altText
          }
          publicationsImageTelefon1x {
            sourceUrl
            altText
          }
          publicationsImageTelefon2x {
            sourceUrl
            altText
          }
        }
      }
    }
    trainings(last: 9999999) {
      nodes {
        date
        modified
        training {
          trainingCzena
          trainingKratkoeOpisanie
          trainingPodrobnoeOpisanie
          trainingEstVNalichii
          trainingImageKompyuter {
            altText
            sourceUrl
          }
          trainingImageTelefon {
            altText
            sourceUrl
          }
          trainingMedia {
            mediaItemUrl
          }
          trainingGallereya {
            izobrazhenieDlyaKompyutera {
              altText
              sourceUrl
            }
            izobrazhenieDlyaTelefona {
              altText
              sourceUrl
            }
            video {
              mediaItemUrl
            }
          }
          trainingVRamke {
            tekst
          }
        }
        title
      }
    }
  }`