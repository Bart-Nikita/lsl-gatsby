import React, {createRef, useEffect, useLayoutEffect, useState} from 'react';
import * as styles from './InstructionBooksSteps.module.css'
import {useGlobalContext} from "../../../../context/context";
import {stack} from "../../../../hooks/useClassName";
import {typo} from "../../../../tipograf";
import {InView} from "react-intersection-observer";
const isBrowser = typeof window !== "undefined"

const InstructionBooksSteps = () => {
    const {instructionBooksPage} = useGlobalContext()
    const [int, setInt] = useState(0)
    const [decorArray, setDecorArray] = useState<boolean[]>([])
    const [isInView, setIsInView] = useState(false)

    const listItem = createRef<HTMLLIElement>()
    const decorItem = createRef<HTMLDivElement>()

    useLayoutEffect(() => {
        if (decorItem?.current && listItem?.current && isBrowser) {

            const fullWith = window.innerWidth < 768 ? listItem.current.getBoundingClientRect().height : listItem.current.getBoundingClientRect().width
            const itemWith = decorItem.current.getBoundingClientRect().width
            const int = Math.floor(fullWith / (itemWith + 10))
            console.log('fullWith', fullWith)
            console.log('itemWith', itemWith)
            console.log('int', int)

            setInt(int)
        }
    }, [decorItem, listItem, isInView, isBrowser])

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
        <section className="container-new mb-[98px] xl:mb-[65px] md:mb-[0px]">
            <InView onChange={value => setIsInView(value)}></InView>
            <h2 className={'text-[38px] font-bold leading-[1.4] mb-[52px] xl:mb-[23px] xl:text-[24px] xl:leading-[1.2] md:text-[22px] md:mb-[20px]'}>Как оформить заказ</h2>
            <ul className={'grid grid-cols-3 gap-y-[55px] gap-x-[28px] xl:grid-cols-2 xl:gap-y-[28px] xl:gap-x-[20px] md:grid-cols-1 md:gap-y-[23px] md:pl-[5px]'}>
                {instructionBooksPage?.wpPage?.instructionBooks?.instructionsStepsStadiiOformleniya?.map((item, index) =>
                    <li ref={index === 0 ? listItem : null} key={index} className={'md:flex md:gap-[10px]'}>
                        <div
                            className={'relative flex items-center gap-[68px] mb-[30px] xl:gap-[19px] xl:mb-[10px] md:mb-[0px] md:flex-row md:gap-[0px] '}>
                            <div
                                className={'relative z-10 rounded-full bg-[#FEC955] flex items-center justify-center text-[22px] leading-none px-[25px] py-[10px] font-bold xl:px-[20px] xl:py-[8px] xl:text-[14px]'}>{'0' + (index + 1)}</div>
                            {index + 1 !== instructionBooksPage?.wpPage?.instructionBooks?.instructionsStepsStadiiOformleniya?.length &&
                                <div
                                    className={'flex gap-[5px] absolute top-[50%] translate-y-[-50%] left-[100px] z-0 xl:left-[72px] md:left-[31px] md:top-[100%] md:translate-y-[0px] md:rotate-[90deg] md:translate-x-[-50%]'}>
                                    <div {...index === 0 ? {ref: decorItem} : {}} className={'rounded-full h-[2px] w-[12px] bg-[#FEC955] md:w-[7px]'}></div>
                                    {!!decorArray.length && decorArray.map((item, index) =>
                                        <div key={index}
                                             className={'rounded-full h-[2px] w-[12px] bg-[#FEC955] md:w-[7px]'}></div>)}
                                </div>}
                        </div>
                        <p className={'text-[24px] leading-[1.4] font-light xl:text-[16px]'}>{typo.execute(item.opisanie)}</p>
                    </li>)}

            </ul>
        </section>
    );
};

export default InstructionBooksSteps;