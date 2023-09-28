import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import {useCommonSection} from "../../../../hooks/useCommonSection";
import * as styles from './FeedbacksSimple.module.css'
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";

const FeedbacksSimple = ({className} : {className?: string}) => {
    const [section] = useCommonSection('otzyvy')

    return (
        <section className={stack('container', 'section-indent', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksZagolovok2 || ''}}></h2>
            </div>

            <div className={styles.sliders}>
                <SwiperLight>
                    <div className={styles.list}>


                    {    section?.feedbacks?.feedbacksSimpleSlajder?.map((item, index) =>

                                    <div key={index} className={styles.slider__item} >
                                        <div className={styles.slider__top} >
                                            <Picture className={styles.slider__picture}
                                                     mobileIImageX1={item?.feedbacksSimpleTelefon1x?.sourceUrl || ''}
                                                     mobileIImageX2={item?.feedbacksSimpleTelefon2x?.sourceUrl || ''}
                                                     desktopIImageX1={item?.feedbacksSimpleKompyuter1x?.sourceUrl || ''}
                                                     desktopIImageX2={item?.feedbacksSimpleKompyuter2x?.sourceUrl || ''} alt={item?.feedbacksSimpleKompyuter1x?.altText || ''}></Picture>
                                            <div className={styles.slider__person}>
                                                <h3 className={stack(styles.slider__name)}
                                                    dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleImya || ''}}></h3>
                                                <p className={stack('text-simple', styles?.slider__desc)}
                                                   dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleOpisanieKlienta || ''}}></p>
                                            </div>
                                        </div>
                                        <p className={stack('text-simple', styles.slider__text)}
                                           dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleTekstOtzyva || ''}}></p>

                                  </div>
                    )   }
                    </div>
                </SwiperLight>
            </div>
        </section>

    );
};

export default FeedbacksSimple;
