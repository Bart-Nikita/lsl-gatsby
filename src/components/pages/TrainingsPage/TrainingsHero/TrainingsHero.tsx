import React from 'react';
import * as styles from './TrainingsHero.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";


const TrainingsHero = () => {
    const { trainingsPage } = useGlobalContext()
    if (!trainingsPage?.wpPage?.trainings?.trainingsHeroIzobrazhenieDlyaKompyuteraX1 || !trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX2 || !trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX1 || !trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX2) return
    return (
        <section className={stack('container-new', styles.body)}>
            <div className={styles.display}>
                <Picture imageClassName={styles.image} className={styles.picture}
                    alt={trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX1.altText || ''}
                    desktopIImageX1={trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX1.sourceUrl || ''}
                    desktopIImageX2={trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX2.sourceUrl || ''}
                    mobileIImageX1={trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX1.sourceUrl || ''}
                    mobileIImageX2={trainingsPage?.wpPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX2.sourceUrl || ''}></Picture>
                <div className={stack(styles.content)}>
                    <h1 className={stack('text-page', styles.title)} dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings.trainingsHeroZagolovok || '' }}></h1>
                    <p className={styles.text} dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings.trainingsHeroPodzagolovok || '' }}></p>
                </div>
            </div>
        </section>
    );
};

export default TrainingsHero;