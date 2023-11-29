import React, { createRef, useEffect, useState } from 'react'
import * as styles from './InstructionBooksInstructionsNew.module.css'
import { useGlobalContext } from '../../../../context/context'
import { typo } from '../../../../tipograf'
import { stack } from '../../../../hooks/useClassName'
import { GatsbyImage } from 'gatsby-plugin-image'
import { InView } from 'react-intersection-observer'
import Loading from '../../../loading/Loading'

const NoSoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect x="0.859497" y="0.440918" width="57.0519" height="57.0519" rx="8" fill="#FEC955" />
    <path d="M29.3854 11.189L24.7409 15.8335L29.3854 20.4779M12.2076 8.9668L9.38538 11.789L19.8965 22.3001H9.38538V35.6335H18.2743L29.3854 46.7446V31.789L38.8298 41.2557C37.3409 42.389 35.6743 43.3224 33.8298 43.8557V48.4557C36.8965 47.7446 39.6743 46.3446 42.0076 44.4335L46.5632 48.9668L49.3854 46.1446L29.3854 26.1446M44.9409 28.9668C44.9409 31.0557 44.4965 33.0112 43.7409 34.8335L47.0965 38.189C48.5962 35.3461 49.3817 32.181 49.3854 28.9668C49.3854 19.4557 42.7187 11.5001 33.8298 9.47791V14.0557C40.252 15.9668 44.9409 21.9224 44.9409 28.9668ZM39.3854 28.9668C39.3854 25.0335 37.1632 21.6557 33.8298 20.0112V24.9224L39.2743 30.3668C39.3854 29.9224 39.3854 29.4335 39.3854 28.9668Z" fill="black" />
</svg>

const SoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect x="0.800171" y="0.638672" width="57.0519" height="57.0519" rx="8" fill="#FEC955" />
    <path d="M39.5212 29.1647C39.5212 26.3371 37.7929 23.9158 35.3397 22.8962L34.0334 26.0344C35.26 26.5442 36.1202 27.7549 36.1202 29.1726C36.1202 30.5824 35.26 31.7931 34.0334 32.3108L35.3397 35.449C37.7929 34.4135 39.5212 31.9922 39.5212 29.1647ZM37.9522 16.6199L36.6459 19.7581C40.3337 21.2953 42.9223 24.9273 42.9223 29.1647C42.9223 33.41 40.3337 37.034 36.6459 38.5712L37.9522 41.7094C42.8665 39.6624 46.3153 34.8198 46.3153 29.1647C46.3153 23.5095 42.8665 18.6669 37.9522 16.6199ZM12.3369 20.6661V37.6553H19.131L31.0227 49.5549V8.77441L19.131 20.6661H12.3369Z" fill="black" />
</svg>

export default function InstructionBooksInstructionsNew() {
    const { instructionBooksPage } = useGlobalContext()
    const video = createRef<HTMLVideoElement>()
    //@ts-ignore
    const [playingMedia, setPlayingMedia] = useState<Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok>(instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsSpisok[0])
    const [isInView, setIsInView] = useState(false)
    const [progress, setProgress] = useState(0)
    const [sound, setSound] = useState(false)

    useEffect(() => {
        if (video?.current) {
            if (sound) {
                video.current.volume = 1
            } else {
                video.current.volume = 0
            }
        }
    }, [sound, video?.current])

    useEffect(() => {
        if (playingMedia && isInView && video?.current) {
            video?.current?.play()
        }
    }, [playingMedia, video?.current])

    useEffect(() => {
        if (isInView) {
            video?.current?.play()

        } else {
            video?.current?.pause()
        }

    }, [isInView])

    useEffect(() => {
        if (video?.current) {
            (video.current.currentTime / video.current.duration) * 100
        }
    }, [video?.current])

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
        if (video?.current && typeof video?.current?.currentTime !== "undefined" && typeof video?.current?.duration !== "undefined") {
            const time = (video?.current?.currentTime / video?.current?.duration) * 100
            typeof time !== "undefined" && setProgress(Math.floor(time))
        }
    }

    const onItemClick = (item: Queries.WpPage_Instructionbooks_instructionsInstructionsSpisok) => {
        setProgress(0)

        setPlayingMedia(item)
    }

    const soundButtonHandler = () => {
        setSound(prev => !prev)
    }

    return (
        <section className={stack(styles.section, 'container')} >
            <InView onChange={value => setIsInView(value)}>
                <h2 className={styles.title}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsZagolovok || '')}</h2>
                <div className={styles.body}>
                    <div className={styles.display}>

                      <video onEnded={nextVideo} onTimeUpdate={onTimeUpdate} className={styles.media} ref={video}
                            src={playingMedia?.videoDlyaModalnogoOkna?.mediaItemUrl || ''}
                        ></video>
                        <button className={styles.soundButton} onClick={soundButtonHandler}>
                            {sound ? <SoundIcon ></SoundIcon> : <NoSoundIcon ></NoSoundIcon>}
                        </button>
                        <div className={styles.loading}>
                        <Loading className='w-[172px] h-[158px] xl:w-[108px] xl:h-[99px] md:w-[89px] md:h-[81px]' isLoading={true}></Loading>
                        </div>
                
                        <div className={styles.name}>
                            <p className={styles.name_text}>{playingMedia?.nazvanie}</p>
                        </div>
                    </div>
                    <ul className={styles.list}>
                        {instructionBooksPage?.wpPage?.instructionBooks?.instructionsInstructionsSpisok?.map(item => {
                            return <li key={item?.nazvanie} className={stack(styles.list_item, item?.nazvanie === playingMedia.nazvanie && styles.current)}>
                                <button onClick={ //@ts-ignore 
                                    () => onItemClick(item)} className={styles.button}>
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
