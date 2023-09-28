import React, { createRef, MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as styles from './TrainingsModal.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import Chrest from "../../../svg/Chrest";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import LightPicture from "../../../images/LightPicture/LightPicture";
import { typo } from "../../../../tipograf";
import { InView } from "react-intersection-observer";
import trainingsSelect from "../TrainingsSelect/TrainingsSelect";
import ReactModal from 'react-modal';



const GalleryItem = (item: Queries.WpTraining_Training_trainingGallereya) => {
    const video = createRef<HTMLVideoElement>()
    const [isPlaying, setIsPlaying] = useState(false)
    const { setIsTrainingModalOpen, setTrainingModalData } = useGlobalContext()
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

    return <li onClick={videoClickHandler}
        className={stack(styles.video, !isPlaying && styles.stop)}>
        {item.video?.mediaItemUrl && <video ref={video} className={styles.video__media}
            src={item.video?.mediaItemUrl}
        ></video>}
        {(!isPlaying && item.video?.mediaItemUrl) &&
            <button
                className={stack('link', styles.video__button)}>
                <img className={styles.video__image} src="/image/play.png"
                    alt="Иконка Play" /></button>
        }
        <LightPicture className={styles.video__picture} imageClassName={styles.video__image}
            alt={item?.izobrazhenieDlyaKompyutera?.altText || ''}
            desktopIImage={item?.izobrazhenieDlyaKompyutera?.sourceUrl || ''}
            mobileIImage={item?.izobrazhenieDlyaTelefona?.sourceUrl || ''}></LightPicture>
    </li>


}
const TrainingsModal = () => {
    const {
        trainingModalData,
        setIsTrainingModalOpen,
        setIsTrainingFormModalOpen,
        isTrainingModalOpen
    } = useGlobalContext()
    const [isBottomVisible, setIsBottomVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Queries.WpTraining_Training_trainingGallereya>()
    const closeClickHandler = (e: any) => {
        e.preventDefault()
        setIsTrainingModalOpen(false)
    }



    useEffect(() => {
        if (trainingModalData && trainingModalData?.training?.trainingGallereya) {
            trainingModalData?.training?.trainingGallereya[0] &&  setSelectedItem(trainingModalData?.training?.trainingGallereya[0])
        }
    }, [trainingModalData]);


    const video = createRef<HTMLVideoElement>()
    const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => {
        setIsPlaying(false)
    }, [selectedItem]);
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
        setIsTrainingFormModalOpen(true)
    }
    return (
        <div className={stack(styles.container, !isBottomVisible && styles.light)}>

            <dialog onClick={e => e.stopPropagation()}
                className={stack(styles.body)}>
                <div className={styles.row}>
                    <div className={styles.gallery}>
                        <div className={styles.gallery__display}>
                            {selectedItem?.video?.mediaItemUrl ? <div onClick={videoClickHandler}
                                className={stack(styles.video, !isPlaying && styles.stop)}>
                                <video ref={video} className={styles.video__media}
                                    src={selectedItem.video?.mediaItemUrl}
                                ></video>
                                {!isPlaying &&
                                    <button
                                        className={stack('link', styles.video__button)}>
                                        <img className={styles.video__image} src="/image/play.png"
                                            alt="Иконка Play" /></button>
                                }
                                <LightPicture className={styles.video__picture} imageClassName={styles.video__image}
                                    alt={selectedItem?.izobrazhenieDlyaKompyutera?.altText || ''}
                                    desktopIImage={selectedItem?.izobrazhenieDlyaKompyutera?.sourceUrl || ''}
                                    mobileIImage={selectedItem?.izobrazhenieDlyaTelefona?.sourceUrl || ''}></LightPicture>
                            </div> :
                                <LightPicture className={styles.gallery__picture}
                                    imageClassName={styles.gallery__image}
                                    alt={selectedItem?.izobrazhenieDlyaKompyutera?.altText || ''}
                                    desktopIImage={selectedItem?.izobrazhenieDlyaKompyutera?.sourceUrl || ''}
                                    mobileIImage={selectedItem?.izobrazhenieDlyaTelefona?.sourceUrl || ''}></LightPicture>
                            }
                        </div>
                        {(trainingModalData?.training?.trainingGallereya?.length && trainingModalData?.training?.trainingGallereya?.length > 1) &&
                            <ul className={styles.gallery__images}>
                                {trainingModalData?.training?.trainingGallereya?.slice(0, 3).map((item, index) =>
                                    <li
                                        key={index} className={styles.images__item}>
                                        <button onClick={() => item && setSelectedItem(item)}
                                            className={stack(styles.images__button, selectedItem === item && styles.selected)}>
                                            {item?.video?.mediaItemUrl &&
                                                <img className={styles.images__play} src="/image/play.png"
                                                    alt="Иконка Play" />}
                                            <LightPicture className={styles.images__picture}
                                                alt={item?.izobrazhenieDlyaKompyutera?.altText || ''}
                                                desktopIImage={item?.izobrazhenieDlyaKompyutera?.sourceUrl || ''}
                                                mobileIImage={item?.izobrazhenieDlyaTelefona?.sourceUrl || ''}></LightPicture>
                                        </button>
                                    </li>)}
                            </ul>}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content__top}>
                            <h2 className={styles.content__title}>{typo.execute(trainingModalData?.title || '')}</h2>
                            <p className={styles.content__exist}>{trainingModalData?.training?.trainingEstVNalichii === 'true' ? 'В наличии' : 'Нет в наличии'}</p>
                            <p className={styles.content__price}
                                dangerouslySetInnerHTML={{ __html: trainingModalData?.training?.trainingCzena || ''}}></p>
                        </div>
                        <p className={styles.content__text}
                            dangerouslySetInnerHTML={{ __html: trainingModalData?.training?.trainingPodrobnoeOpisanie|| '' }}></p>
                        {(trainingModalData?.training?.trainingVRamke?.length && trainingModalData?.training?.trainingVRamke?.length > 0) && <ul className={styles.content__border}>
                            {trainingModalData?.training?.trainingVRamke?.map((item, index) => <li className={styles.border__item} key={index} >
                                <p className={styles.border__text} dangerouslySetInnerHTML={{ __html: item?.tekst || ''}}></p>
                            </li>)}
                        </ul>}
                        <button onClick={onOrderClick}
                            className={stack('button-secondary-new', styles.content__submit)}>Оформить заказ
                        </button>
                        <p className={styles.content__remark}>{typo.execute('*Тренажёр не является медицинским изделием')}</p>
                    </div>
                </div>
                <button onClick={closeClickHandler} className={styles.close}>
                    <Chrest className={styles.close__svg}></Chrest>
                </button>
            </dialog>
            <InView onChange={value => setIsBottomVisible(value)}></InView>
        </div>
    );
};

export default TrainingsModal;