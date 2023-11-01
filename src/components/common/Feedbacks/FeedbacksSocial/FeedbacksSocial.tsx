import React, {useEffect, useState} from 'react';
import {useCommonSection} from "../../../../hooks/useCommonSection";
import {stack} from "../../../../hooks/useClassName";
import * as styles from "./FeedbacksSocial.module.css";
import Picture from "../../../images/Picture/Picture";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import { GatsbyImage } from 'gatsby-plugin-image';

const FeedbacksSocial = ({className} : {className?: string}) => {

    const [section] = useCommonSection('otzyvy')

   
    return (
        <section className={stack('container', 'section-indent-new  ', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksZagolovok1 || ''}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksPodzagolovok1 || ''}}></p>

            </div>
            
            <div className={styles.sliders}>
                    <SwiperLight>
                        <div className={styles.slider__list}>
                        {section?.feedbacks?.feedbacksImageSlajder?.map((item, index) =>
                            <div key={index} className={styles.slider__item}>
                                <div className={styles.slider__wrapper}>
                                 <GatsbyImage className={styles.slide__picture} image={item?.feedbacksImageKompyuter1x?.gatsbyImage} alt={item?.feedbacksImageKompyuter1x?.altText}></GatsbyImage>
                                </div>
                            </div>

                        )}
                        </div>
                    </SwiperLight>
            </div>
        </section>
    );
};

export default FeedbacksSocial;
