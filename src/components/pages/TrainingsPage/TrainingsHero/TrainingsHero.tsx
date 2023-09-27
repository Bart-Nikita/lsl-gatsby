import React from 'react';
import styles from './TrainingsHero.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";


const TrainingsHero = () => {
    const {trainingsPage} = useGlobalContext()
    if (!trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX1 || !trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX2 || !trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX1 || !trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX2) return
    return (
        <section className={stack('container-new', styles.body)}>
            <div className={styles.display}>
                <Picture imageClassName={styles.image} className={styles.picture}
                         alt={trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX1.altText}
                         desktopIImageX1={trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX1.sourceUrl}
                         desktopIImageX2={trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaKompyuteraX2.sourceUrl}
                         mobileIImageX1={trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX1.sourceUrl}
                         mobileIImageX2={trainingsPage?.trainings.trainingsHeroIzobrazhenieDlyaTelefonaX2.sourceUrl}></Picture>
                <div className={stack(styles.content)}>
                    <h1 className={stack('text-page',styles.title)} dangerouslySetInnerHTML={{__html:trainingsPage?.trainings.trainingsHeroZagolovok }}></h1>
                    <p className={styles.text} dangerouslySetInnerHTML={{__html: trainingsPage?.trainings.trainingsHeroPodzagolovok}}></p>
                </div>
               </div>
            </section>
            );
            };

            export default TrainingsHero;