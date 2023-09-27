import React from 'react';
import {useGlobalContext} from "../../../../context/context";
import * as styles from './TrainingsGift.module.css'
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";

const TrainingsGift = () => {
    const {trainingsPage} = useGlobalContext()
    if (!trainingsPage?.trainings.trainingsGiftIzobrazhenieDlyaKompyuteraX1 || !trainingsPage?.trainings.trainingsGiftIzobrazhenieDlyaKompyuteraX2 || !trainingsPage?.trainings.trainingsGiftIzobrazhenieDlyaTelefonaX1 || !trainingsPage?.trainings.trainingsGiftIzobrazhenieDlyaTelefonaX2) return
    return (
        <section className={stack('container-new', styles.body)}>
            <div className={styles.content}>
                <Picture className={styles.picture} imageClassName={styles.image}
                         alt={trainingsPage.trainings.trainingsGiftIzobrazhenieDlyaKompyuteraX1.altText}
                         desktopIImageX2={trainingsPage.trainings.trainingsGiftIzobrazhenieDlyaKompyuteraX2.sourceUrl}
                         desktopIImageX1={trainingsPage.trainings.trainingsGiftIzobrazhenieDlyaKompyuteraX1.sourceUrl}
                         mobileIImageX2={trainingsPage.trainings.trainingsGiftIzobrazhenieDlyaTelefonaX2.sourceUrl}
                         mobileIImageX1={trainingsPage.trainings.trainingsGiftIzobrazhenieDlyaTelefonaX1.sourceUrl}
                ></Picture>
                <h2 className={stack( styles.title)} dangerouslySetInnerHTML={{__html:trainingsPage.trainings.trainingsGiftTekst}}></h2>
            </div>
        </section>
    );
};

export default TrainingsGift;