import React from 'react';
import * as styles from './InstructionBooksHome.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { typo } from "../../../../tipograf";
import { GatsbyImage } from 'gatsby-plugin-image';
import { useCommonSection } from '../../../../hooks/useCommonSection';

const InstructionBooksHome = () => {
    const { instructionBooksPage, setIsInstructionBooksHeroFormModalOpen } = useGlobalContext()
    function onClickHandler() {
        setIsInstructionBooksHeroFormModalOpen(true)
    }
    const [header] = useCommonSection('shapka')

    return (
        <section className={styles.section}>
            <div className={stack('container', styles.container)}>
                <div className={styles.first}
                >
                    <div className={styles.first__picture}>
               {instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie?.gatsbyImage &&  <GatsbyImage className='w-full h-full' alt={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie?.altText || ''} image={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroFonovoeIzobrazhenie?.gatsbyImage}></GatsbyImage>}
                 </div>
                    <h1 className={styles.title}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroZagolovok || '')}</h1>
                    <p className={styles.subtitle}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroPodzagolovok || '')}</p>
                    <a target='_blank' href={`https://wa.me/${header?.header?.headerTelefon?.split('-').join('').split('(').join('').split(')').join('').split(' ').join('').split('−').join('')}`} className={stack('button-secondary-new', styles.button)}>
                        {instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroTekstKnopki}
                    </a>
                </div>
        {instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera?.gatsbyImage &&    <GatsbyImage className={styles.second} image={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera?.gatsbyImage} alt={instructionBooksPage?.wpPage?.instructionBooks?.instructionsHeroIzobrazhenieDlyaKompyutera?.altText || ''}></GatsbyImage>}
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