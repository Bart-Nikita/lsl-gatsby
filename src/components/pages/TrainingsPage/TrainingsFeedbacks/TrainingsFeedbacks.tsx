import React from 'react';
import {useCommonSection} from "../../../../hooks/useCommonSection";
import {stack} from "../../../../hooks/useClassName";
import * as styles from "./TrainingsFeedbacks.module.css";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import Picture from "../../../images/Picture/Picture";
import {Link} from "gatsby";

const TrainingsFeedbacks = ({className}: { className?: string }) => {
    const [section] = useCommonSection('otzyvy')

    return (
        <section className={stack('container', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('text-large-new', styles.title)}
                    dangerouslySetInnerHTML={{__html: section?.feedbacks?.feedbacksZagolovok2}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: section?.feedbacks.feedbacksPodzagolovok}}></p>
                <Link className={stack('button-primary-new', styles.link)} to={"/feedbacks"}>Смотреть все отзывы</Link>
            </div>
            <div className={styles.sliders}>
                <SwiperLight>
                    <div className={styles.list}>
                        {section?.feedbacks?.feedbacksSimpleSlajder?.map((item, index) =>

                            <div key={index} className={styles.slider__item}>
                                <div className={styles.slider__top}>
                                    <Picture className={styles.slider__picture}
                                             mobileIImageX1={item?.feedbacksSimpleTelefon1x?.sourceUrl}
                                             mobileIImageX2={item?.feedbacksSimpleTelefon2x?.sourceUrl}
                                             desktopIImageX1={item?.feedbacksSimpleKompyuter1x?.sourceUrl}
                                             desktopIImageX2={item?.feedbacksSimpleKompyuter2x?.sourceUrl}
                                             alt={item?.feedbacksSimpleKompyuter1x?.altText}></Picture>
                                    <div className={styles.slider__person}>
                                        <h3 className={stack(styles.slider__name)}
                                            dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleImya}}></h3>
                                        <p className={stack('text-simple', styles?.slider__desc)}
                                           dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleOpisanieKlienta}}></p>
                                    </div>
                                </div>
                                <p className={stack('text-simple', styles.slider__text)}
                                   dangerouslySetInnerHTML={{__html: item?.feedbacksSimpleTekstOtzyva}}></p>

                            </div>
                        )}
                    </div>
                </SwiperLight>
            </div>
        </section>

    );
};
export default TrainingsFeedbacks;