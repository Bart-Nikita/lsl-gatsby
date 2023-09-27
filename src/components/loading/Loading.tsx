import React, {useEffect, useState} from 'react';
import styles from './Loading.module.css'
import {useGlobalContext} from "../../context/context";
import {stack} from "../../hooks/useClassName";

const Loading = () => {
    const {isLoading} = useGlobalContext()

    return (
        <div className={stack(styles.ldsHeart, !isLoading && styles.disappear)} >
            <div></div>
        </div>
    );
};

export default Loading;
