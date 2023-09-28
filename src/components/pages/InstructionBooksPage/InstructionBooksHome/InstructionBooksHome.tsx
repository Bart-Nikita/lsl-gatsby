import React from 'react';
import * as styles from './InstructionBooksHome.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { typo } from "../../../../tipograf";

const InstructionBooksHome = () => {
    const { instructionBooksPage, setIsInstructionBooksHeroFormModalOpen } = useGlobalContext()
    function onClickHandler() {
        setIsInstructionBooksHeroFormModalOpen(true)
    }
    return (
        <section className={styles.section}>
            <div className={stack('container', styles.container)}>
                <div className={styles.first}
                >
                    <img className={styles.first__picture} src={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie?.sourceUrl || ''} alt={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie?.altText || ''} />
                    <h1 className={styles.title}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroZagolovok || '')}</h1>
                    <p className={styles.subtitle}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroPodzagolovok || '')}</p>
                    <button onClick={onClickHandler} className={stack('button-secondary-new', styles.button)}>
                        {instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstKnopki}
                    </button>
                </div>
                <LightPicture className={styles.second} imageClassName={styles.second__image}
                    desktopIImage={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera?.sourceUrl || ''}
                    mobileIImage={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaTelefona?.sourceUrl || ''}
                    alt={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera?.altText || ''} />
                <p className={stack(styles.text, styles.desktop)}>
                    {typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstSleva || '')}
                </p>
                <p className={stack(styles.text, styles.desktop)}>
                    {typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstSprava || '')}
                </p>
                <p className={stack(styles.text, styles.mobile)}>
                    {typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstSleva + ' ' + instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstSprava)}
                </p>
            </div>
        </section>
    );
};

export default InstructionBooksHome;