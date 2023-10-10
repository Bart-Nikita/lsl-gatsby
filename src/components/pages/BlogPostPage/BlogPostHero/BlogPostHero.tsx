import React from 'react';
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import * as styles from "./BlogPostHero.module.css";
import Picture from "../../../images/Picture/Picture";
import { Link } from "gatsby";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { navigate } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';


const BlogPostHero = () => {
    const { blogPostPage } = useGlobalContext()

    return (
        <div className={stack('container-new', styles.body)}>
            <div className={styles.display}>
                <button onClick={() => navigate(-1)} className={styles.link}>
                    <svg className={styles.link__arrow} xmlns="http://www.w3.org/2000/svg" width="8" height="12"
                        viewBox="0 0 8 12" fill="none">
                        <path
                            d="M5.98022 11.7602L0.220215 6.00023L5.98022 0.240234L7.78021 2.02823L3.67621 6.00023L7.78021 9.97223L5.98022 11.7602Z"
                            fill="black" />
                    </svg>
                    Назад</button>
                <GatsbyImage className={styles.picture}  image={blogPostPage?.blog?.blogPostHeroImageKompyuter1x?.gatsbyImage} alt={blogPostPage?.blog?.blogPostHeroImageKompyuter1x?.altText}></GatsbyImage>
                <div className={stack(styles.content)}>
                    <h1 className={stack('text-page', styles.title)}>{blogPostPage?.blog?.blogPostHeroZagolovok}</h1>
                </div>
            </div>
        </div>
    );
};

export default BlogPostHero;