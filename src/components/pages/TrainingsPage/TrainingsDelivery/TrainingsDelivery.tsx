import React from 'react';
import * as styles from './TrainingsDelivery.module.css'
import { stack } from "../../../../hooks/useClassName";
import { useGlobalContext } from "../../../../context/context";
import { GatsbyImage } from 'gatsby-plugin-image';
const TrainingsDelivery = () => {
    const { trainingsPage } = useGlobalContext()

    return (
        <div className={stack('container-new', styles.body)}>
            <h2 className={stack('text-large-new', styles.title)} dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings?.trainingsDeliveryZagolovok || '' }}></h2>
            <ul className={styles.list}>
                {trainingsPage?.wpPage?.trainings?.trainingsDeliverySpisok?.map((item, index) => {
                    //console.log(item)
                    if (!item?.dekor) return
                    return <li key={index} className={styles.list__item}>
                        <div className='mr-auto w-fit'>
                            <GatsbyImage className={styles.item__image} objectFit='contain' image={item?.dekor?.gatsbyImage} alt={item?.dekor?.altText} ></GatsbyImage>
                        </div>
                        <p className={styles.item__text} dangerouslySetInnerHTML={{ __html: item.tekst || '' }}></p>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default TrainingsDelivery;