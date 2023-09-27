import React from 'react';
import * as styles from './TrainingsAbout.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import Picture from "../../../images/Picture/Picture";

const TrainingsAbout = () => {
    const {trainingsPage} = useGlobalContext()

    return (
        <div className={stack('container-new',  styles.body)}>
            <h2 className={stack('text-large-new', styles.title)}
                dangerouslySetInnerHTML={{__html: trainingsPage?.trainings.trainingsAboutZagolovok}}></h2>
            <div className={styles.content}>
                <Picture className={styles.picture} imageClassName={styles.image} breakpoint={767}
                         alt={trainingsPage?.trainings.trainingsAboutIzobrazhenieDlyaKompyutera.altText}
                         mobileIImageX1={trainingsPage?.trainings.trainingsAboutIzobrazhenieDlyaTelefona.sourceUrl}
                         mobileIImageX2={trainingsPage?.trainings.trainingsAboutIzobrazhenieDlyaPlansheta.sourceUrl}
                         desktopIImageX1={trainingsPage?.trainings.trainingsAboutIzobrazhenieDlyaPlansheta.sourceUrl}
                         desktopIImageX2={trainingsPage?.trainings.trainingsAboutIzobrazhenieDlyaKompyutera.sourceUrl}></Picture>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: trainingsPage?.trainings.trainingsAboutTekst}}></p>
            </div>
        </div>
    );
};

export default TrainingsAbout;