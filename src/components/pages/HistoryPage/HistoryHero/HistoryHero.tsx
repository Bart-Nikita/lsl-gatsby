import React, { useEffect } from 'react';
import * as styles from './HistoryHero.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';

const HistoryHero = () => {
    const { historyPage } = useGlobalContext()
    return (
        <div className={stack('container-new', styles.body, 'section-mb')}>
            <div className={styles.display}>
                <GatsbyImage className={styles.picture} image={historyPage?.wpPage?.history?.historyHeroImageKompyuterX1?.gatsbyImage} alt={historyPage?.wpPage?.history?.historyHeroImageKompyuterX1?.altText} ></GatsbyImage>
                <div className={stack(styles.content)}>
                    <h1 className={stack('text-page', styles.title)}
                        dangerouslySetInnerHTML={{ __html: historyPage?.wpPage?.history?.historyHeroBolshojTekst || '' }}></h1>
                    <p className={styles.text}
                        dangerouslySetInnerHTML={{ __html: historyPage?.wpPage?.history?.historyHeroMalyjTekst || '' }}></p>
                </div>
            </div>
        </div>
    );
};

export default HistoryHero;