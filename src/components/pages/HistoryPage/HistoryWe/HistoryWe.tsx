import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import styles from './HistoryWe.module.css'
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import {useGlobalContext} from "../../../../context/context";
import QuoteTop from "../../../svg/QuoteTop";
import QuoteBottom from "../../../svg/QuoteBottom";
import {useResize} from "../../../../hooks/useResize";

const HistoryWe = () => {
    const {historyPage} = useGlobalContext()
    const [indent, setIndent] = useState(0)
    const [pictureBottom, setPictureBottom] = useState(0)
    const [textBottom, setTextBottom] = useState(0)
    const text = createRef<HTMLParagraphElement>()
    const [width] = useResize()

    useEffect(() => {
        setIndent(pictureBottom - textBottom)
    }, [textBottom, pictureBottom])

    useLayoutEffect(() => {
        if (text?.current) {
            const value = text.current.getBoundingClientRect().bottom
            setTextBottom(value)
        }
    }, [width, text?.current, historyPage]);


    return (
        <div className={stack('container-new', styles.body)}>
            <div className={styles.top}>
                <div className={styles.top__left}>
                    <div className={styles.top__back}>

                    </div>
                    <Picture imageClassName={styles.top__image}
                             className={styles.top__picture}
                             alt={historyPage?.history.historyWeFirstImageKompyuterX1.altText}
                             desktopIImageX1={historyPage?.history.historyWeFirstImageKompyuterX1.sourceUrl}
                             desktopIImageX2={historyPage?.history.historyWeFirstImageKompyuterX2.sourceUrl}
                             mobileIImageX1={historyPage?.history.historyWeFirstImageTelefonX1.sourceUrl}
                             mobileIImageX2={historyPage?.history.historyWeFirstImageTelefonX2.sourceUrl}></Picture>
                </div>
                <div className={styles.top__content}>
                    <h2 className={styles.title}
                        dangerouslySetInnerHTML={{__html: historyPage?.history.historyWeZagolovok}}></h2>
                    <div className={stack(styles.text, 'text-simple')}
                       dangerouslySetInnerHTML={{__html: historyPage?.history.historyWeTekstSverhu}}></div>
                    <div className={styles.top__indent}></div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom__content}>
                    <p ref={text} className={stack('text-simple', styles.text)}
                       dangerouslySetInnerHTML={{__html: historyPage?.history.historyWeTekstVnizu}}></p>
                    <div style={{height: indent}} className={styles.bottom__indent}></div>
                </div>
                <div className={styles.bottom__right}>
                    <div className={styles.bottom__back}>
                        <p className={styles.bottom__quote}>
                            <QuoteTop className={styles.quote__top}></QuoteTop>
                            <span className={styles.quote__text}
                                  dangerouslySetInnerHTML={{__html: historyPage?.history.historyWeCzitata}}></span>
                            <QuoteBottom className={styles.quote__bottom}></QuoteBottom>
                        </p>
                        <Picture setPosition={setPictureBottom} imageClassName={styles.bottom__image}
                                 className={styles.bottom__picture}
                                 alt={historyPage?.history.historyWeSecondImageKompyuterX1.altText}
                                 desktopIImageX1={historyPage?.history.historyWeSecondImageKompyuterX1.sourceUrl}
                                 desktopIImageX2={historyPage?.history.historyWeSecondImageKompyuterX2.sourceUrl}
                                 mobileIImageX1={historyPage?.history.historyWeSecondImageTelefonX1.sourceUrl}
                                 mobileIImageX2={historyPage?.history.historyWeSecondImageTelefonX2.sourceUrl}></Picture>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryWe;