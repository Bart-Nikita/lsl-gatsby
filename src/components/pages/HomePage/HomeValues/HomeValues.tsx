import * as styles from './HomeValues.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import React from 'react'

const HomeValues = () => {
    const {mainPage:page} = useGlobalContext()
    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <div className={styles.title}>
                <h2 className={stack('title-secondary')}
                    dangerouslySetInnerHTML={{__html: page?.wpPage?.main?.mainValuesZagolovok || ''}}></h2>
            </div>
            <ul className={styles.list}>
                {page?.wpPage?.main?.mainValuesSpisok?.map((item, index) => <li key={index}
                                                                                      className={styles.item}>
                    <h3 className={styles?.item__number}>{item?.mainValuesNomer}</h3>
                    <p className={stack('text-secondary', styles.item__text)}
                       dangerouslySetInnerHTML={{__html: item?.mainValuesTekst || ''}}></p>
                </li>)}
            </ul>
        </section>
    );
};

export default HomeValues;
