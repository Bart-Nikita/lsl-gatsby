import React, {createRef, useEffect, useState} from 'react';
import * as styles from './BlogPostMedia.module.css'
import {stack} from "../../../../hooks/useClassName";
import Picture from "../../../images/Picture/Picture";
import {useGlobalContext} from "../../../../context/context";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { useFile } from '../../../../hooks/useFile';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogPostMedia = () => {
    const {blogPostPage} = useGlobalContext()

    const video = createRef<HTMLVideoElement>()
    const [isPlaying, setIsPlaying] = useState(false)
    const videoClickHandler = () => {
        setIsPlaying(prev => !prev)
    }

    useEffect(() => {
        if (video.current) {
            if (isPlaying) {
                video.current.play()
            } else {
                video.current.pause()
            }
        }
    }, [isPlaying])

    const [play] = useFile('play')
    return (
        <div className={stack('container-new',  styles.body)}>
            <div className={styles.left}>
                <div onClick={videoClickHandler} className={stack(styles.video, !isPlaying && styles.stop)}>
                    <video ref={video} className={styles.video__media}
                           src={blogPostPage?.blog?.blogPostMediaVideo?.mediaItemUrl || ''}
                    ></video>
                    {!isPlaying &&
                            <button
                                className={stack('link', styles.video__button)}>
                                <img className={styles.video__image} src={play} alt="Иконка Play"/></button>
                    }
                    <GatsbyImage className={styles.video__picture} image={blogPostPage?.blog?.blogPostMediaZastavkaDlyaVideoKompyuter?.gatsbyImage} alt={blogPostPage?.blog?.blogPostMediaZastavkaDlyaVideoKompyuter?.altText}></GatsbyImage>
                </div>

                <div className={styles.left__back}></div>
                <p className={styles.left__text}
                   dangerouslySetInnerHTML={{__html: blogPostPage?.blog?.blogPostMediaTekstPodVideo || ''}}></p>
            </div>
            <div className={styles.right}>
                <p className={styles.right__text}
                   dangerouslySetInnerHTML={{__html: blogPostPage?.blog?.blogPostMediaTekstNadIzobrazheniem || ''}}></p>
                <div className={styles.right__back}>
                </div>
       <GatsbyImage className={styles.right__picture} imgClassName={styles.right__image} image={blogPostPage?.blog?.blogPostMediaIzobrazhenieDlyaKompyuteraX1?.gatsbyImage} alt={blogPostPage?.blog?.blogPostMediaIzobrazhenieDlyaKompyuteraX1?.altText}></GatsbyImage>
            </div>
        </div>
    );
};

export default BlogPostMedia;