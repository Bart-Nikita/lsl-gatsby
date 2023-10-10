import React, { useEffect, useState } from 'react';
import * as styles from './Blog.module.css'
import { stack } from "../../../hooks/useClassName";
import { useGlobalContext } from "../../../context/context";
import { sortDate } from "../../../hooks/useSortDate";
import Picture from "../../images/Picture/Picture";
import { Link } from "gatsby";
import LightPicture from '../../images/LightPicture/LightPicture';
import { GatsbyImage } from 'gatsby-plugin-image';

export type BlogProps = {
    title: string,
    linkText: string,
    linkHref: string,
    remark: string
}
const Blog = ({ title, linkHref, linkText, remark }: BlogProps) => {

    const { posts } = useGlobalContext()

    useEffect(() => {
        console.log(posts)
    }, [posts])

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)} dangerouslySetInnerHTML={{ __html: title }}></h2>
            <ul className={styles.list}>
                {posts?.slice(0, 3)?.map((item, index) => <li key={index} className={stack(styles.item)} ><Link className={stack('link',styles.item__link)} to={'/blog/' + item.slug} >
                    <GatsbyImage className={styles.item__picture} image={item?.blog?.blogPostHeroImageKompyuter1x?.gatsbyImage} alt={item?.blog?.blogPostHeroImageKompyuter1x?.altText} ></GatsbyImage>
                </Link>
                </li>)}
            </ul>
            <div className={styles.bottom}>
                <p className={stack('remark', styles.remark)} dangerouslySetInnerHTML={{ __html: remark || '' }}></p>
                <Link className={stack('button-primary', styles.link)} to={linkHref || ''}
                    dangerouslySetInnerHTML={{ __html: linkText }}></Link>
            </div>
        </section>
    );
};

export default Blog;
