import React, { Dispatch, ReactElement, ReactNode, SetStateAction, createRef, useEffect } from 'react';
import * as styles from './Modal.module.css'
import { stack } from "../../../hooks/useClassName";
import { useGlobalContext } from "../../../context/context";

type ModalProps = {
    open: boolean,
    children: ReactElement | ReactNode

    setOpen: (value: boolean) => void
}

const root = typeof document !== `undefined` ? document.getElementById('___gatsby') : null

const Modal = ({ children, open, setOpen }: ModalProps) => {

    return (
            <div  onClick={() => setOpen(false)} className={stack(styles.modal, open && styles.open)}>
                <div className={stack(styles.body)}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
    );
};

export default Modal;
