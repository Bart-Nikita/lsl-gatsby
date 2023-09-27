import React, {useEffect, useState} from 'react';
import styles from './Blog.module.css'
import {stack} from "../../../hooks/useClassName";
import {useGlobalContext} from "../../../context/context";
import {sortDate} from "../../../hooks/useSortDate";
import Picture from "../../images/Picture/Picture";
import {Link} from "react-router-dom";
import {AllBlogNode} from "../../../types/data";

export type BlogProps = {
    title: string,
    linkText: string,
    linkHref: string,
    remark: string
}
const Blog = ({title, linkHref, linkText, remark}: BlogProps) => {

    const {data} = useGlobalContext()

    const [blog, setBlog] = useState<AllBlogNode[]>()

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setBlog(sortDate(data?.allBlog?.nodes, 'DESC').filter((item, index) => index < 3))
        }
    }, [data])

    return (
        <section className={stack('container', 'section-indent', styles.body)}>
            <h2 className={stack('title-secondary', styles.title)} dangerouslySetInnerHTML={{__html: title}}></h2>
            <ul className={styles.list}>
                {blog?.map((item, index) => <li key={index} className={stack(styles.item)} ><Link className={styles.item__link} to={item.id} >
                    <Picture imageClassName={stack('link',styles.item__image)} className={styles.item__picture}
                             desktopIImageX2={item?.blog?.blogPostHeroImageKompyuter2x?.sourceUrl}
                             desktopIImageX1={item?.blog?.blogPostHeroImageKompyuter1x?.sourceUrl}
                             mobileIImageX1={item?.blog?.blogPostHeroImageTelefon1x?.sourceUrl}
                             mobileIImageX2={item?.blog?.blogPostHeroImageTelefon2x?.sourceUrl} alt={item?.blog?.blogPostHeroImageKompyuter1x?.altText}></Picture>
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
