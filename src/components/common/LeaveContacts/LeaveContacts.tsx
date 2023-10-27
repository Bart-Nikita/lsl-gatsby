import React, { useEffect, useState } from 'react';
import { stack } from "../../../hooks/useClassName";
import * as styles from './LeaveContacts.module.css'
import ReactInputMask from "react-input-mask";
import { useMutation } from "@apollo/client";
import { SEND_MAIL } from "../../../gql/mutations/sendMail";
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO } from "../../../config";
import { useMock } from '../../../hooks/useMock';
import { useSendMail } from '../../../hooks/useSendMail';
import Loading from '../../loading/Loading';

type LeaveContacts = {
    title?: string,
    buttonText?: string
}

const emptyError = 'Поле необходимо заполнить'

const emailError = 'Email должен содержать "@" и "."'

const LeaveContacts = ({ title, buttonText }: LeaveContacts) => {

    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [nameEmptyError, setNameEmptyError] = useState(false)
    const [phoneEmptyError, setPhoneEmptyError] = useState(false)
    const [emailEmptyError, setEmailEmptyError] = useState(false)
    const [emailTypeError, setEmailTypeError] = useState(false)
    const [emailBody, setEmailBody] = useState('')
    const { goMock, isMockVisible } = useMock()
    const { sendMail, loading } = useSendMail()



    useEffect(() => {
        if (name || phone || email) {
            setEmailBody(`
                <p><strong>Имя:</strong>${name}</p>
                <p><strong>Телефон:</strong>${phone}</p>
                <p><strong>E-mail:</strong>${email}</p>
                `)
        }
    }, [name, phone, email])
    const nullify = () => {
        setNameEmptyError(false)
        setEmailEmptyError(false)
        setEmailTypeError(false)
        setPhoneEmptyError(false)
        setName('')
        setEmail('')
        setPhone('')
    }
    const validate = () => {
        const nameError = !name || !name.trim()
        const emailError = !email || !email.trim()
        const emailTypeError = !!email && !!email.trim() && !email.includes('@') && !email.includes('.')
        const phoneError = !phone || phone.includes('_')
        setNameEmptyError(nameError)
        setEmailEmptyError(emailError)
        setEmailTypeError(emailTypeError)
        setPhoneEmptyError(phoneError)

        if (!nameError && !emailError && !emailTypeError && !phoneError) {
            sendMail(emailBody, CONTACTS_MAIL_SUBJECT, () => {
                goMock()
                nullify()
            })
        }
    }


    const onSubmit = () => {

        validate()
    }

    return (
        <section className={stack('section-indent', 'container', styles.body)}>
            <h2 className={stack(styles.title)} dangerouslySetInnerHTML={{ __html: title || '' }}></h2>
            <div className={styles.form}>
                <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5] bg-[#FFF] bg-opacity-[0.9] duration-700 transition-all ${isMockVisible || loading ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                    <div className=' block  h-full  relative '>
                        {loading && <div className='flex absolute animate-appear top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-start items-center '>
                            <Loading isLoading={loading} className=''></Loading>
                        </div>}
                        {isMockVisible && <div className={'w-[346px] animate-appear absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-[42px] py-[32px] rounded-[12px] bg-[#FFF4DE] md:w-[267px]'}>
                            <h3 className='text-[38px] leading-[1.2] text-[#FEC955] font-bold mb-[12px] md:text-[24px]'>Спасибо!</h3>
                            <p className='text-[24px] leading-[1.2] font-bold md:text-[16px] '>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время&nbsp;<span className={styles.ldsHeart}><div></div></span></p>
                        </div>}
                    </div>
                </div>
                <div className={styles.form__item}>
                    <p className={styles.label}>Имя</p>
                    <input value={name || ''} onChange={e => setName(e.target.value)} className={styles.input}
                        type="text" placeholder={'Иванов Иван'} />
                    {nameEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                </div>
                <div className={styles.form__item}>
                    <p className={styles.label}>Телефон</p>
                    <ReactInputMask onChange={e => setPhone(e.target.value)} value={phone || ''}
                        className={styles.input} type="text"
                        mask={'+7\\ (999) 999-99-99'}
                        placeholder={'+7 (___) ___−__−__'} />
                    {phoneEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                </div>
                <div className={styles.form__item}>
                    <p className={styles.label}>E-mail</p>
                    <input onChange={e => setEmail(e.target.value)} value={email || ''} className={styles.input}
                        type="text" placeholder={'example@gmail.com'} />
                    {emailEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                    {emailTypeError &&
                        <p className={styles.form__error}>{emailError}</p>}
                </div>
                <button onClick={onSubmit}
                    className={stack('button-secondary-new', styles.submit, loading && 'disabled')}>{buttonText}</button>
            </div>
        </section>
    );
}
    ;

export default LeaveContacts;
