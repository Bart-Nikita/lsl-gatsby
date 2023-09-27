import React from 'react';
import * as styles from './HomeHero.module.css'
import { stack } from "../../../../hooks/useClassName";
import { useGlobalContext } from "../../../../context/context";
import Carousel from 're-carousel'
import Picture from "../../../images/Picture/Picture";
import { usePage } from "../../../../hooks/usePage";
import { useFile } from '../../../../hooks/useFile';


function Buttons(props: any) {

    const { index, total, loop, prevHandler, nextHandler } = props

    const [arrowLeft] = useFile('arrow-left')
    const [arrowRight] = useFile('arrow-right')

    return (
        <div className={styles.slider__buttonWrapper}>
            {(loop || index !== 0) && (
                <button tabIndex={0} className={stack('link', styles.slider__btn, styles.slider__btnPrev)} onClick={prevHandler}><img className={styles.slider__buttonIcon}
                    src={arrowLeft} alt="Стрелка влево" />
                </button>
            )}
            {(loop || index !== total - 1) && (
                <button tabIndex={0} className={stack('link', styles.slider__btn, styles.slider__btnNext)} onClick={nextHandler}><img className={styles.slider__buttonIcon}
                    src={arrowRight} alt="Стрелка вправо" />
                </button>
            )}
        </div>
    )
}


const HomeHero = () => {

    const { mainPage: page } = useGlobalContext()
    return (
        <section className={stack('container', styles.body)}>
            <div className={styles.content}>
                <div className={styles.content__top}>
                    <h1 className={stack('title-primary', styles.title)}
                        dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainHeroZagolovok || '' }}></h1>
                    <p className={stack('text-primary', styles.subtitle)}
                        dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainHeroPodzagolovok || '' }}></p>
                </div>
                <div className={styles.content__bottom}>
                    <p className={stack('text-primary', styles.text)}
                        dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainHeroTekst || '' }}></p>
                    <p className={stack('text-secondary', styles.small)}
                        dangerouslySetInnerHTML={{ __html: page?.wpPage?.main?.mainHeroMalyjTekst || '' }}></p>
                </div>
            </div>
            <div className={styles.slider}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-ignore  */}
                <Carousel loop widgets={[Buttons]} className={styles.slider__carousel}>
                    {page?.wpPage?.main?.mainHeroSlajder?.map((item, index) => <Picture key={index}
                        className={styles.slider__picture} imageClassName={styles.slider__image} desktopIImageX1={item?.mainHeroSlajderKompyuter1x?.sourceUrl || ''}
                        desktopIImageX2={item?.mainHeroSlajderKompyuter2x?.sourceUrl || ''}
                        mobileIImageX1={item?.mainHeroSlajderTelefon1x?.sourceUrl || ''}
                        mobileIImageX2={item?.mainHeroSlajderTelefon2x?.sourceUrl || ''} alt={item?.mainHeroSlajderKompyuter1x?.altText || ''}></Picture>)}
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/*@ts-ignore  */}
                </Carousel>
                <a className={stack('button-primary', styles.button)}
                    href={page?.wpPage?.main?.mainHeroAdresSsylki || ''}>{page?.wpPage?.main?.mainHeroTekstSsylki}</a>
            </div>
        </section>
    );
};

export default HomeHero;
