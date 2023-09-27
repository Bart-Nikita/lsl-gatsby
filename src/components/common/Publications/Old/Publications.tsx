import React, {useEffect, useState} from 'react';
import styles from './Publications.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import {sortDate} from "../../../../hooks/useSortDate";
import Picture from "../../../images/Picture/Picture";
import {Link} from "react-router-dom";
import {PublicationsNode} from "../../../../types/data";

const Publications = () => {

    const { data} = useGlobalContext()

    const [publications, setPublications] = useState<PublicationsNode[]>()

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setPublications(sortDate(data?.publications?.nodes).filter((item, index) => index < 2))
        }
    }, [data])
    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)}>Публикации</h2>
            <ul className={stack(styles.list)}>
                {publications?.map((item, index) => <Link to={''}  key={index} className={stack('link',styles.item)}>
                    <Picture imageClassName={styles.item__image} className={styles.item__picture}
                             desktopIImageX1={item?.publications?.publicationsImageKompyuter1x?.sourceUrl}
                             desktopIImageX2={item?.publications?.publicationsImageKompyuter2x?.sourceUrl}
                             mobileIImageX1={item?.publications?.publicationsImageTelefon1x?.sourceUrl}
                             mobileIImageX2={item?.publications?.publicationsImageTelefon2x?.sourceUrl} alt={'Изображение публикации'}></Picture>
                    <p className={stack('text-secondary', styles.item__text)}
                       dangerouslySetInnerHTML={{__html: item?.publications?.publicationsKratkoeOpisanie}}></p>
                </Link>)}
            </ul>
        </section>
    );
};

export default Publications;
