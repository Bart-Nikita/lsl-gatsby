import React from 'react';
import * as styles from './HistoryProjects.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';

const HistoryProjects = () => {
    const {historyPage} = useGlobalContext()

    return (
        <div className={stack('container-new',  styles.body)}>
            <div className={styles.top}>
                <h2 className={stack('text-large', styles.title)}
                    dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyProjectsZagolovok || ''}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyProjectsTekst || ''}}></p>
            </div>
            <ul className={styles.list}>
                {historyPage?.wpPage?.history?.historyProjectsSpisok?.map((item, index) => <li key={index}
                                                                                    className={styles.list__item}>
               <GatsbyImage image={item?.kompyuterX1?.gatsbyImage} alt={item?.kompyuterX1?.altText} className={styles.picture}></GatsbyImage>
                </li>)}

            </ul>
        </div>
    );
};

export default HistoryProjects;