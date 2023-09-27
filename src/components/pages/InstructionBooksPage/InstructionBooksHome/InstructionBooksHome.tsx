import React from 'react';
import * as styles from './InstructionBooksHome.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { typo } from "../../../../tipograf";
import instructionBooks from "../../../../pages/InstructionBooks";

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
                    <img className={styles.first__picture} src={instructionBooksPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie.sourceUrl} alt={instructionBooksPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie.altText} />
                    <h1 className={styles.title}>{typo.execute(instructionBooksPage?.instructionBooks?.instructionsHeroZagolovok)}</h1>
                    <p className={styles.subtitle}>{typo.execute(instructionBooksPage?.instructionBooks?.instructionsHeroPodzagolovok)}</p>
                    <button onClick={onClickHandler} className={stack('button-secondary-new', styles.button)}>
                        {instructionBooksPage?.instructionBooks?.instructionsHeroTekstKnopki}
                    </button>
                </div>
                <LightPicture className={styles.second} imageClassName={styles.second__image}
                    desktopIImage={instructionBooksPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera.sourceUrl}
                    mobileIImage={instructionBooksPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaTelefona.sourceUrl}
                    alt={instructionBooksPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera.altText} />
                <p className={stack(styles.text, styles.desktop)}>
                    {typo.execute(instructionBooksPage?.instructionBooks?.instructionsHeroTekstSleva)}
                </p>
                <p className={stack(styles.text, styles.desktop)}>
                    {typo.execute(instructionBooksPage?.instructionBooks?.instructionsHeroTekstSprava)}
                </p>
                <p className={stack(styles.text, styles.mobile)}>
                    {typo.execute(instructionBooksPage?.instructionBooks?.instructionsHeroTekstSleva + ' ' + instructionBooksPage?.instructionBooks?.instructionsHeroTekstSprava)}
                </p>
            </div>
        </section>
    );
};

export default InstructionBooksHome;