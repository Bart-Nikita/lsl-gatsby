import React, {Dispatch, ReactElement, ReactNode, SetStateAction, createRef, useEffect} from 'react';
import * as styles from './Modal.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#___gatsby')

type ModalProps = {
    open: boolean,
    children: ReactElement | ReactNode

    setOpen: (value: boolean) => void
}

const root = typeof document !== `undefined` ? document.getElementById('___gatsby') : null

const Modal = ({children, open, setOpen}: ModalProps) => {
    const {isNewContainer} = useGlobalContext()

    const ref = createRef<HTMLDivElement>()

  

    const style = {content: {backgroundColor: 'transparent', border: 'none', inset: 0}, overlay: {zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.3)'}}
    return (
        //@ts-ignore
        <ReactModal style={style}  isOpen={open} bodyOpenClassName={'bg-transparent'} appElement={root}>
            <div ref={ref} onClick={() => setOpen(false)} className={stack(styles.modal, open && styles.open)}>
                <div className={stack(styles.body)}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default Modal;
