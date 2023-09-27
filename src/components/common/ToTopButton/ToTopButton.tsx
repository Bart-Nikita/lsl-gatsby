import React from 'react';
import styles from './ToTopButton.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";

type ToTopButtonProps = {
    className: string
}
const ToTopButton = ({className}: ToTopButtonProps) => {
    const {isNewContainer} = useGlobalContext()
    const clickHandler = () => {
        scrollTo(0, 0)
    }
    return (
        <button onClick={clickHandler}
                className={stack('link', isNewContainer ? styles.new : styles.old, styles.body, className)}>
            <span className={styles.text}>Наверх</span>
            <img src="/image/arrow-up.png" className={styles.icon} alt="Стрелка вверх"/>
        </button>
    );
};

export default ToTopButton;
