import React from 'react'
import { stack } from "../../../../hooks/useClassName";
import * as styles from './HomeTrainings.module.css'
import { useGlobalContext } from "../../../../context/context";
import { Link } from "gatsby";
import { sortDate } from "../../../../hooks/useSortDate";
import Picture from "../../../images/Picture/Picture";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { useTrainings } from "../../../../hooks/useTrainings";

const HomeTrainings = () => {

    const { mainPage: page, trainings } = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)}>{page?.wpPage?.main?.mainTrainingZagolovok}</h2>
            <div className={styles.list}>
                {trainings?.slice(0, 5).map((item, index) => {

                    if (!item?.training?.trainingImageKompyuter && !item?.training?.trainingImageTelefon) return
                    return <Link to={''} key={index} className={stack(styles.list__item)}>
                        <LightPicture className={styles.item__image} imageClassName={styles.picture__image}
                            desktopIImage={item?.training?.trainingImageKompyuter?.sourceUrl || ''}
                            mobileIImage={item?.training?.trainingImageTelefon?.sourceUrl || ''}
                            alt={item?.training?.trainingImageKompyuter?.altText || ''}></LightPicture>
                        <div className={styles.item__content}>
                            <div className={styles.item__top}>
                                <h3 className={stack('text-primary', styles.item__title)}
                                    dangerouslySetInnerHTML={{ __html: item.title || '' }}></h3>
                                <p className={stack('text-primary', styles.item__price)}
                                >{item?.training?.trainingCzena} </p>
                            </div>
                            <p className={stack('text-small', styles.item__text)}
                                dangerouslySetInnerHTML={{ __html: item?.training?.trainingKratkoeOpisanie || '' }}></p>
                        </div>
                    </Link>
                })}
            </div>
            <Link className={stack('button-primary', styles.button)}
                to={page?.wpPage?.main?.mainTrainingAdresSsylki || ''}>{page?.wpPage?.main?.mainTrainingTekstSsylki}</Link>
        </section>
    );
};

export default HomeTrainings;
