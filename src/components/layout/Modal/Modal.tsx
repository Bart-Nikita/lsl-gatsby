import React, {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import styles from './Modal.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import ReactModal from 'react-modal';

type ModalProps = {
    open: boolean,
    children: ReactElement | ReactNode

    setOpen: Dispatch<SetStateAction<boolean>>
}
const Modal = ({children, open, setOpen}: ModalProps) => {
    const {isNewContainer} = useGlobalContext()
    return (
        <ReactModal style={{content: {backgroundColor: 'transparent', border: 'none', inset: 0}, overlay: {zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.3)'}}} appElement={document.getElementById('root')} isOpen={open} bodyOpenClassName={'bg-transparent'}>
            <div onClick={() => setOpen(false)} className={stack(styles.modal, open && styles.open)}>
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
