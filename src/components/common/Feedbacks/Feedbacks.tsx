import React, {useEffect, useState} from 'react';
import * as styles from './Feedbacks.module.css'
import {useCommonSection} from "../../../hooks/useCommonSection";
import {stack} from "../../../hooks/useClassName";
import Picture from "../../images/Picture/Picture";
import SwiperLight from "../../lowleveled/SwiperLight/SwiperLight";

const Feedbacks = ({className} : {className?: string}) => {
    const [section] = useCommonSection('otzyvy')


    return (
        <section className={stack('container', 'section-indent', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksZagolovok || ''}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksPodzagolovok || ''}}></p>

            </div>
            <div className={styles.sliders}>
                <div className={styles.sliderFirst}>
                   <SwiperLight>
                       <div className={styles.sliderFirst__list}>
                        {section?.feedbacks?.feedbacksImageSlajder?.map((item, index) =>
                            <div key={index} className={styles.slideFirst__item}>
                                <div className={styles.slideFirst__wrapper}>
                                    <Picture
                                        imageClassName={styles.slideFirst__image}
                                        desktopIImageX1={item?.feedbacksImageKompyuter1x?.sourceUrl || ''}
                                        desktopIImageX2={item?.feedbacksImageKompyuter2x?.sourceUrl || ''}
                                        mobileIImageX1={item?.feedbacksImageTelefon1x?.sourceUrl || ''}
                                        mobileIImageX2={item?.feedbacksImageTelefon2x?.sourceUrl || ''}
                                        className={styles.slideFirst__picture} alt={'Фото-отзыв'}></Picture>
                                </div>
                            </div>
                          )}
                       </div>
                   </SwiperLight>
                </div>
                <div className={styles.sliderSecond}>
                  <SwiperLight>
                      <div className={styles.sliderSecond__list}>
                        {

                            section?.feedbacks?.feedbacksSimpleSlajder?.map((item, index) =>
                            <div key={index} className={styles.sliderSecond__item}>
                                <div className={styles.sliderSecond__top}>
                                    <Picture className={styles.sliderSecond__picture}
                                             mobileIImageX1={item?.feedbacksSimpleTelefon1x?.sourceUrl || ''}
                                             mobileIImageX2={item?.feedbacksSimpleTelefon2x?.sourceUrl || ''}
                                             desktopIImageX1={item?.feedbacksSimpleKompyuter1x?.sourceUrl || ''}
                                             desktopIImageX2={item?.feedbacksSimpleKompyuter2x?.sourceUrl || ''} alt={item?.feedbacksSimpleKompyuter1x?.altText || ''}></Picture>
                                    <div className={styles.sliderSecond__person}>
                                        <h3 className={stack(styles.sliderSecond__name)}
                                            dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleImya || ''}}></h3>
                                        <p className={stack('text-simple', styles?.sliderSecond__desc)}
                                           dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleOpisanieKlienta || ''}}></p>
                                    </div>
                                </div>
                                <p className={stack('text-simple', styles.sliderSecond__text)}
                                   dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleTekstOtzyva || ''}}></p>

                            </div>
                           )}
                      </div>
                  </SwiperLight>
                </div>
            </div>
        </section>
    );
};

export default Feedbacks;
