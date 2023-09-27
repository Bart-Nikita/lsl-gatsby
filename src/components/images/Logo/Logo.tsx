import React from 'react';
import * as styles from './Logo.module.css'
import {Link} from "gatsby";
import {stack} from "../../../hooks/useClassName";

type LogoProps = {
    mobileUrl: string,
    desktopUrl: string,
alt: string,
    className: string
}
const Logo = ({desktopUrl, mobileUrl ,className, alt}: LogoProps) => {
    return (
        <Link to={'/'} className={stack('link',styles.link, className)}>
            <picture className={styles.picture}>
                <source className={styles.image} srcSet={mobileUrl} media="(max-width: 1023px)"/>
                <img className={styles.image} src={desktopUrl} alt={alt}/>
            </picture>
        </Link>

    );
};

export default Logo;
