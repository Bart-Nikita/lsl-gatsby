import React from 'react';
import styles from './TrainingsAdvantages.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";

const TrainingsAdvantages = () => {
    const {trainingsPage} = useGlobalContext()

    return (
        <section className={stack('container-new',  styles.body)}>
            <ul className={styles.list}>
                {trainingsPage?.trainings.trainingsAdvantagesSpisok.map((item, index) => {
                    if (!item.dekor) return
                    return <li key={index}
                        className={styles.item}>
                        <img className={styles.image} src={item.dekor.sourceUrl} alt={item.dekor.altText}/>
                        <h3 className={styles.title}>{item.zagolovok}</h3>
                        <p className={styles.text} dangerouslySetInnerHTML={{__html:item.tekst}}></p>
                    </li>
                })}
            </ul>

        </section>
    );
};

export default TrainingsAdvantages;