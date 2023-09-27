import React, {useEffect} from 'react';
import {stack} from "../../../../hooks/useClassName";
import * as styles from './HomeAbout.module.css'
import Picture from "../../../images/Picture/Picture";
import {useGlobalContext} from "../../../../context/context";

const HomeAbout = () => {
    const {mainPage:page} = useGlobalContext()

    useEffect(() => {
        if (page) {
            console.log()
        }
    }, [page])
    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <Picture desktopIImageX1={page?.wpPage?.main?.mainAboutImageKompyuter1x?.sourceUrl || ''}
                     desktopIImageX2={page?.wpPage?.main?.mainAboutImageKompyuter2x?.sourceUrl || ''}
                     mobileIImageX1={page?.wpPage?.main?.mainAboutImageTelefon1x?.sourceUrl || ''}
                     mobileIImageX2={page?.wpPage?.main?.mainAboutImageTelefon2x?.sourceUrl || ''}
                     className={styles.picture} imageClassName={styles.image}
                     alt={page?.wpPage?.main?.mainAboutImageKompyuter1x?.altText || ''}></Picture>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: page?.wpPage?.main?.mainAboutZagolovok || ''}}></h2>
                <p className={stack('text-secondary',styles.text)}
                   dangerouslySetInnerHTML={{__html: page?.wpPage?.main?.mainAboutTekst || ''}}></p>
            </div>
        </section>
    );
};

export default HomeAbout;
