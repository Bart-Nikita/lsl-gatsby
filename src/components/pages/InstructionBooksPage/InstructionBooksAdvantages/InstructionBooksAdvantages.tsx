import React from 'react';
import * as styles from './InstructionBooksAdvantages.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import {typo} from "../../../../tipograf";
import { GatsbyImage } from 'gatsby-plugin-image';
const InstructionBooksAdvantages = () => {
    const {instructionBooksPage} = useGlobalContext()
    return (
        <section className={stack('container-new',  styles.body)}>
            <ul className={styles.list}>
                {instructionBooksPage?.wpPage?.instructionBooks?.instructionsAdvantagesZagolovok?.map((item, index) => {
                    if (!item?.dekor) return
                    return <li key={index}
                               className={styles.item}>
                       <GatsbyImage className={styles.image} backgroundColor={'transparent'} image={item?.dekor?.gatsbyImage} alt={item?.dekor?.altText}></GatsbyImage>
                        <h3 className={styles?.title}>{item?.zagolovok}</h3>
                        <p className={styles?.text} >{typo?.execute(item?.tekst || '')}</p>
                    </li>
                })}
            </ul>
        </section>
    );
};

export default InstructionBooksAdvantages;