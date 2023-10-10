import React, { createRef, useEffect, useState } from 'react';
import { Link } from "gatsby";
import { useGlobalContext } from "../../../context/context";
import { useCommonSection } from "../../../hooks/useCommonSection";
import Logo from "../../images/Logo/Logo";
import * as styles from './Header.module.css'
import { stack } from "../../../hooks/useClassName";
import { useSortNav } from "../../../hooks/useSortNav";
import { useFile } from '../../../hooks/useFile';
import { GatsbyImage } from 'gatsby-plugin-image';

type PhoneButtonProps = {
    number: string
}

const NavSublist = (props: Queries.WpMenuItem) => {
    const [open, setOpen] = useState(false)
    const [sublistHeight, setSublistHeight] = useState<number>()
    const { isMobile, setIsNavModalOpen, isNewContainer } = useGlobalContext()
    const ref = createRef<HTMLDivElement>()
    const onOpen = () => {
        !isMobile && setOpen(true)
    }
    const onClose = () => {
        !isMobile && setOpen(false)
    }

    useEffect(() => {
        if (ref.current) {
            setSublistHeight(ref.current.clientHeight)
        }
    }, [open])

    const onClick = () => {
        isMobile && setOpen(prev => !prev)
    }
    const [arrow] = useFile('nav-arrow')

    return <>
        <div onClick={onClick} tabIndex={0} onFocus={onOpen} onBlur={onClose} onMouseEnter={onOpen}
            onMouseLeave={onClose}
            className={stack(styles.nav__sublist, open && styles.open)}>
            <span className={stack(isNewContainer ? 'text-small-new' : 'text-small', styles.nav__link, styles.sublist__title)}>{props.label}</span>
            <img className={styles.sublist__arrow} src={arrow} alt="Стрелка вниз" />
            <div ref={ref} className={styles.sublist__wrapper}>
                <div className={styles.sublist__list}>
                    {
                        //@ts-ignore
                        props?.childItems?.nodes.map(({ label, url }) => <Link onClick={() => setIsNavModalOpen(false)} key={label}
                            className={stack(isNewContainer ? 'text-small-new' : 'text-small', 'nav-link', styles.nav__link, styles.sublist__item)}
                            to={url}>{label}</Link>)}
                </div>
            </div>
        </div>
        <div className={styles.nav__indent} style={{ height: open && sublistHeight ? sublistHeight : 0 }}></div>
    </>

}
const PhoneButton = ({ number }: PhoneButtonProps) => {
    const [href, setHref] = useState('')
    useEffect(() => {
        if (number) {
            setHref('tel:' + number.split(' ').join('').split('−').join('').split('(').join('').split(')').join(''))
        }
    }, [number])
    return <a className={stack('button-secondary', styles.button)} href={href}>{number}</a>
}

export const Navigation = () => {
    const { menuItems, isNewContainer } = useGlobalContext()
    const { setIsNavModalOpen } = useGlobalContext()
    const [section] = useCommonSection("shapka")

    const [close] = useFile('nav-close')


    return (
        <nav onClick={(e) => e.stopPropagation()} className={stack(styles.nav)}>
            {menuItems?.map((item) =>
                <React.Fragment key={item.label}>
                    {!item?.childItems?.nodes.length
                        ? <Link onClick={() => setIsNavModalOpen(false)}
                            className={stack(isNewContainer ? 'text-small-new' : 'text-small', 'nav-link', styles.nav__link)}
                            to={item.url || ''}>{item.label}</Link>
                        : <NavSublist  {...item}></NavSublist>}
                </React.Fragment>)}
            <PhoneButton number={section?.header?.headerTelefon || ''}></PhoneButton>
            <button className={styles.nav__close} onClick={() => setIsNavModalOpen(false)}>
                <img src={close} className={styles.nav__close__icon} alt="Крестик" />
            </button>
        </nav>
    );
};

const Header = () => {

    const [section] = useCommonSection("shapka")
    const { setIsNavModalOpen, isNewContainer } = useGlobalContext()


    const clickHandler = () => {
        setIsNavModalOpen(prev => !prev)
    }

    const [burger] = useFile('burger')

    if (!section) return null
    return (

        <header
            className={stack('container-new', styles.body)}>
            <div className={styles.wrapper}>
                <Link to={'/'} className={stack('link')}>
                    <GatsbyImage className={styles.logo} image={section?.header?.headerLogotip?.gatsbyImage} alt={section?.header?.headerLogotip?.altText}></GatsbyImage>
                </Link>
                <div className={styles.body__nav}>
                    <Navigation></Navigation>
                </div>
                <button onClick={clickHandler} className={stack('nav-link', styles.burger)}>
                    <img className={styles.burger__icon}
                        src={burger} alt="Бургер" />
                </button>
            </div>
        </header>

    );
};

export default Header;
