import React, { useEffect, useState } from 'react';
import * as styles from './Online.module.css'
import { stack } from "../../../hooks/useClassName";
import { useCommonSection } from "../../../hooks/useCommonSection";
import { useMutation } from "@apollo/client";
import { SEND_MAIL } from "../../../gql/mutations/sendMail";
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO } from "../../../config";
import { useMock } from '../../../hooks/useMock';

type OnlineProps = {
    className?: string,
    isSmall?: boolean,
}

const emptyError = 'Поле необходимо заполнить'

const emailError = 'Email должен содержать "@" и "."'
const Online = ({ className, isSmall }: OnlineProps) => {
    const [section] = useCommonSection('budem-na-svyazi')
    const [email, setEmail] = useState<string>()
    const [emailEmptyError, setEmailEmptyError] = useState(false)
    const [emailTypeError, setEmailTypeError] = useState(false)
    const [emailBody, setEmailBody] = useState('')
    const [sendMail, { data, loading }] = useMutation(SEND_MAIL)
    const { goMock, isMockVisible } = useMock()

    useEffect(() => {
        if (email) {
            setEmailBody(`<p><strong>E-mail:</strong>${email}</p>`)
        }
    }, [email])
    const nullify = () => {
        setEmailEmptyError(false)
        setEmailTypeError(false)
        setEmail('')
    }
    const validate = () => {
        const emailError = !email || !email.trim()
        const emailTypeError = !!email && !!email.trim() && !email.includes('@') && !email.includes('.')
        setEmailEmptyError(emailError)
        setEmailTypeError(emailTypeError)

        if (!emailError && !emailTypeError) {
            sendMail({
                variables: {
                    emailTo: EMAIL_TO,
                    emailFrom: EMAIL_FROM,
                    subject: CONTACTS_MAIL_SUBJECT,
                    body: emailBody
                }
            }).then(() => {
                goMock()
                nullify()
            })
           
        }
    }

    const onSubmit = () => {
        
        validate()
    }
    return (
        <div className={stack('container-new', isSmall && styles.small, styles.container, className)}>
            <div className={styles.body}>
                <div className={stack(styles.content,'transition-all duration-700', isMockVisible && 'opacity-[0.2]')}>
                    <h2 className={stack("text-large", styles.title)}
                        dangerouslySetInnerHTML={{ __html: section?.online?.onlineZagolovok || '' }}></h2>
                    <p className={stack('text-simple', styles.text)}
                        dangerouslySetInnerHTML={{ __html: section?.online?.onlineTekst || '' }}></p>
                </div>

                <div className={styles.form}>
                    <div className={`absolute top-0 left-0 right-0 bottom-0 z-[10] xl:top-[-20px] md:top-0 bg-[#FFF4DE] duration-700 transition-all ${isMockVisible ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                        <div className='flex  h-full justify-center items-center '>
                            <div className={` px-[30px] xl:px-0 max-w-[400px] xl:max-w-[255px] md:max-w-none ${isSmall && 'px-[0px]'}`}>
                                <h3 className='text-[38px] xl:text-[32px]  md:text-[24px] leading-[1.4] md:text-center font-bold mb-[12px]'>Благодарим вас</h3>
                                <p className='text-[22px] xl:text-[16px] leading-[1.4] md:text-center'>Теперь вы будете получать новую информацию первыми!</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.form__section}>
                        <input className={stack(styles.input, 'transition-all duration-700', isMockVisible && 'opacity-[0]')} type="text" onChange={e => setEmail(e.target.value)}
                            value={email || ''} placeholder={'example@gmail.com'} />
                        {emailEmptyError && <p className={styles.error}>{emptyError}</p>}
                        {emailTypeError &&
                            <p className={styles.error}>{emailError}</p>}                    </div>
                    <button onClick={onSubmit}
                        className={stack(styles.button, loading && 'disabled', 'transition-all duration-700', isMockVisible && 'opacity-[0]')}>{section?.online?.onlineTekstKnopki}</button>
                </div>
            </div>
        </div>
    );
};

export default Online;