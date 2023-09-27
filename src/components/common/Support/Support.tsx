import React from 'react';
import styles from './Support.module.css'
import {useGlobalContext} from "../../../context/context";
import {useCommonSection} from "../../../hooks/useCommonSection";
import {stack} from "../../../hooks/useClassName";
import {Link} from "react-router-dom";
import Picture from "../../images/Picture/Picture";

const Support = () => {
    const {isNewContainer} = useGlobalContext()
    const [section] = useCommonSection('vasha-podderzhka')
    return (
        <div
            className={stack( 'container-new',  styles.new , styles.body)}>
            <div className={styles.block}>
                <div className={styles.content}>
                    <h2 className={stack('text-large', styles.title)}
                        dangerouslySetInnerHTML={{__html: section?.support.supportZagolovok}}></h2>
                    <p className={stack('text-simple', styles.text)}
                       dangerouslySetInnerHTML={{__html: section?.support.supportTekst}}></p>
                    <Link className={stack('link', 'button-secondary-new', styles.link)}
                          to={section?.support.supportAdresSsylki}
                          dangerouslySetInnerHTML={{__html: section?.support.supportTekstSsylki}}></Link>
                </div>
                <Picture mobileIImageX1={section?.support.supportImageTelefonX1.sourceUrl}
                         mobileIImageX2={section?.support.supportImageTelefonX2.sourceUrl}
                         desktopIImageX2={section?.support.supportImageKompyuterX2.sourceUrl}
                         desktopIImageX1={section?.support.supportImageKompyuterX1.sourceUrl}
                         alt={section?.support.supportImageKompyuterX1.altText} className={styles.picture}
                         imageClassName={styles.image}></Picture>
            </div>
        </div>
    );
};

export default Support;