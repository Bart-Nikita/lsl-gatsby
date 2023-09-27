import React, {createRef, Dispatch, RefObject, SetStateAction, useEffect, useLayoutEffect, useState} from 'react';
import styles from './Picture.module.css'
import {stack} from "../../../hooks/useClassName";
import {useResize} from "../../../hooks/useResize";
import {useGlobalContext} from "../../../context/context";

type PictureProps = {
    desktopIImageX1: string,
    desktopIImageX2: string,
    mobileIImageX1: string,
    mobileIImageX2: string,
    className?: string,
    imageClassName?: string,
    alt: string;
    setPosition?: Dispatch<SetStateAction<number>>;
    breakpoint?: number
}
const Picture = ({
                     setPosition,
                     desktopIImageX1,
                     mobileIImageX1,
                     desktopIImageX2,
                     mobileIImageX2,
                     className,
                     imageClassName,
                     alt,
                     breakpoint
                 }: PictureProps) => {

    const {title} = useGlobalContext()
    const [width] = useResize()

    const ref = createRef<HTMLPictureElement>()

    useLayoutEffect(() => {
        if (ref?.current && setPosition) {
            const value = ref.current.getBoundingClientRect().bottom
            setPosition(value)
        }
    }, [width, ref?.current, title]);

    return (
        <picture ref={ref} className={stack(styles.picture, className)}>
            <source className={stack(imageClassName, styles.image)}
                    srcSet={`${mobileIImageX1} 1x, ${mobileIImageX2} 2x`} media={`(max-width: ${breakpoint ? breakpoint : '1023'}px)`}/>

            <img className={stack(imageClassName, styles.image)} src={desktopIImageX1} srcSet={`${desktopIImageX2} 2x`}
                 alt={alt}/>

        </picture>
    );
};

export default Picture;
