import React from 'react';
import * as styles from './Support.module.css'
import { useGlobalContext } from "../../../context/context";
import { useCommonSection } from "../../../hooks/useCommonSection";
import { stack } from "../../../hooks/useClassName";
import { Link } from "gatsby";
import Picture from "../../images/Picture/Picture";
import { GatsbyImage } from 'gatsby-plugin-image';

const Support = () => {
    const { isNewContainer } = useGlobalContext()
    const [section] = useCommonSection('vasha-podderzhka')
    return (
        <div
            className={stack('container-new', styles.new, styles.body)}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <h2 className={stack('text-large', styles.title)}
                        dangerouslySetInnerHTML={{ __html: section?.support?.supportZagolovok || '' }}></h2>
                    <p className={stack('text-simple', styles.text)}
                        dangerouslySetInnerHTML={{ __html: section?.support?.supportTekst || '' }}></p>
                    <Link className={stack('link', 'button-secondary-new', styles.link)}
                        to={section?.support?.supportAdresSsylki || ''}
                        dangerouslySetInnerHTML={{ __html: section?.support?.supportTekstSsylki || '' }}></Link>
                </div>
                <div className={styles.box}>
                <GatsbyImage className={styles.picture} imgClassName={styles.image} image={section?.support?.supportImageKompyuterX1?.gatsbyImage} alt={section?.support?.supportImageKompyuterX1?.altText}></GatsbyImage>

                </div>
            </div>
        </div>
    );
};

export default Support;