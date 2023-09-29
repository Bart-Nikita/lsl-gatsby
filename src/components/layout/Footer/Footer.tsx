import React, {useEffect} from 'react';
import {useCommonSection} from "../../../hooks/useCommonSection";
import {useGlobalContext} from "../../../context/context";
import * as styles from './Footer.module.css'
import {stack} from "../../../hooks/useClassName";
import {Link} from "gatsby";
import Logo from "../../images/Logo/Logo";
import ToTopButton from "../../common/ToTopButton/ToTopButton";

const Footer = () => {

    const [section] = useCommonSection("podval")
    const {menuItems, isNewContainer} = useGlobalContext()

    if (!section) return null

    return (
        <footer
            className={stack('container-new', styles.new, styles.footer)}>
            <ToTopButton className={styles.buttonToTop}></ToTopButton>
            <div className={styles.footer__body}>
                <div className={styles.logo}>
                    <Logo className={styles.logo__link} mobileUrl={section?.footer?.footerLogotipMobile?.sourceUrl || ''}
                          desktopUrl={section?.footer?.footerLogotip?.sourceUrl || ''}
                          alt={section?.footer?.footerLogotip?.altText || ''}></Logo>
                    <p className={stack(styles.text, styles.logo__copy)}
                       dangerouslySetInnerHTML={{__html: section?.footer?.footerKopirajt || ''}}></p>
                </div>
                <div className={styles.doc}>
                    <a href={section?.footer?.footerPublichnayaOferta?.mediaItemUrl || ''}
                       className={stack('link', styles.text, styles.doc__item)}
                       target={"_blank"}>Публичная оферта</a>
                    <a href={section?.footer?.footerPolitikaKonfidenczialnosti?.mediaItemUrl || ''}
                       className={stack('link', styles.text, styles.doc__item)}
                       target={"_blank"}>Политика конфиденциальности</a>
                </div>

                <div className={styles.nav}>
                    <h3 className={stack(styles.title, styles.nav__title)}
                        dangerouslySetInnerHTML={{__html: section?.footer?.footerMenuZagolovok || ''}}></h3>
                    <ul className={styles.nav__list}>
                        {menuItems?.map((item, index) => <li key={item.label}
                                                                                className={styles.li}>
                            <Link className={stack('nav-link', styles.text, styles.nav__link)}
                                  to={item?.url || '/history'}>{item.label}</Link>
                        </li>)}
                    </ul>
                </div>

                <div className={styles.social}>
                    <h3 className={stack(styles.title, styles.social__title)}
                        dangerouslySetInnerHTML={{__html: section?.footer?.footerSocialZagolovok || ''}}></h3>
                    <ul className={styles.social__list}>
                        {section?.footer?.footerSocialSpisok?.map((item, index) => <li className={styles.li}
                                                                                       key={index}>
                            <a
                                href={item?.footerSocialAdres || ''}
                                target={"_blank"}
                                className={stack('link', styles.social__item)}
                            >
                                <img className={styles.social__icon} src={item?.footerSocialIkonka?.sourceUrl || ''}
                                     alt={item?.footerSocialIkonka?.altText || ''}/>
                                <p className={stack(styles.text, styles.social__text)}>{item?.footerSocialTekst|| ''}</p>
                            </a>
                        </li>)}
                    </ul>
                    <p className={stack(isNewContainer ? 'remark-new' : 'remark', styles.social__remark)}
                       dangerouslySetInnerHTML={{__html: section?.footer?.footerSocialRemarka|| ''}}></p>
                </div>

                <div className={styles.contacts}>
                    <h3 className={stack(styles.title, styles.contacts__title)}>{section?.footer?.footerContactsZagolovok}</h3>
                    <ul className={styles.contacts__list}>
                        {section?.footer?.footerContactsSpisok?.map((item, index) => <li key={index}
                                                                                         className={styles.li}>
                            <a className={stack('link', styles.contacts__link)}
                               href={item?.footerContactsHref?.split(' ').join('').split('−').join('').split('(').join('').split(')').join('')}>
                                <p className={stack(styles.text, styles.contacts__text)}>{item?.footerContactsTekst}</p>
                                {item?.footerContactsEstKommentarij === "true" &&
                                    <p className={styles.contacts__description}> {item.footerContactsKommentarij}</p>}

                            </a>
                        </li>)}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
