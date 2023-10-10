import React from 'react';
import * as styles from './TrainingsAbout.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import Picture from "../../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';

const TrainingsAbout = () => {
    const {trainingsPage} = useGlobalContext()

    return (
        <div className={stack('container-new',  styles.body)}>
            <h2 className={stack('text-large-new', styles.title)}
                dangerouslySetInnerHTML={{__html: trainingsPage?.wpPage?.trainings?.trainingsAboutZagolovok || ''}}></h2>
            <div className={styles.content}>
                <GatsbyImage className={styles.picture} image={trainingsPage?.wpPage?.trainings?.trainingsAboutIzobrazhenieDlyaKompyutera?.gatsbyImage} alt={trainingsPage?.wpPage?.trainings?.trainingsAboutIzobrazhenieDlyaKompyutera?.altText}></GatsbyImage>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: trainingsPage?.wpPage?.trainings?.trainingsAboutTekst || ''}}></p>
            </div>
        </div>
    );
};

export default TrainingsAbout;