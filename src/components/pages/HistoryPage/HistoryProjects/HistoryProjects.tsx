import React from 'react';
import * as styles from './HistoryProjects.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";

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
                    <Picture imageClassName={styles.image} className={styles.picture}
                             alt={item?.kompyuterX1?.altText || ''}
                             desktopIImageX1={item?.kompyuterX1?.sourceUrl || ''}
                             desktopIImageX2={item?.kompyuterX2?.sourceUrl || ''}
                             mobileIImageX1={item?.telefonX1?.sourceUrl || ''}
                             mobileIImageX2={item?.telefonX2?.sourceUrl || ''}></Picture>
                </li>)}

            </ul>
        </div>
    );
};

export default HistoryProjects;