import React, { useEffect } from 'react';
import { stack } from "../../../../hooks/useClassName";
import * as styles from './HomeAbout.module.css'
import Picture from "../../../images/Picture/Picture";
import { useGlobalContext } from "../../../../context/context";
import { GatsbyImage } from 'gatsby-plugin-image';

const HomeAbout = () => {
    const { mainPage: page } = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <GatsbyImage className={styles.picture} image={page?.wpPage?.main?.mainAboutImageKompyuter1x?.gatsbyImage} alt={page?.wpPage?.main?.mainAboutImageKompyuter1x?.altText}></GatsbyImage>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainAboutZagolovok || '' }}></h2>
                <p className={stack('text-secondary', styles.text)}
                    dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainAboutTekst || '' }}></p>
            </div>
        </section>
    );
};

export default HomeAbout;
