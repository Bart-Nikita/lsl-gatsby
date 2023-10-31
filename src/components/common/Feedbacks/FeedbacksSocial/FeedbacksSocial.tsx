import React, {useEffect, useState} from 'react';
import {useCommonSection} from "../../../../hooks/useCommonSection";
import {stack} from "../../../../hooks/useClassName";
import * as styles from "./FeedbacksSocial.module.css";
import Picture from "../../../images/Picture/Picture";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import { GatsbyImage } from 'gatsby-plugin-image';

const FeedbacksSocial = ({className} : {className?: string}) => {

    const [section] = useCommonSection('otzyvy')
    const [slideIndex, setSlideIndex] = useState<number>(0)

    const onNext = () => {
        if (section?.feedbacks?.feedbacksImageSlajder?.length && slideIndex + 1 < section?.feedbacks?.feedbacksImageSlajder?.length) {
            console.log(slideIndex)
            setSlideIndex(slideIndex + 1)

        }
    }
    const onPrev = () => {
        if (slideIndex > 0) {
            console.log(slideIndex)
            setSlideIndex(slideIndex - 1)
        }
    }

    return (
        <section className={stack('container', 'section-indent-new  before:absolute before:z-10 before:top-0 before:right-[-3px] before:bottom-0 before:w-[150px] before:pointer-events-none before:bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0.00)100%)] xl:before:hidden', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksZagolovok1 || ''}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksPodzagolovok1 || ''}}></p>

            </div>
            <div className='absolute top-[50%] xl:top-[59%] translate-y-[-50%] pointer-events-none flex justify-between right-[40px] left-[400px] z-10 xl:right-[20px] xl:left-[20px]'>
                <button onClick={onPrev} className={`h-[86px] w-[86px] xl:h-[56px] xl:w-[56px]  ${slideIndex === 0 ? 'pointer-events-none opacity-0' : 'pointer-events-auto'}`}>
                    <svg className='h-full w-full' viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="43" cy="43" r="42.5" fill="#F5F7FA" stroke="#DFDFDF" />
                        <path d="M44.7998 53L34.7998 43L44.7998 33L46.8041 34.9616L38.6591 43L46.8041 51.0384L44.7998 53Z" fill="black" />
                    </svg>
                </button>
                <button onClick={onNext} className={`h-[86px] w-[86px] xl:h-[56px] xl:w-[56px]  ${slideIndex + 2 > section?.feedbacks?.feedbacksImageSlajder?.length ? 'pointer-events-none opacity-0' : 'pointer-events-auto'}`}>
                    <svg className='h-full w-full' viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="43" cy="43" r="42.5" transform="matrix(-1 0 0 1 86 0)" fill="#F5F7FA" stroke="#DFDFDF" />
                        <path d="M41.2002 53L51.2002 43L41.2002 33L39.1959 34.9616L47.3409 43L39.1959 51.0384L41.2002 53Z" fill="black" />
                    </svg>
                </button>
            </div>
            <div className={styles.sliders}>
                    <SwiperLight forcedSliderIndex={slideIndex} setForcedSliderIndex={value => setSlideIndex(value)}>
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
