import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as styles from './BlogList.module.css'
import { stack } from "../../../../hooks/useClassName";
import { useGlobalContext } from "../../../../context/context";
import Picture from "../../../images/Picture/Picture";
import { usePosts } from "../../../../hooks/usePosts";
import { Link } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';

const width = typeof window === 'undefined' ? 0 : window.innerWidth

const BlogListItem = (item: Queries.WpBlog) => {
    return <li key={item.id}
        className={styles.list__item}>
        <Link className={styles.list__link} to={'/blog/' + item.slug} >
            <GatsbyImage className={styles.item__picture} image={item?.blog?.blogPostPreviewIzobrazhenieDlyaKompyuteraX1?.gatsbyImage} alt={item?.blog?.blogPostPreviewIzobrazhenieDlyaKompyuteraX1?.altText}></GatsbyImage>
            <p className={styles?.item__title}
                dangerouslySetInnerHTML={{ __html: item?.blog?.blogPostHeroZagolovok || '' }}></p>
            <p className={styles?.item__text}
                dangerouslySetInnerHTML={{ __html: item?.blog?.blogPostHeroKratkoeOpisanie || '' }}></p>
        </Link>
    </li>
}
const BlogList = () => {
    const { blogPage, posts } = useGlobalContext()
    const [firstListSize, setFirstListSize] = useState(9)
    const [isListOpen, setIsListOpen] = useState(false)

    useLayoutEffect(() => {
        if (width < 1440) {
            setFirstListSize(8)
        } else {
            setFirstListSize(9)
        }
    }, [width]);


    return (
        <div className={stack('container-new', styles.body)}>
            <h1 className={stack('text-page', styles.title)}
                dangerouslySetInnerHTML={{ __html: blogPage?.wpPage?.blogPage?.blogZagolovok || '' }}></h1>
            <div className={styles.screen}>
                <ul className={styles.list}>
                    {posts?.slice(0, firstListSize).map((item, index) => <BlogListItem {...item} key={index}></BlogListItem>)}
                    {isListOpen && posts?.slice(firstListSize).map((item, index) => <BlogListItem {...item} key={index}></BlogListItem>)}
                </ul>
            </div>
            {!isListOpen && <button onClick={() => setIsListOpen(true)} className={stack('button-primary-new', styles.button)}>Загрузить еще</button>}
        </div>
    );
};

export default BlogList;