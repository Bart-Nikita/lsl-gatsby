import React, { useEffect, useState } from 'react';
import * as styles from './Online.module.css'
import { stack } from "../../../hooks/useClassName";
import { useCommonSection } from "../../../hooks/useCommonSection";
import { useMutation } from "@apollo/client";
import { SEND_MAIL } from "../../../gql/mutations/sendMail";
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO, SUBSCRIPTION_MAIL_SUBJECT } from "../../../config";
import { useMock } from '../../../hooks/useMock';
import { useSendMail } from '../../../hooks/useSendMail';
import Loading from '../../loading/Loading';
import Agreement from '../Agreement/Agreement';

type OnlineProps = {
    className?: string,
    isSmall?: boolean,
    mailSubject: string
}

const emptyError = 'Поле необходимо заполнить'

const emailError = 'Email должен содержать "@" и "."'
const Online = ({ className, isSmall, mailSubject }: OnlineProps) => {
    const [section] = useCommonSection('budem-na-svyazi')
    const [email, setEmail] = useState<string>()
    const [emailEmptyError, setEmailEmptyError] = useState(false)
    const [emailTypeError, setEmailTypeError] = useState(false)
    const [emailBody, setEmailBody] = useState('')
    const [isAgree, setIsAgree] = useState(false)
    const [isAgreeError, setIsAgreeError] = useState(false)
    const { sendMail, loading } = useSendMail()
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
        setIsAgreeError(!isAgree)
        if (!emailError && !emailTypeError && !isAgreeError) {
            sendMail(emailBody, SUBSCRIPTION_MAIL_SUBJECT, () => {
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
                <div className={stack(styles.content, 'transition-all duration-700', (isMockVisible || loading) && 'opacity-[0.2]')}>
                    <h2 className={stack("text-large", styles.title)}
                        dangerouslySetInnerHTML={{ __html: section?.online?.onlineZagolovok || '' }}></h2>
                    <p className={stack('text-simple', styles.text)}
                        dangerouslySetInnerHTML={{ __html: section?.online?.onlineTekst || '' }}></p>
                </div>

                <div className={styles.form}>

                    <div className={`absolute top-0 left-0 right-0 bottom-0 z-[10] xl:top-[-20px] md:top-0 bg-[#FFF4DE] duration-700 transition-all ${isMockVisible || loading ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                        <div className='flex  h-full justify-center items-center relative'>
                            <Loading isLoading={loading} className=''></Loading>
                            {isMockVisible && <div className={` px-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] animate-appear xl:px-0 w-[400px] xl:w-[255px]  ${isSmall && 'px-[0px] w-[430px]'}`}>
                                <h3 className='text-[38px] xl:text-[32px]  md:text-[24px] leading-[1.4] md:text-center font-bold mb-[12px]'>Благодарим вас</h3>
                                <p className='text-[22px] xl:text-[16px] leading-[1.4] md:text-center'>Теперь вы будете получать новую информацию первыми!&nbsp;<svg xmlns="http://www.w3.org/2000/svg" className='inline translate-y-[-5px]' width="35" height="30" viewBox="0 0 172 158" fill="none">
                                    <path d="M86 158C83.3445 157.997 80.7514 157.198 78.5581 155.708C46.0659 133.757 31.9965 118.706 24.2363 109.296C7.6987 89.2371 -0.218666 68.6436 0.0045909 46.3426C0.265058 20.7869 20.8667 0 45.9294 0C64.1539 0 76.7762 10.2165 84.1271 18.7255C84.36 18.9923 84.6477 19.2063 84.9708 19.3529C85.2939 19.4995 85.6449 19.5754 86 19.5754C86.3551 19.5754 86.7061 19.4995 87.0292 19.3529C87.3523 19.2063 87.64 18.9923 87.8729 18.7255C95.2238 10.2083 107.846 0 126.071 0C151.133 0 171.735 20.7869 171.995 46.3467C172.219 68.6518 164.293 89.2453 147.764 109.3C140.003 118.71 125.934 133.761 93.4419 155.712C91.2481 157.201 88.6551 157.998 86 158Z" fill="#FEC955" />
                                </svg></p>
                            </div>}
                        </div>
                    </div>
                    <div className={styles.form__section}>
                        <input className={stack(styles.input, 'transition-all duration-700', isMockVisible && 'opacity-[0]', (emailEmptyError || emailTypeError) && styles.errorInput)} type="text" onChange={e => setEmail(e.target.value)}
                            value={email || ''} placeholder={'example@gmail.com'} />
                        {/* {emailEmptyError && <p className={styles.error}>{emptyError}</p>}
                        {emailTypeError &&
                            <p className={styles.error}>{emailError}</p>} */}

                    </div>


                    <button onClick={onSubmit}
                        className={stack(styles.button, loading && 'disabled', 'transition-all duration-700', isMockVisible && 'opacity-[0]')}>{section?.online?.onlineTekstKnopki}</button>
                    <Agreement className={ `${isSmall ? 'mb-[-30px]' : 'absolute bottom-[-57px] left-0 max-w-[393px]'} xl:w-[256px] xl:left-auto xl:bottom-auto xl:relative`} isChecked={isAgree} error={isAgreeError} setIsChecked={setIsAgree} isSmall={true}></Agreement>
                </div>

            </div>
        </div>
    );
};

export default Online;