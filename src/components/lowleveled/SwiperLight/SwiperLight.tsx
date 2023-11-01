import React, {
    ReactElement,
    ReactNode,
    TouchEvent,
    MouseEvent,
    useEffect,
    useState,
    useLayoutEffect,
    createRef
} from 'react';
import { stack } from "../../../hooks/useClassName";
import * as styles from './SwiperLight.module.css'
import { InView } from 'react-intersection-observer'

type SwiperProps = {
    children: ReactNode | ReactElement,
    className?: string,
    forcedSliderIndex?: number,
    setForcedSliderIndex?: (index: number) => void
}

const SwiperLight = ({ children, className, forcedSliderIndex, setForcedSliderIndex }: SwiperProps) => {
    const [initX, setInitX] = useState(0)
    const [x, setX] = useState(0)
    const [changedX, setChangedX] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const [moving, setMoving] = useState(false)
    const [slideIndex, setSlideIndex] = useState(0)
    const [initSlideIndex, setInitSlideIndex] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const [length, setLength] = useState<number>(0)
    const ref = createRef<HTMLDivElement>()

    useEffect(() => {
        if (isInView) {
            setLength(ref?.current?.children[0]?.children?.length || 0)
        }
    }, [isInView])

    const getDistance = () => {
        const currentTranslateX = -(ref.current.children[0].getBoundingClientRect().width - ref.current.getBoundingClientRect().width)
        return {
            currentTranslateX
        }
    }

    const getCurrentSlide = () => {

        let distance;
        let index;
        if (ref.current) {
            Array.from(ref.current.children[0].children).forEach((item, itemIndex) => {
                const itemDistance = Math.abs(item.getBoundingClientRect().left - ref.current.parentElement.getBoundingClientRect().left)
                if (distance === undefined || itemDistance < distance) {
                    distance = itemDistance
                    index = itemIndex
                }
            })
        }
        return index;
    }

    const setSlide = (index: number, isControls?: boolean) => {

        if (ref.current && ref.current.children[0].children[index] && index >= 0 && index < ref.current.children[0].children.length) {
            const pixels = (ref.current.children[0].children[index].getBoundingClientRect().left - ref.current.children[0].getBoundingClientRect().left)
            const widthWindow = ref.current.parentElement.getBoundingClientRect().width
            const widthWrapper = ref.current.children[0].getBoundingClientRect().width
            const maxTranslate = widthWrapper - widthWindow
            const length = ref?.current?.children[0]?.children?.length
            console.log(length)

            if (maxTranslate < pixels && !isControls) {
                setTranslateX(- maxTranslate)
                const index2 = getCurrentSlide()

                if (index2 && !(index2 > length)) {
                    setSlideIndex(index2)
                } else {
                    setSlideIndex(length - 1)
                }
            } else {
                setTranslateX(-pixels)
                if (!(index > length)) {
                    setSlideIndex(index)
                } else {
                    setSlideIndex(length - 1)
                }

            }

        }
    }




    useEffect(() => {
        if (typeof slideIndex === 'number' && setForcedSliderIndex) {
            setForcedSliderIndex(slideIndex)
        }
    }, [slideIndex])

    useEffect(() => {
        if (typeof forcedSliderIndex === 'number') {
            setSlide(forcedSliderIndex)
        }

    }, [forcedSliderIndex])

    useEffect(() => {
        if (moving) {
            const distance = changedX - initX
            setX(distance)
        }
    }, [changedX, moving])


    const startSwiping = ({ initX, changedX }: { initX: number, changedX: number }) => {
        setInitX(initX)
        setChangedX(changedX)
        setMoving(true)
        setInitSlideIndex(slideIndex)

    }

    const endSwiping = (e) => {
        setMoving(false)

        const enoughX = 50

        if (Math.abs(x) > enoughX) {
            if (x < 0) {
                setSlide(initSlideIndex + 1)
            } else if (x > 0) {
                setSlide(initSlideIndex - 1)
            }
        }

        setX(0)
    }

    const swiping = ({ changedX }: { changedX: number }) => {
        setChangedX(changedX)
    }

    const touchStart = (e: TouchEvent<HTMLDivElement>) => {
        startSwiping({ initX: e.touches[0].clientX, changedX: e.touches[0].clientX })
    }

    const touchMove = (e: TouchEvent<HTMLDivElement>) => {
        swiping({ changedX: e.touches[0].clientX })
    }

    const touchMouseStart = (e: MouseEvent<HTMLDivElement>) => {
        startSwiping({ initX: e.clientX, changedX: e.clientX })
    }

    const touchMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        swiping({ changedX: e.clientX })
    }

    const focusHandler = () => {
        setSlide(Array.from(document.activeElement.parentElement.children).indexOf(document.activeElement))

    }
    const onNext = () => {
        const length = ref?.current?.children[0]?.children?.length
        if (length && slideIndex < length) {
            setSlide(slideIndex + 1)

        }
    }
    const onPrev = () => {
        if (slideIndex > 0) {
            setSlide(slideIndex - 1)
        }
    }


    return (
        <div className={stack(styles.swiper, className)} onTouchStart={touchStart} onTouchEnd={endSwiping}
            onTouchMove={touchMove} onMouseDown={touchMouseStart}
            onMouseUp={endSwiping} onMouseMove={touchMouseMove} onMouseLeave={endSwiping}>
            <InView onChange={value => setIsInView(value)}></InView>
            <div className={styles.swiper__back}></div>
            <div className={styles.swiper__white}></div>
            <div
                onFocusCapture={focusHandler}
                className={stack(styles.swiper__wrapper, !moving && styles.transition)} ref={ref}
                style={{ transform: `translateX(${translateX + x}px)` }}>
                {children}
            </div>
            <div className='absolute top-[50%]  translate-y-[-50%] pointer-events-none flex justify-between right-[20px] left-[20px] z-10 xl:right-[20px] xl:left-[20px]'>
                <button onClick={onPrev} className={`h-[86px] w-[86px] xl:h-[56px] xl:w-[56px]  ${slideIndex === 0 ? 'pointer-events-none opacity-0' : 'pointer-events-auto'}`}>
                    <svg className='h-full w-full' viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="43" cy="43" r="42.5" fill="#F5F7FA" stroke="#DFDFDF" />
                        <path d="M44.7998 53L34.7998 43L44.7998 33L46.8041 34.9616L38.6591 43L46.8041 51.0384L44.7998 53Z" fill="black" />
                    </svg>
                </button>
                <button onClick={onNext} className={`h-[86px] w-[86px] xl:h-[56px] xl:w-[56px]  ${slideIndex + 1 >= length ? 'pointer-events-none opacity-0' : 'pointer-events-auto'}`}>
                    <svg className='h-full w-full' viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="43" cy="43" r="42.5" transform="matrix(-1 0 0 1 86 0)" fill="#F5F7FA" stroke="#DFDFDF" />
                        <path d="M41.2002 53L51.2002 43L41.2002 33L39.1959 34.9616L47.3409 43L39.1959 51.0384L41.2002 53Z" fill="black" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default SwiperLight;
