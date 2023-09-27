import React, {createRef, useEffect, useState} from 'react';
import * as styles from './HistorySended.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";
import history from "../../../../pages/History";
import {InView} from "react-intersection-observer";
import {useView} from "../../../../hooks/useView";
import {HistorySendedGoroda, StrokaGorodov} from "../../../../types/data";

type DisplayRow = {
    row: HistorySendedGoroda,
    isInView: boolean,
    index: number
}

const DisplayRow = ({row, isInView, index}: DisplayRow) => {
    const [x, setX] = useState(0)
    const [directionLeft, setDirectionLeft] = useState(false)
    const [isToBeRearranged, setIstoBeRearranged] = useState(false)
    useEffect(() => {
        setDirectionLeft(index % 2 !== 0)
    }, []);
    const getRandomStep = () => {
        return 1 + Number(Math.random().toFixed(2))
    }
    useEffect(() => {
        if (isInView) {
            const step = getRandomStep()
            const id = setInterval(() => {
                setX(prev => {
                    return prev + step
                })
            }, 16)
            return () => {
                clearInterval(id)
            }
        }
    }, [isInView]);

    const ref = createRef<HTMLDivElement>()

    useEffect(() => {
        if (ref?.current && row && Math.ceil(x) % 10 === 0 ) {
            const rowLength = ref?.current.children.length
            const parent = ref?.current.parentElement
            const currentChild = directionLeft ? ref?.current.children[0] : ref?.current.children[rowLength - 1]
            const gap = ref?.current.children[1].getBoundingClientRect().left - ref?.current.children[0].getBoundingClientRect().right
            const rowWidth = Array.from(ref?.current.children).reduce((acc, item) => acc + item.getBoundingClientRect().width, 0) + gap * (rowLength - 1)
            const parentWidth = parent.getBoundingClientRect().width
            const protrusion = (rowWidth - parentWidth)
            const parentEdge = directionLeft ? parent.getBoundingClientRect().left : parent.getBoundingClientRect().right
            const childEdge = directionLeft ? currentChild.getBoundingClientRect().left : currentChild.getBoundingClientRect().right
            const dif = Math.abs(childEdge - parentEdge)

            if (dif >= protrusion && ((directionLeft && childEdge < parentEdge) || (!directionLeft && childEdge > parentEdge))) {
                if (directionLeft) {
                    ref.current.appendChild(currentChild)
                } else {
                    ref.current.prepend(currentChild)
                }
                setX(prev => prev - (gap + currentChild.getBoundingClientRect().width))
            }
        }
    }, [ref, x, row]);



    return <div ref={ref} key={index}
                className={styles.display__row}
                style={{transform: `translateX(${directionLeft ? -x : x}px)`}}>
        {row?.strokaGorodov.map((item, index) => <div key={index} className={styles.display__item}>
            <img className={styles.display__image} src={item.izobrazhenie.sourceUrl}
                 alt={item.izobrazhenie.altText}/>
            <p className={styles.display__text}>{item.nazvanieGoroda}</p>
        </div>)}
    </div>

}

const HistorySended = () => {

    const {historyPage} = useGlobalContext()
    const {setIsTopInView, isInView, setIsBottomInView} = useView()

    return (
        <div className={stack('container-new',  styles.body, styles.heavy)}>
            <div className={styles.top}>
                <h2 className={stack('text-large', styles.title)}>
                    <span className={stack('text-large', styles.title__text)}
                          dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedNachaloPervojStroki}}></span>
                    <span
                        className={stack(styles.title__text, styles.title__marked)}
                        dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedVydelennyjTekstPervojStroki}}></span>
                    <span className={stack('text-large', styles.title__text)}
                          dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedKoneczPervojStroki}}></span>
                </h2>
                <p className={styles.subtitle}>
                    <span
                        className={stack(styles.subtitle__marked, styles.subtitle__text)}
                        dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedVydelennyjTekstVtorojStroki}}></span>
                    <span className={styles.subtitle__text}
                          dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedKoneczVtorojStroki}}></span>
                </p>
                <p className={stack(styles.subtitle, styles.subtitle__text)}
                   dangerouslySetInnerHTML={{__html: historyPage?.history.historySendedTretyaStroka}}></p>
            </div>
            <InView onChange={value => setIsTopInView(value)}></InView>
            <div className={styles.display}>

                {historyPage?.history.historySendedGoroda.map((row, index) => <DisplayRow isInView={isInView}
                                                                                          key={index} row={row}
                                                                                          index={index}></DisplayRow>)}
            </div>
            <InView onChange={value => setIsBottomInView(value)}></InView>
        </div>
    );
};

export default HistorySended;