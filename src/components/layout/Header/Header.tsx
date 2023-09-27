import React, {createRef, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../../context/context";
import {useCommonSection} from "../../../hooks/useCommonSection";
import Logo from "../../images/Logo/Logo";
import styles from './Header.module.css'
import {stack} from "../../../hooks/useClassName";
import {useSortNav} from "../../../hooks/useSortNav";
import {Items, MenuItemsNode} from "../../../types/data";

type PhoneButtonProps = {
    number: string
}

const NavSublist = (props: MenuItemsNode) => {
    const [arr] = useSortNav(props.childItems.nodes)
    const [open, setOpen] = useState(false)
    const [sublistHeight, setSublistHeight] = useState<number>()
    const {isMobile, setIsNavModalOpen, isNewContainer} = useGlobalContext()
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


    return <>
        <div onClick={onClick} tabIndex={0} onFocus={onOpen} onBlur={onClose} onMouseEnter={onOpen}
             onMouseLeave={onClose}
             className={stack(styles.nav__sublist, open && styles.open)}>
            <span className={stack(isNewContainer ? 'text-small-new' : 'text-small', styles.nav__link, styles.sublist__title)}>{props.label}</span>
            <img className={styles.sublist__arrow} src="/image/nav-arrow.png" alt="Стрелка вниз"/>
            <div ref={ref} className={styles.sublist__wrapper}>
                <div className={styles.sublist__list}>
                    {arr.map(({label, url}) => <Link onClick={() => setIsNavModalOpen(false)} key={label}
                                                     className={stack(isNewContainer ? 'text-small-new' : 'text-small', 'nav-link', styles.nav__link, styles.sublist__item)}
                                                     to={url}>{label}</Link>)}
                </div>
            </div>
        </div>
        <div className={styles.nav__indent} style={{height: open && sublistHeight ? sublistHeight : 0}}></div>
    </>

}
const PhoneButton = ({number}: PhoneButtonProps) => {
    const [href, setHref] = useState('')
    useEffect(() => {
        if (number) {
            setHref('tel:' + number.split(' ').join('').split('−').join('').split('(').join('').split(')').join(''))
        }
    }, [number])
    return <a className={stack('button-secondary', styles.button)} href={href}>{number}</a>
}

export const Navigation = () => {
    const {data, isNewContainer} = useGlobalContext()
    const {setIsNavModalOpen} = useGlobalContext()
    const [section] = useCommonSection("shapka")

    const [navArr] = useSortNav(data?.menu?.menuItems?.nodes)

    return (
        <nav onClick={(e) => e.stopPropagation()} className={stack(styles.nav)}>
            {navArr?.map((item) =>
                <React.Fragment key={item.label}>
                    {!item.childItems.nodes.length
                        ? <Link onClick={() => setIsNavModalOpen(false)}
                                className={stack(isNewContainer ? 'text-small-new' : 'text-small', 'nav-link', styles.nav__link)}
                                to={item.url}>{item.label}</Link>
                        : <NavSublist  {...item}></NavSublist>}
                </React.Fragment>)}
            <PhoneButton number={section?.header?.headerTelefon}></PhoneButton>
            <button className={styles.nav__close} onClick={() => setIsNavModalOpen(false)}>
                <img src="/image/nav-close.png" className={styles.nav__close__icon} alt="Крестик"/>
            </button>
        </nav>
    );
};

const Header = () => {

    const [section] = useCommonSection("shapka")
    const {setIsNavModalOpen, isNewContainer} = useGlobalContext()


    const clickHandler = () => {
        setIsNavModalOpen(prev => !prev)
    }

    if (!section) return null
    return (

        <header
            className={stack( 'container-new', styles.body)}>
            <div className={styles.wrapper}>
                <Logo className={styles.logo} desktopUrl={section?.header?.headerLogotip?.sourceUrl}
                      mobileUrl={section?.header?.headerLogotipMobile?.sourceUrl}
                      alt={section?.header?.headerLogotip?.altText}></Logo>
                <div className={styles.body__nav}>
                    <Navigation></Navigation>
                </div>
                <button onClick={clickHandler} className={stack('nav-link', styles.burger)}>
                    <img className={styles.burger__icon}
                         src="/image/burger.svg" alt="Бургер"/>
                </button>
            </div>
        </header>

    );
};

export default Header;
