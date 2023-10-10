import React from 'react';
import * as styles from './TrainingsHero.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';


const TrainingsHero = () => {
    const { trainingsPage } = useGlobalContext()
    if (!trainingsPage?.wpPage?.trainings?.trainingsHeroIzobrazhenieDlyaKompyuteraX1) return
    return (
        <section className={stack('container-new', styles.body)}>
            <div className={styles.display}>
              <GatsbyImage className={styles.picture} imgClassName={styles.image} image={trainingsPage?.wpPage?.trainings?.trainingsHeroIzobrazhenieDlyaKompyuteraX1?.gatsbyImage} alt={trainingsPage?.wpPage?.trainings?.trainingsHeroIzobrazhenieDlyaKompyuteraX1?.altText}></GatsbyImage>
                <div className={stack(styles.content)}>
                    <h1 className={stack('text-page', styles.title)} dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings.trainingsHeroZagolovok || '' }}></h1>
                    <p className={styles.text} dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings.trainingsHeroPodzagolovok || '' }}></p>
                </div>
            </div>
        </section>
    );
};

export default TrainingsHero;