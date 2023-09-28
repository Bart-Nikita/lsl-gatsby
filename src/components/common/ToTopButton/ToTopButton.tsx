import React, { useEffect } from 'react';
import * as styles from './ToTopButton.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import { useFile } from '../../../hooks/useFile';

type ToTopButtonProps = {
    className: string
}
const ToTopButton = ({className}: ToTopButtonProps) => {
    const {blogPostPage} = useGlobalContext()
    const clickHandler = () => {
        scrollTo(0, 0)
    }
    const [arrow] = useFile('arrow-up')

    useEffect(() => {
     console.log( arrow)
    }, [arrow])
    
    return (
        <button onClick={clickHandler}
                className={stack('link',  styles.body, className)}>
            <span className={styles.text}>Наверх</span>
            <img src={ arrow} className={styles.icon} alt="Стрелка вверх"/>
        </button>
    );
};

export default ToTopButton;
