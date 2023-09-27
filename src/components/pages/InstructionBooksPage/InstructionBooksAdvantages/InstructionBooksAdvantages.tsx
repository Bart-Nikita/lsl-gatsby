import React from 'react';
import * as styles from './InstructionBooksAdvantages.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import {typo} from "../../../../tipograf";
const InstructionBooksAdvantages = () => {
    const {instructionBooksPage} = useGlobalContext()
    return (
        <section className={stack('container-new',  styles.body)}>
            <ul className={styles.list}>
                {instructionBooksPage?.instructionBooks.instructionsAdvantagesZagolovok.map((item, index) => {
                    if (!item.dekor) return
                    return <li key={index}
                               className={styles.item}>
                        <img className={styles.image} src={item.dekor.sourceUrl} alt={item.dekor.altText}/>
                        <h3 className={styles.title}>{item.zagolovok}</h3>
                        <p className={styles.text} >{typo.execute(item.tekst)}</p>
                    </li>
                })}
            </ul>
        </section>
    );
};

export default InstructionBooksAdvantages;