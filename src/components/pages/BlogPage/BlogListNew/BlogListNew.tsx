import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributeAnchorTarget, useEffect, useLayoutEffect, useState } from 'react'
import * as styles from './BlogListNew.module.css'
import { useGlobalContext } from "../../../../context/context";
import { Link } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';
import { stack } from '../../../../hooks/useClassName';
import WhiteTriangle from '../../../svg/WhiteTriangle';

export default function BlogListNew() {
    const { blogPage, setBlogRedirectLink } = useGlobalContext()

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        // console.log(e.target.href)
        setBlogRedirectLink(e.target.href)

    }
    return (
        <section className={stack("container", styles.body)}>
            <h1 className={stack('text-page', styles.title)}
                dangerouslySetInnerHTML={{ __html: blogPage?.wpPage?.blogPage?.blogZagolovok || '' }}></h1>
            <ul className={styles.list}>
                {blogPage?.wpPage?.blogPage?.blogSpisokSsylok?.map((item, index) => {
                    return !item?.izobrazhenie?.gatsbyImage ? null
                        : <li className={styles.item} key={index}>
                            <Link onClick={clickHandler} className={styles.item__link} to={item?.adresSsylki || ''}>
                                <GatsbyImage content='cover' className={styles.item__image} image={item?.izobrazhenie.gatsbyImage} alt={item?.izobrazhenie.altText || ''}></GatsbyImage>
                                <div className={styles.watchings}>
                                    <WhiteTriangle className={styles.watchings__icon}></WhiteTriangle>
                                    <p className={styles.watchings__value}>{item?.prosmotry}</p>
                                </div>
                            </Link>
                        </li>
                })}
            </ul>
        </section>
    )
}
