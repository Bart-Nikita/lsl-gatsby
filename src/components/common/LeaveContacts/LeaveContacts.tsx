import React, {useEffect, useState} from 'react';
import {stack} from "../../../hooks/useClassName";
import * as styles from './LeaveContacts.module.css'
import ReactInputMask from "react-input-mask";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../gql/mutations/sendMail";
import {CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO} from "../../../config";

type LeaveContacts = {
    title?: string,
    buttonText?: string
}

const emptyError = 'Поле необходимо заполнить'

const emailError = 'Email должен содержать "@" и "."'

const LeaveContacts = ({title, buttonText}: LeaveContacts) => {

        const [name, setName] = useState<string>()
        const [email, setEmail] = useState<string>()
        const [phone, setPhone] = useState<string>()
        const [nameEmptyError, setNameEmptyError] = useState(false)
        const [phoneEmptyError, setPhoneEmptyError] = useState(false)
        const [emailEmptyError, setEmailEmptyError] = useState(false)
        const [emailTypeError, setEmailTypeError] = useState(false)
        const [emailBody, setEmailBody] = useState('')

        const [sendMail, {data, loading}] = useMutation(SEND_MAIL)

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
                sendMail({
                    variables: {
                        emailTo: EMAIL_TO,
                        emailFrom: EMAIL_FROM,
                        subject: CONTACTS_MAIL_SUBJECT,
                        body: emailBody
                    }
                })
                nullify()
            }
        }


        const onSubmit = () => {
            validate()
        }

        return (
            <section className={stack('section-indent', 'container', styles.body)}>
                <h2 className={stack(styles.title)} dangerouslySetInnerHTML={{__html: title}}></h2>
                <div className={styles.form}>
                    <div className={styles.form__item}>
                        <p className={styles.label}>Имя</p>
                        <input value={name || ''} onChange={e => setName(e.target.value)} className={styles.input}
                               type="text" placeholder={'Иванов Иван'}/>
                        {nameEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                    </div>
                    <div className={styles.form__item}>
                        <p className={styles.label}>Имя</p>
                        <ReactInputMask onChange={e => setPhone(e.target.value)} value={phone || ''}
                                        className={styles.input} type="text"
                                        mask={'+7\\ (999) 999-99-99'}
                                        placeholder={'+7 (___) ___−__−__'}/>
                        {phoneEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                    </div>
                    <div className={styles.form__item}>
                        <p className={styles.label}>E-mail</p>
                        <input onChange={e => setEmail(e.target.value)} value={email || ''} className={styles.input}
                               type="text" placeholder={'example@gmail.com'}/>
                        {emailEmptyError && <p className={styles.form__error}>{emptyError}</p>}
                        {emailTypeError &&
                            <p className={styles.form__error}>{emailError}</p>}
                    </div>
                    <button onClick={onSubmit}
                            className={stack( styles.submit, loading && 'disabled')}>{buttonText}</button>
                </div>
            </section>
        );
    }
;

export default LeaveContacts;
