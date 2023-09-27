import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from './BlogList.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import {useTrainings} from "../../../../hooks/useTrainings";
import Picture from "../../../images/Picture/Picture";
import {usePosts} from "../../../../hooks/usePosts";
import {Link} from "react-router-dom";
import {AllBlogNode} from "../../../../types/data";



const BlogListItem = (item: AllBlogNode) => {
    return <li key={item.id}
        className={styles.list__item}>
        <Link className={styles.list__link} to={'/blog/'+item.slug} >
            <Picture alt={item.blog.blogPostPreviewIzobrazhenieDlyaKompyuteraX1.altText}
                     className={styles.item__picture}
                     desktopIImageX2={item.blog.blogPostPreviewIzobrazhenieDlyaKompyuteraX2.sourceUrl}
                     desktopIImageX1={item.blog.blogPostPreviewIzobrazhenieDlyaKompyuteraX1.sourceUrl}
                     mobileIImageX2={item.blog.blogPostPreviewIzobrazhenieDlyaTelefonaX2.sourceUrl}
                     mobileIImageX1={item.blog.blogPostPreviewIzobrazhenieDlyaTelefonaX1.sourceUrl}
                     imageClassName={styles.item__image}></Picture>
            <p className={styles.item__title}
               dangerouslySetInnerHTML={{__html: item.blog.blogPostHeroZagolovok}}></p>
            <p className={styles.item__text}
               dangerouslySetInnerHTML={{__html: item.blog.blogPostHeroKratkoeOpisanie}}></p>
        </Link>
    </li>
}
const BlogList = () => {
    const {blogPage} = useGlobalContext()
    const [posts] = usePosts()
    const [firstListSize, setFirstListSize] = useState(9)
    const [isListOpen, setIsListOpen] = useState(false)

    useLayoutEffect(() => {
        const width = window.innerWidth
        if (width < 1440) {
            setFirstListSize(8)
        }
    }, []);


    return (
        <div className={stack('container-new', styles.body)}>
            <h1 className={stack('text-page', styles.title)}
                dangerouslySetInnerHTML={{__html: blogPage?.blogPage?.blogZagolovok}}></h1>
            <div className={styles.screen}>
                <ul className={styles.list}>
                    {posts?.slice(0, firstListSize ).map((item, index) => <BlogListItem {...item} key={index}></BlogListItem>)}
                    {isListOpen && posts?.slice(firstListSize).map((item, index) => <BlogListItem {...item} key={index}></BlogListItem>)}
                </ul>
            </div>
            {!isListOpen && <button onClick={() => setIsListOpen(true)} className={stack('button-primary-new', styles.button)}>Загрузить еще</button>}
        </div>
    );
};

export default BlogList;