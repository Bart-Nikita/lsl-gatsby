import * as styles from './InstructionsBooksModal.module.css'
import React, { createRef, MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import Chrest from "../../../svg/Chrest";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { typo } from "../../../../tipograf";
import { InView } from "react-intersection-observer";
import FileSvg from '../../../svg/FileSvg';
import { useFile } from '../../../../hooks/useFile';
import { GatsbyImage } from 'gatsby-plugin-image';

export default function InstructionsBooksModal() {
    const {
        instructionBooksModalData,
        setIsInstructionBooksModalOpen,
        setIsInstructionBooksFormModalOpen,
    } = useGlobalContext()
    const [isBottomVisible, setIsBottomVisible] = useState(false)
    const closeClickHandler = (e: any) => {
        e.preventDefault()
        setIsInstructionBooksModalOpen(false)
    }

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

    const onOrderClick = () => {
        setIsInstructionBooksFormModalOpen(true)
    }
    useEffect(() => {
        console.log(instructionBooksModalData)
    }, [instructionBooksModalData])

    const [play] = useFile('play')
    return (
        <div className={stack(styles.container, !isBottomVisible && styles.light)}>

            <dialog onClick={e => e.stopPropagation()}
                className={stack(styles.body)}>
                <div className={styles.row}>
                    <div className={styles.gallery}>
                        <div className={styles.gallery__display}>
                            {!isPlaying && <FileSvg className={styles.gallery__decor}></FileSvg>}

                            <div onClick={videoClickHandler}
                                className={stack(styles.video, !isPlaying && styles.stop)}>
                                <video ref={video} className={styles.video__media}
                                    src={instructionBooksModalData?.videoDlyaModalnogoOkna?.mediaItemUrl || ''}
                                ></video>
                                {!isPlaying &&
                                    <button
                                        className={stack('link', styles.video__button)}>
                                        <img className={styles.video__image} src={play}
                                            alt="Иконка Play" /></button>
                                }
                             <GatsbyImage className={styles.video__picture} image={instructionBooksModalData?.izobrazhenieDlyaKompyutera?.gatsbyImage} alt={instructionBooksModalData?.izobrazhenieDlyaKompyutera?.altText}></GatsbyImage>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content__top}>
                            <p className={styles.content__desc}>Инструкция к&nbsp;тренажеру</p>
                            <h2 className={styles.content__title}>{typo.execute(instructionBooksModalData?.nazvanie || '')}</h2>
                            <p className={styles.content__price}
                                dangerouslySetInnerHTML={{ __html: instructionBooksModalData?.czena || '' }}></p>
                        </div>
                        <p className={styles.content__text}
                        >{typo.execute(instructionBooksModalData?.polnoeOpisanie || '')}</p>
                        {(instructionBooksModalData?.vRamkeVModalnomOkne?.length && instructionBooksModalData?.vRamkeVModalnomOkne?.length > 0) && <ul className={styles.content__border}>
                            {instructionBooksModalData?.vRamkeVModalnomOkne?.map((item, index) => <li className={styles.border__item} key={index} >
                                <p className={styles.border__text} dangerouslySetInnerHTML={{ __html: item?.tekst || '' }}></p>
                            </li>)}
                        </ul>}
                        <button onClick={onOrderClick}
                            className={stack('button-secondary-new', styles.content__submit)}>Заказать инструкцию
                        </button>
                    </div>
                </div>
                <button onClick={closeClickHandler} className={styles.close}>
                    <Chrest className={styles.close__svg}></Chrest>
                </button>
            </dialog>
            <InView onChange={value => setIsBottomVisible(value)}></InView>
        </div>
    );
}
