import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import {useGlobalContext} from "../../../../context/context";
import * as styles from './HistoryHistory.module.css'
import {stack} from "../../../../hooks/useClassName";
import SwiperLight from "../../../lowleveled/SwiperLight/SwiperLight";
import {InView} from "react-intersection-observer";

const HistoryHistory = () => {
    const {historyPage} = useGlobalContext()
    const [int, setInt] = useState(0)
    const [decorArray, setDecorArray] = useState<boolean[]>([])
    const [isInView, setIsInView] = useState(false)

    const listItem = createRef<HTMLLIElement>()
    const decorItem = createRef<HTMLDivElement>()

    useLayoutEffect(() => {
        if (decorItem?.current && listItem?.current) {
            const fullWith = listItem.current.getBoundingClientRect().width
            const itemWith = decorItem.current.getBoundingClientRect().width
            const int = Math.floor(fullWith / (itemWith + 10))
             setInt(int)
        }
    }, [decorItem, listItem, isInView])

    useEffect(() => {
        if (int > 0) {
            const arr: boolean[] = []
            for (let i = 0; i < int; i++) {
                arr.push(true)
            }
            setDecorArray(arr)
        }
    }, [int]);
    return (
        <div className={stack('container-new', 'section-mb', styles.body)}>
            <InView onChange={value => setIsInView(value)}></InView>
            <h2 className={stack('text-large', styles.title)}>{historyPage?.history.historyHistoryZagolovok}</h2>
            <SwiperLight>
                <ul className={styles.list}>
                    {historyPage?.history.historyHistoryList.map((item, index) => {

                        return <li ref={listItem} key={index} className={styles.item}>
                            <div className={styles.item__top}>
                                <p className={stack('text-large', styles.item__year)}>{item.god}</p>
                                {index + 1 !== historyPage?.history.historyHistoryList.length &&
                                    <div className={styles.decor}>
                                        {index === 0 ? <div ref={decorItem} className={styles.decor__item}></div> :
                                            <div className={styles.decor__item}></div>}
                                        {!!decorArray.length && decorArray.map((item, index) => <div key={index}
                                                                                                     className={styles.decor__item}></div>)}
                                    </div>}
                            </div>
                            <div className={stack('text-simple', styles.text)} dangerouslySetInnerHTML={{__html: item.tekst}}></div>
                        </li>
                    })}
                </ul>
            </SwiperLight>
        </div>
    );
};

export default HistoryHistory;