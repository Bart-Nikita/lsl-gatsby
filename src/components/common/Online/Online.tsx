import React, {useEffect, useState} from 'react';
import * as styles from './Online.module.css'
import {stack} from "../../../hooks/useClassName";
import {useCommonSection} from "../../../hooks/useCommonSection";
import {useMutation} from "@apollo/client";
import {SEND_MAIL} from "../../../gql/mutations/sendMail";
import {CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO} from "../../../config";

type OnlineProps = {
    className?: string,
    isSmall?: boolean,
}

const emptyError = 'Поле необходимо заполнить'

const emailError = 'Email должен содержать "@" и "."'
const Online = ({className, isSmall}: OnlineProps) => {
    const [section] = useCommonSection('budem-na-svyazi')
    const [email, setEmail] = useState<string>()
    const [emailEmptyError, setEmailEmptyError] = useState(false)
    const [emailTypeError, setEmailTypeError] = useState(false)
    const [emailBody, setEmailBody] = useState('')
    const [sendMail, {data, loading}] = useMutation(SEND_MAIL)

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
            })
            nullify()
        }
    }

    const onSubmit = () => {
        validate()
    }
    return (
        <div className={stack('container-new', isSmall && styles.small , styles.container, className)}>
            <div className={styles.body}>
                <div className={styles.content}>
                    <h2 className={stack("text-large", styles.title)}
                        dangerouslySetInnerHTML={{__html: section?.online.onlineZagolovok}}></h2>
                    <p className={stack('text-simple', styles.text)}
                       dangerouslySetInnerHTML={{__html: section?.online.onlineTekst}}></p>
                </div>
                <div className={styles.form}>
                    <div className={styles.form__section}>
                        <input className={styles.input} type="text" onChange={e => setEmail(e.target.value)}
                               value={email || ''} placeholder={'example@gmail.com'}/>
                        {emailEmptyError && <p className={styles.error}>{emptyError}</p>}
                        {emailTypeError &&
                            <p className={styles.error}>{emailError}</p>}                    </div>
                    <button onClick={onSubmit}
                            className={stack( styles.button, loading && 'disabled')}>{section?.online.onlineTekstKnopki}</button>
                </div>
            </div>
        </div>
    );
};

export default Online;