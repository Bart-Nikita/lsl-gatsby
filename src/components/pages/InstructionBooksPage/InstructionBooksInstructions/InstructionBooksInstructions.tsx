import React from 'react';
import styles from './InstructionBooksInstructions.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import LightPicture from "../../../images/LightPicture/LightPicture";
import {typo} from "../../../../tipograf";
import FileSvg from "../../../svg/FileSvg";
import { InstructionsInstructionsSpisok, TrainingsNode } from '../../../../types/data';
const InstructionBooksInstructions = () => {
    const {instructionBooksPage, setInstructionBooksModalData, setIsInstructionBooksModalOpen} = useGlobalContext()
    const itemClickHandler = (item: InstructionsInstructionsSpisok) => {
        setInstructionBooksModalData(item)
        setIsInstructionBooksModalOpen(true)
    }
    return (
        <section className={styles.section}>
            <div className={stack('container', styles.container)}>
                <h2 className={styles.title}>{typo.execute(instructionBooksPage?.instructionBooks?.instructionsInstructionsZagolovok)}</h2>
                <ul className={styles.list}>
                    {instructionBooksPage?.instructionBooks?.instructionsInstructionsSpisok.map((item, index) => <li key={index} className={styles.list__item}>
                        <button onClick={() => itemClickHandler(item)} className={stack(styles.button)}>
                            <LightPicture className={styles.picture} imageClassName={styles.image}
                                          desktopIImage={item.izobrazhenieDlyaKompyutera?.sourceUrl}
                                          mobileIImage={item.izobrazhenieDlyaTelefona?.sourceUrl}
                                          alt={item.izobrazhenieDlyaKompyutera?.altText}></LightPicture>
                            <div className={styles.item__content}>
                                <p className={styles.content__title}
                                   >{typo.execute(item.nazvanie)}</p>
                                <p className={styles.content__price}
                                   >{typo.execute(item.czena)}</p>
                                <p className={styles.content__text}
                                   >{typo.execute(item.kratkoeOpisanie)}</p>
                            </div>
                            <FileSvg className={styles.button__decor}></FileSvg>
                        </button>
                    </li>)}
                </ul>
            </div>
        </section>
    );
};

export default InstructionBooksInstructions;