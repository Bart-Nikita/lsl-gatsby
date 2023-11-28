import React, { createRef, useEffect, useState } from 'react'
import * as styles from './InstructionBooksInstructionsNew.module.css'
import { useGlobalContext } from '../../../../context/context'
import { typo } from '../../../../tipograf'
import { stack } from '../../../../hooks/useClassName'
import { GatsbyImage } from 'gatsby-plugin-image'
import { InView } from 'react-intersection-observer'

export default function InstructionBooksInstructionsNew() {
    const { instructionBooksPage } = useGlobalContext()
    const video = createRef<HTMLVideoElement>()
    //@ts-ignore
    const [playingMedia, setPlayingMedia] = useState<Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok>(instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsSpisok[0])
    const [isInView, setIsInView] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (playingMedia && isInView) {
            video.current?.play()
        }
    }, [playingMedia])

    useEffect(() => {
        if (isInView) {
            video.current?.play()

        } else {
            video.current?.pause()
        }

    }, [isInView])

    useEffect(() => {
        if (video.current) {
            (video.current.currentTime / video.current.duration) * 100
        } video.current?.addEventListener('pause', () => { console.log('pause') })
    }, [video.current])

    const nextVideo = () => {
        const arr = instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsSpisok
        if (!arr) return
        const index = arr?.indexOf(playingMedia)
        if (typeof index === "undefined") return
        const resIndex = index + 1 < arr?.length ? index + 1 : 0
        //@ts-ignore
        setPlayingMedia(arr[resIndex])

    }

    const onTimeUpdate = () => {
        if (video.current && typeof video.current?.currentTime !== "undefined" && typeof video?.current?.duration !== "undefined") {
            const time = (video.current?.currentTime / video?.current?.duration) * 100
            typeof time !== "undefined" &&  setProgress(Math.floor(time))
        }
    }

    const onItemClick = (item) => {
        setProgress(0)
        //@ts-ignore 
       setPlayingMedia(item)
    }

    return (
        <section className={stack(styles.section, 'container')} >
            <InView onChange={value => setIsInView(value)}>
                <h2 className={styles.title}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsZagolovok || '')}</h2>
                <div className={styles.body}>
                    <div className={styles.display}>
                        {<video onEnded={nextVideo} onTimeUpdate={onTimeUpdate} muted className={styles.media} ref={video}
                            src={playingMedia?.videoDlyaModalnogoOkna?.mediaItemUrl || ''}
                        ></video>}
                        <div className={styles.name}>
                            <p className={styles.name_text}>{playingMedia?.nazvanie}</p>
                        </div>
                    </div>
                    <ul className={styles.list}>
                        {instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsSpisok?.map(item => {
                            return <li key={item?.nazvanie} className={stack(styles.list_item, item?.nazvanie === playingMedia.nazvanie && styles.current)}>
                                <button onClick={() => onItemClick(item)} className={styles.button}>
                                    <div className={stack(styles.screen)}>
                                        {item?.izobrazhenieDlyaKompyutera?.gatsbyImage && <GatsbyImage className={stack('image-normalize', styles.screen_image)} image={item?.izobrazhenieDlyaKompyutera.gatsbyImage} alt={item?.izobrazhenieDlyaKompyutera.altText || ''}></GatsbyImage>}
                                        <div className={styles.screen_progress} style={{ right: `${100 - progress}%` }}>
                                        </div>
                                    </div>
                                    <div className={styles.content}>
                                        <div>
                                            <p className={styles.content_description}>Инструкция к&nbsp;тренажёру</p>
                                            <h3 className={styles.content_title}>{item?.nazvanie}</h3>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        })}
                    </ul>
                </div>
            </InView>
        </section>
    )
}
