import React from 'react';
import * as styles from './TrainingsAdvantages.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import { GatsbyImage } from 'gatsby-plugin-image';

const TrainingsAdvantages = () => {
    const {trainingsPage} = useGlobalContext()

    return (
        <section className={stack('container-new',  styles.body)}>
            <ul className={styles.list}>
                {trainingsPage?.wpPage?.trainings?.trainingsAdvantagesSpisok?.map((item, index) => {
                    if (!item?.dekor) return
                    return <li key={index}
                        className={styles.item}>
                        <GatsbyImage className={styles.image} image={item?.dekor?.gatsbyImage} alt={item?.dekor?.altText}></GatsbyImage>
                        <h3 className={styles.title}>{item.zagolovok}</h3>
                        <p className={styles.text} dangerouslySetInnerHTML={{__html:item.tekst || ''}}></p>
                    </li>
                })}
            </ul>

        </section>
    );
};

export default TrainingsAdvantages;