import React, {useEffect, useState} from 'react';
import * as styles from './Blog.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import {sortDate} from "../../../hooks/useSortDate";
import Picture from "../../images/Picture/Picture";
import {Link} from "gatsby";
import LightPicture from '../../images/LightPicture/LightPicture';

export type BlogProps = {
    title: string,
    linkText: string,
    linkHref: string,
    remark: string
}
const Blog = ({title, linkHref, linkText, remark}: BlogProps) => {

    const {posts} = useGlobalContext()

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)} dangerouslySetInnerHTML={{__html: title}}></h2>
            <ul className={styles.list}>
                {posts?.slice(0,3)?.map((item, index) => <li key={index} className={stack(styles.item)} ><Link className={styles.item__link} to={item.id} >
                    <LightPicture imageClassName={stack('link',styles.item__image)} className={styles.item__picture}
                             desktopIImage={item?.blog?.blogPostHeroImageKompyuter1x?.sourceUrl || ''}
                             mobileIImage={item?.blog?.blogPostHeroImageTelefon1x?.sourceUrl || ''}
                            alt={item?.blog?.blogPostHeroImageKompyuter1x?.altText || ''}></LightPicture>
                </Link>
                </li>)}
            </ul>
            <div className={styles.bottom}>
                <p className={stack('remark', styles.remark)} dangerouslySetInnerHTML={{__html: remark}}></p>
                <Link className={stack('button-primary', styles.link)} to={linkHref}
                      dangerouslySetInnerHTML={{__html: linkText}}></Link>
            </div>
        </section>
    );
};

export default Blog;
