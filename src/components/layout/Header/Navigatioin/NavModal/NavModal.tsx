import React, {useEffect, useState} from 'react';
import Modal from "../../../Modal/Modal";
import {useGlobalContext} from "../../../../../context/context";
import {stack} from "../../../../../hooks/useClassName";
import * as styles from './NavModal.module.css'
import {Navigation} from "../../Header";

const NavModal = () => {
    const {isNavModalOpen, setIsNavModalOpen} = useGlobalContext()

    return (
        <Modal open={isNavModalOpen} setOpen={setIsNavModalOpen}>
            <div className={stack(styles.body, 'container')}>
                <Navigation></Navigation>
            </div>
        </Modal>
    );
};

export default NavModal;
