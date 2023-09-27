import  {useEffect, useState} from 'react';
import styles from './HomeSupport.module.css'
import {stack} from "../../../../hooks/useClassName";
import {useGlobalContext} from "../../../../context/context";

const HomeSupport = () => {
    const {mainPage:page} = useGlobalContext()
    const [selectedSum, setSelectedSum] = useState(0)
    const [text, setText] = useState('')
    const [isFormInvalid, settIsFormInvalid] = useState(true)

    useEffect(() => {
        settIsFormInvalid(!text || !selectedSum)

    }, [text, selectedSum])

    return (
        <section className={stack('container','section-indent', styles.body)}>
            <div className={styles.content}>
                <h2 className={stack('title-secondary', styles.title)}
                    dangerouslySetInnerHTML={{__html: page?.main?.mainSupportZagolovok}}></h2>
                <p className={stack('text-simple', styles.text)}
                   dangerouslySetInnerHTML={{__html: page?.main?.mainSupportTekst}}></p>
                <p className={stack('remark', styles.remark)}
                   dangerouslySetInnerHTML={{__html: page?.main?.mainSupportRemarka}}></p>
            </div>
            <div className={styles.donation}>
                <div className={styles.donation__buttons}>
                    {page?.main?.mainSupportSpisokVozmozhnyhPozhertvovanij?.map((item) => <button
                        key={item.mainSupportSpisokSumma}
                        onClick={() => setSelectedSum(item.mainSupportSpisokSumma)}
                        className={stack(styles.donation__button, item.mainSupportSpisokSumma === selectedSum && styles.selected)}>
                        {item?.mainSupportSpisokSumma.toLocaleString()} ₽
                    </button>)}
                </div>
                <div className={styles.donation__bottom}>
                    <textarea onChange={e => setText(e.target.value)}  className={styles.input}
                              placeholder={'Ваш комментарий'}/>
                    <button
                        className={stack('button-primary', styles.submit, isFormInvalid && 'disabled')}>{page?.main?.mainSupportTekstKnopki}</button>
                </div>
                <p className={stack('remark', styles.remark)}
                   dangerouslySetInnerHTML={{__html: page?.main?.mainSupportRemarkaVnizu}}></p>
            </div>
        </section>
    );
};

export default HomeSupport;
