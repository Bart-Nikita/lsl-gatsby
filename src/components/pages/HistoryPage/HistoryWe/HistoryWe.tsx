import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import * as styles from './HistoryWe.module.css'
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import {useGlobalContext} from "../../../../context/context";
import QuoteTop from "../../../svg/QuoteTop";
import QuoteBottom from "../../../svg/QuoteBottom";
import {useResize} from "../../../../hooks/useResize";
import { GatsbyImage } from 'gatsby-plugin-image';

const HistoryWe = () => {
    const {historyPage} = useGlobalContext()
    const [indent, setIndent] = useState(0)
    const [pictureBottom, setPictureBottom] = useState(0)
    const [textBottom, setTextBottom] = useState(0)
    const text = createRef<HTMLParagraphElement>()
    const [width] = useResize()

    // useEffect(() => {
    //     setIndent(pictureBottom - textBottom)
    // }, [textBottom, pictureBottom])

    // useLayoutEffect(() => {
    //     if (text?.current) {
    //         const value = text.current.getBoundingClientRect().bottom
    //         setTextBottom(value)
    //     }
    // }, [width, text?.current, historyPage]);


    return (
        <div className={stack('container-new', styles.body)}>
            <div className={styles.top}>
                <div className={styles.top__left}>
                    <div className={styles.top__back}>

                    </div>
         <div className={styles.top__picture}>
            <GatsbyImage className='w-full h-full' imgClassName={styles.top__image} image={historyPage?.wpPage?.history?.historyWeFirstImageKompyuterX1?.gatsbyImage} alt={historyPage?.wpPage?.history?.historyWeFirstImageKompyuterX1?.altText}></GatsbyImage>
         </div>
                </div>
                <div className={styles?.top__content}>
                    <h2 className={styles?.title}
                        dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyWeZagolovok || ''}}></h2>
                    <div className={stack(styles?.text, 'text-simple')}
                       dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyWeTekstSverhu || ''}}></div>
                    <div className={styles?.top__indent}></div>
                </div>
            </div>
            <div className={styles?.bottom}>
                <div className={styles?.bottom__content}>
                    <p ref={text} className={stack('text-simple', styles?.text)}
                       dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyWeTekstVnizu || ''}}></p>
                    <div style={{height: indent}} className={styles?.bottom__indent}></div>
                </div>
                <div className={styles?.bottom__right}>
                    <div className={styles?.bottom__back}>
                        <p className={styles?.bottom__quote}>
                            <QuoteTop className={styles?.quote__top}></QuoteTop>
                            <span className={styles?.quote__text}
                                  dangerouslySetInnerHTML={{__html: historyPage?.wpPage?.history?.historyWeCzitata || ''}}></span>
                            <QuoteBottom className={styles?.quote__bottom}></QuoteBottom>
                        </p>
                     <div className={styles.bottom__picture}>
                     <GatsbyImage className='w-full h-full' imgClassName={styles.bottom__image} image={historyPage?.wpPage?.history?.historyWeSecondImageKompyuterX1?.gatsbyImage} alt={historyPage?.wpPage?.history?.historyWeSecondImageKompyuterX1?.altText}></GatsbyImage>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryWe;