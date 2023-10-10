import React, { useEffect } from 'react';
import { stack } from "../../../hooks/useClassName";
import * as styles from './Messenger.module.css'
import { useCommonSection } from "../../../hooks/useCommonSection";
import Picture from "../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';
type MessengerProps = {
    isPhoneButton?: boolean,
    text?: string,
    className?: string;
}
const Messenger = ({ isPhoneButton, text, className }: MessengerProps) => {
    const [section] = useCommonSection('messendzher')

    return (
        <section className={stack('container', 'section-indent', styles.body, isPhoneButton && styles.withPhone, className)}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h2 className={stack('title-secondary', styles.title)}
                        dangerouslySetInnerHTML={{ __html: section?.messenger?.messengerZagolovok || '' }}></h2>
                    <p className={stack('text-primary', styles.text)}
                        dangerouslySetInnerHTML={{ __html: text || section?.messenger?.messengerPodzagolovok || '' }}></p>
                    {!isPhoneButton && <a className={stack('button-secondary', styles.link)} target={"_blank"}
                        href={section?.messenger?.messengerSsylkaKnopki || ''}
                        dangerouslySetInnerHTML={{ __html: section?.messenger?.messengerTekstKnopki || '' }}></a>}
                    {
                        isPhoneButton && <div className={styles.buttons}>
                            <a className={stack('button-secondary', styles.link)} target={"_blank"}
                                href={section?.messenger?.messengerSsylkaKnopki || ''}
                                dangerouslySetInnerHTML={{ __html: section?.messenger?.messengerTekstKnopki || '' }}></a>
                            <a className={stack('button-primary', styles.phoneButton)} href={'tel:' + section?.messenger?.messengerTelefon} target={"_blank"}>{section?.messenger?.messengerTelefon}</a>
                        </div>
                    }
                </div>
                <GatsbyImage className={styles.picture} image={section?.messenger?.messengerImageKompyuter1x?.gatsbyImage} alt={section?.messenger?.messengerImageKompyuter1x?.altText}></GatsbyImage>
            </div>
        </section>
    );
};

export default Messenger;
