import React, {useEffect, useState} from 'react';
import styles from './Cookies.module.css'
import {stack} from "../../../hooks/useClassName";
import {useCommonSection} from "../../../hooks/useCommonSection";

const Cookies = () => {
    const [section] = useCommonSection('cookies')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        }, 7000)
    }, [])

    const clickHandler = () => {
        setOpen(false)
    }

    return (

        <div className={stack(styles.content, 'container')}>
            <div className={styles.wrapper}>
                <div className={stack(styles.body, open && styles.open)}>
                    <p className={styles.text}>Мы используем <a
                        href={section?.cookies?.cookiesPolitikaKonfidenczialnosti?.mediaItemUrl} className={stack('link',styles.link)}
                        target={'_blank'}>cookie</a>, чтобы пользоваться сайтом было удобно. </p>
                    <button onClick={clickHandler} className={stack('button-small', styles.button)}>Хорошо</button>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
