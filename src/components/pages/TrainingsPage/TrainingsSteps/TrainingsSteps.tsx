import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import styles from './TrainingsSteps.module.css'
import {useGlobalContext} from "../../../../context/context";
import {typo} from "../../../../tipograf";

const TrainingsSteps = () => {
    const {trainingsPage} = useGlobalContext()
    const [int, setInt] = useState(0)
    const [decorArray, setDecorArray] = useState<boolean[]>([])
    const [isInView, setIsInView] = useState(false)

    const listItem = createRef<HTMLLIElement>()
    const decorItem = createRef<HTMLDivElement>()

    useLayoutEffect(() => {
        if (decorItem?.current && listItem?.current) {

            const fullWith = window.innerWidth < 768 ? listItem.current.getBoundingClientRect().height : listItem.current.getBoundingClientRect().width
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
        <section className="container-new mb-[140px] xl:mb-[92px] md:mb-[64px]">
            <h2 className={'text-large-new mb-[52px] xl:mb-[17px] md:mb-[20px]'} dangerouslySetInnerHTML={{__html: trainingsPage?.trainings.trainingsStepsZagolovok}}></h2>
            <ul className={'grid grid-cols-3 gap-y-[49px] gap-x-[28px] xl:grid-cols-2 xl:gap-y-[28px] xl:gap-x-[20px] md:grid-cols-1 md:gap-y-[13px]'}>
                {trainingsPage?.trainings?.trainingsStepsList.map((item,index) =>
                    <li  ref={index === 0 ? listItem : null} key={index} className={'md:flex md:gap-[10px]'}>
                        <div className={'relative flex items-center gap-[68px] mb-[30px] xl:gap-[19px] xl:mb-[10px] md:mb-[0px] md:flex-row md:gap-[0px] '}>
                            <div className={'relative z-10 rounded-full bg-[#FEC955] flex items-center justify-center text-[22px] leading-none px-[25px] py-[10px] font-bold xl:px-[20px] xl:py-[8px] xl:text-[14px]'}>{'0' + (index + 1)}</div>
                            {index + 1 !== trainingsPage?.trainings.trainingsStepsList.length &&
                                <div className={styles.decor}>
                                    {index === 0 ? <div ref={decorItem} className={styles.decor__item}></div> :
                                        <div className={styles.decor__item}></div>}
                                    {!!decorArray.length && decorArray.map((item, index) =>
                                        <div key={index} className={styles.decor__item}></div>)}
                                </div>}
                        </div>
                        <p className={'text-[24px] leading-[1.4] font-light xl:text-[16px]'} >{typo.execute(item.tekst)}</p>
                    </li>)}
                <li className={'md:flex md:gap-[10px] md:items-center'}>
                    <div className={'relative z-10 h-fit rounded-full border-[#FEC955] border-[2px] w-fit flex items-center justify-center text-[22px] leading-none px-[25px] py-[12px] font-bold mb-[12px] xl:mb-[10px] xl:px-[20px] xl:py-[7px] xl:text-[14px] md:mb-[0px] md: '}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                        <path d="M4.11889 14.7502C3.60933 14.4388 3.31209 14.0425 3.22717 13.5613C3.14224 13.08 3.28379 12.5705 3.6518 12.0326L6.36941 7.87125L7.13374 8.97528L2.1656 9.23006C1.5145 9.25837 0.990798 9.13098 0.594478 8.8479C0.198159 8.5365 0 8.08357 0 7.48909C0 6.92292 0.198159 6.48414 0.594478 6.17274C0.990798 5.86135 1.5145 5.73396 2.1656 5.79058L7.13374 6.08782L6.41188 7.19185L3.69426 2.98804C3.32625 2.42187 3.18471 1.89816 3.26963 1.41691C3.35456 0.935671 3.6518 0.553506 4.16135 0.27042C4.64259 -0.0409732 5.12384 -0.0834354 5.60508 0.143033C6.08633 0.369502 6.46849 0.779975 6.75158 1.37445L8.70486 5.45088H8.06792L10.0212 1.37445C10.3043 0.779975 10.6865 0.369502 11.1677 0.143033C11.6489 -0.0834354 12.1443 -0.0409732 12.6539 0.27042C13.1635 0.581814 13.4465 0.978134 13.5032 1.45938C13.5881 1.94062 13.4465 2.46433 13.0785 3.0305L10.3609 7.14939L9.63904 6.08782L14.6072 5.79058C15.2583 5.73396 15.782 5.86135 16.1783 6.17274C16.5746 6.48414 16.7728 6.92292 16.7728 7.48909C16.7728 8.08357 16.5746 8.5365 16.1783 8.8479C15.782 9.13098 15.2583 9.25837 14.6072 9.23006L9.63904 8.97528L10.3609 7.87125L13.0785 12.0326C13.4465 12.5705 13.5881 13.08 13.5032 13.5613C13.4465 14.0142 13.1635 14.3964 12.6539 14.7078C12.116 15.0191 11.6065 15.0758 11.1252 14.8776C10.6723 14.6511 10.3043 14.2407 10.0212 13.6462L8.06792 9.5273H8.70486L6.70911 13.6462C6.42603 14.2407 6.04386 14.6511 5.56262 14.8776C5.10968 15.0758 4.62844 15.0333 4.11889 14.7502Z" fill="#FEC955"/>
                    </svg></div>
                    <p className={'text-[24px] text-[#515151] mr-[-100px] xl:mr-[0px] xl:text-black leading-[1.4] font-light xl:text-[16px] '}>{typo.execute(trainingsPage?.trainings?.trainingsStepsRemarka)}</p>
                </li>
            </ul>
        </section>
    );
};

export default TrainingsSteps;