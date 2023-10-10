import React, { useEffect, useState } from 'react';
import * as styles from './Feedbacks.module.css'
import { useCommonSection } from "../../../hooks/useCommonSection";
import { stack } from "../../../hooks/useClassName";
import Picture from "../../images/Picture/Picture";
import SwiperLight from "../../lowleveled/SwiperLight/SwiperLight";
import { GatsbyImage } from 'gatsby-plugin-image';

const Feedbacks = ({ className }: { className?: string }) => {
    const [section] = useCommonSection('otzyvy')


    return (
        <section className={stack('container', 'section-indent', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{ __html: section?.feedbacks?.feedbacksZagolovok || '' }}></h2>
                <p className={stack('text-simple', styles.text)}
                    dangerouslySetInnerHTML={{ __html: section?.feedbacks?.feedbacksPodzagolovok || '' }}></p>

            </div>
            <div className={styles.sliders}>
                <div className={styles.sliderFirst}>
                    <SwiperLight>
                        <div className={styles.sliderFirst__list}>
                            {section?.feedbacks?.feedbacksImageSlajder?.map((item, index) =>
                                <div key={index} className={styles.slideFirst__item}>
                                    <div className={styles.slideFirst__wrapper}>
                                        <GatsbyImage className={styles.slideFirst__picture} image={item?.feedbacksImageKompyuter1x?.gatsbyImage} alt={item?.feedbacksImageKompyuter1x?.altText}></GatsbyImage>
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
                                           <GatsbyImage className={styles.sliderSecond__picture} imgClassName={styles.sliderSecond__image} image={item?.feedbacksSimpleKompyuter1x?.gatsbyImage} alt={item?.feedbacksSimpleKompyuter1x?.altText}></GatsbyImage>
                                            <div className={styles.sliderSecond__person}>
                                                <h3 className={stack(styles.sliderSecond__name)}
                                                    dangerouslySetInnerHTML={{ __html: item?.feedbacksSimpleImya || '' }}></h3>
                                                <p className={stack('text-simple', styles?.sliderSecond__desc)}
                                                    dangerouslySetInnerHTML={{ __html: item?.feedbacksSimpleOpisanieKlienta || '' }}></p>
                                            </div>
                                        </div>
                                        <p className={stack('text-simple', styles.sliderSecond__text)}
                                            dangerouslySetInnerHTML={{ __html: item?.feedbacksSimpleTekstOtzyva || '' }}></p>

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
