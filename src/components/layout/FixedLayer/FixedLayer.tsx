import React, {ReactElement, ReactNode} from 'react';
import styles from './FixedLayer.module.css'
import Cookies from "../Cookies/Cookies";
export type FixedLayerProps = {
    children: ReactNode | ReactElement
}
const FixedLayer = ({children}:FixedLayerProps) => {
    return (
        <div id={'layer'} className={styles.body}>
            {children}
        </div>
    );
};

export default FixedLayer;
