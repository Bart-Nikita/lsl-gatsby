import {createRef, Dispatch, SetStateAction, useLayoutEffect} from "react";
import {useGlobalContext} from "../../../context/context";
import {useResize} from "../../../hooks/useResize";
import {stack} from "../../../hooks/useClassName";
import styles from './LightPicture.module.css'

type PictureProps = {
    desktopIImage: string,
    mobileIImage: string,
    className?: string,
    imageClassName?: string,
    alt: string;
    setPosition?: Dispatch<SetStateAction<number>>
}
const LightPicture = ({
                   setPosition, mobileIImage, desktopIImage,
                   className,
                   imageClassName,
                   alt
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
                    srcSet={mobileIImage} media="(max-width: 900px)"/>
            <img className={stack(imageClassName, styles.image)} src={desktopIImage}
                 alt={alt}/>

        </picture>
    );
};

export default LightPicture;
