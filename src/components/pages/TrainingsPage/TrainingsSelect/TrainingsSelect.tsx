import React, { createRef, useEffect, useMemo, useState, memo, useLayoutEffect, MouseEventHandler } from 'react';
import * as styles from './TrainingsSelect.module.css'
import { useGlobalContext } from "../../../../context/context";
import { useTrainings } from "../../../../hooks/useTrainings";
import { stack } from "../../../../hooks/useClassName";
import { Link } from "gatsby";
import Picture from "../../../images/Picture/Picture";
import LightPicture from "../../../images/LightPicture/LightPicture";


const buttonTextClose = 'Смотреть дальше'
const buttonTextOpen = 'Свернуть'
type SelectItemProps = {

}

const SelectItem = (item: Queries.WpTraining & { index: number }) => {
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
    if (!item?.training?.trainingImageKompyuter && !item?.training?.trainingImageTelefon) return

    const itemCLickHandler = () => {
        setTrainingModalData(item)
        setIsTrainingModalOpen(true)
    }

    return <li key={item?.date?.toString()} className={styles.item}>
        <button onClick={itemCLickHandler} className={stack(styles.link)}>
            <LightPicture className={styles.picture} imageClassName={styles.image}
                desktopIImage={item?.training?.trainingImageKompyuter?.sourceUrl || ''}
                mobileIImage={item?.training?.trainingImageTelefon?.sourceUrl || ''}
                alt={item?.training?.trainingImageKompyuter?.altText || ''}></LightPicture>
            <div className={styles.item__content}>
                <p className={styles.content__title}
                    dangerouslySetInnerHTML={{ __html: item?.title  || ''}}></p>
                <p className={styles.content__price}
                    dangerouslySetInnerHTML={{ __html: item?.training.trainingCzena  || ''}}></p>
                <p className={styles.content__text}
                    dangerouslySetInnerHTML={{ __html: item?.training.trainingKratkoeOpisanie  || ''}}></p>
            </div>
        </button>
    </li>
}

const openText = 'Смотреть дальше'
const closeText = 'Свернуть'
const TrainingsSelect = () => {

    const [buttonText, setButtonText] = useState(buttonTextClose)

    const { trainingsPage } = useGlobalContext()
    const [trainings] = useTrainings()

    const [isOpen, setIsOpen] = useState(false)

    const ref = createRef<HTMLUListElement>()
    const screen = createRef<HTMLDivElement>()

    const [height, setHeight] = useState<number>()
    const [listHeight, setListHeight] = useState<number>()
    const [screenHeight, setScreenHeight] = useState<number>()

    useEffect(() => {
        setButtonText(!isOpen ? openText : closeText)
        setHeight(isOpen ? listHeight : screenHeight)
    }, [isOpen, ref?.current]);


    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        !isOpen && e.preventDefault()
        !listHeight && setListHeight(ref?.current?.getBoundingClientRect().height || undefined)
        !screenHeight && setScreenHeight(screen?.current?.getBoundingClientRect().height || undefined)
        setIsOpen(prev => {
            return !prev
        })
    }

    return (
        <section className={stack('container-new', styles.body)}>
            <h2 className={stack('text-large', styles.title)}>{trainingsPage?.wpPage?.trainings?.trainingsSelectZagolovok}</h2>
            <p className={styles.subtitle}
                dangerouslySetInnerHTML={{ __html: trainingsPage?.wpPage?.trainings?.trainingsSelectPodzagolovok || '' }}></p>
            <div ref={screen} style={height ? { height: height } : {}} className={stack(styles.screen, isOpen && styles.open)}>
                <ul ref={ref} className={styles.list}>
                    {trainings?.map((item, index) => <SelectItem key={index} {...item} index={index}></SelectItem>)}
                </ul>
                <div id={'select'} ></div>
            </div>
            <a href={'#select'} onClick={clickHandler} className={stack('button-primary-new', styles.button)}>{buttonText}</a>
        </section>
    );
};

export default TrainingsSelect;