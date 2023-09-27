import React from 'react';
import * as styles from './Steps.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import {useCommonSection} from "../../../hooks/useCommonSection";
import {Link} from "gatsby";

const Steps = () => {

   const [section] = useCommonSection('kak-oformit-zakaz')
    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary',styles.title)} dangerouslySetInnerHTML={{__html: section?.orderSteps?.zagolovok || ''}}></h2>
            <ul className={styles.list}>
                {section?.orderSteps?.spisok?.map((item,index) => <li className={styles.item} key={index}>
                    <div className={styles.item__top}>
                        <h3 className={stack('text-secondary',styles.item__title)} dangerouslySetInnerHTML={{__html: item?.nomer || ''}}></h3>
                        <div className={styles.item__decor}></div>
                    </div>
                    <p className={stack(styles.item__content)} >
                        <span className={stack('text-secondary',styles.item__text)} dangerouslySetInnerHTML={{__html: item?.tekst || ''}}></span> &nbsp;
                        { item?.estLiSsylkaVTekste === "true" && <Link className={stack('link', 'text-secondary', styles.item__text, styles.item__link)}
                               to={item?.adresSsylki || ''}>{item?.tekstSsylki}</Link>}
                    </p>
                </li>)}

            </ul>
        </section>
    );
};

export default Steps;
