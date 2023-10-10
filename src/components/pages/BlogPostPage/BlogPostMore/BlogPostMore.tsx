import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as styles from './BlogPostMore.module.css'
import { stack } from "../../../../hooks/useClassName";
import { useGlobalContext } from "../../../../context/context";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import { usePosts } from "../../../../hooks/usePosts";
import { Link } from "gatsby";
import Picture from "../../../images/Picture/Picture";
import { usePost } from '../../../../hooks/usePost';
import { GatsbyImage } from 'gatsby-plugin-image';

const isBrowser = typeof window !== "undefined"


const BlogPostMore = () => {
    const [firstListSize, setFirstListSize] = useState(3)
    const { blogPostPage, posts } = useGlobalContext()
    useEffect(() => {
        if (isBrowser && window.innerWidth < 1440) {
                setFirstListSize(2)
        }
    }, [isBrowser]);



    return (
        <div className={stack('container-new', styles.body)}>
            <h2 className={stack('text-page', styles.title)}>Читайте также</h2>
            <ul className={styles.list}>
                {posts?.filter(item => item.slug !== blogPostPage?.slug)?.slice(0, firstListSize).map((item, index) => <li key={index} className={styles.item}>
                    <Link to={"/blog/" + item.slug}>
               <GatsbyImage className={styles.item__picture} image={item?.blog?.blogPostPreviewIzobrazhenieDlyaKompyuteraX1?.gatsbyImage} alt={item?.blog?.blogPostPreviewIzobrazhenieDlyaKompyuteraX1?.altText}></GatsbyImage>
                        <p className={styles.item__title}
                            dangerouslySetInnerHTML={{ __html: item.blog?.blogPostHeroZagolovok || '' }}></p>
                        <p className={styles.item__text}
                            dangerouslySetInnerHTML={{ __html: item.blog?.blogPostHeroKratkoeOpisanie || '' }}></p>
                    </Link>
                </li>)}
            </ul>
        </div>
    );
};

export default BlogPostMore;