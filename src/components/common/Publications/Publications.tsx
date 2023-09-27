import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { useGlobalContext } from "../../../context/context";
import { sortDate } from "../../../hooks/useSortDate";
import { stack } from "../../../hooks/useClassName";
import * as styles from "./Publications.module.css";
import Picture from "../../images/Picture/Picture";
import { Link } from "gatsby";
import SwiperLight from "../../lowleveled/SwiperLight/SwiperLight";


const SlideItem = (item: Queries.WpPublication) => {

    return <Link to={item?.publications?.publicationsAdresSsylki || ''} target={"_blank"} onMouseMove={(e) => e.preventDefault()} className={stack('link', styles.item)}>
        <div className={styles.item__top}>
            <div className={styles.item__decor}></div>
            <Picture imageClassName={styles.item__image} className={styles.item__picture}
                desktopIImageX1={item?.publications?.publicationsImageKompyuter1x?.sourceUrl || ''}
                desktopIImageX2={item?.publications?.publicationsImageKompyuter2x?.sourceUrl || ''}
                mobileIImageX1={item?.publications?.publicationsImageTelefon1x?.sourceUrl || ''}
                mobileIImageX2={item?.publications?.publicationsImageTelefon2x?.sourceUrl || ''} alt={item?.publications?.publicationsImageKompyuter1x?.altText || ''}></Picture>
        </div>

        <p className={stack('text-secondary', styles.item__text)}
            dangerouslySetInnerHTML={{ __html: item?.publications?.publicationsKratkoeOpisanie || '' }}></p>
    </Link>
}


const Publications = ({ className }: { className?: string }) => {

    const { publications } = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent', styles.body, className)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                >Публикации</h2>
            </div>

            <div className={styles.slider}>
                <SwiperLight>
                    <div className={styles.slider__list}>
                        {publications?.map((item, index) => <SlideItem key={index} {...item}></SlideItem>)}
                    </div>
                </SwiperLight>
            </div>
        </section>
    );
};

export default Publications;
