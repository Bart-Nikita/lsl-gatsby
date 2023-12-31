import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { EMAIL_TO, EMAIL_FROM, CONTACTS_MAIL_SUBJECT, CERT_MAIL_SUBJECT } from '../../../../../config'
import { SEND_MAIL } from '../../../../../gql/mutations/sendMail'
import { stack } from '../../../../../hooks/useClassName'
import { useInputStateType } from '../../../../../hooks/useInputState'
import ReactInputMask from 'react-input-mask'
import * as styles from './OrderForm.module.css'
import { useSendMail } from '../../../../../hooks/useSendMail'
import Agreement from '../../../../common/Agreement/Agreement'


const textEmptyError = 'Поле необходимо заполнить'
const phoneEmptyError = 'Не корректный номер'
const emailTypeError = 'Email должен содержать "@" и "."'
const numberTypeError = 'Поле должно содержать только цифры'

export type InputItem = {
    input: useInputStateType
    id: string,
    placeholder: string,
    label: string,
}

type OrderFormProps = {
    inputsGroup: InputItem[],
    certType: string,
    isMockVisible?: boolean,
    goMock: () => void,
    setLoading: (value: boolean) => void
}

const OrderFormInput = (item: InputItem) => {



    if (item.id === 'phone') {
        return <div className={stack(styles.form__block, item.input.error && styles.error)}>
            <label className={styles.label} htmlFor={item.id}>{item.label}</label>
            <ReactInputMask id={item.id} mask={'+7\\ (999) 999-99-99'} className={styles.input} type="text"
                placeholder={item.placeholder} onChange={value => item.input.onChange(value)}
                value={item.input.value} />
            {item.input.error && <span className={styles.error__text}>{item.input.error}</span>}
        </div>
    }

    return <div
        className={stack(styles.form__block, item.input.error && styles.error, item.id === 'height' && styles.short, item.id === 'age' && styles.short)}>
        <label className={styles.label} htmlFor={item.id}>{item.label}</label>
        <input id={item.id} className={styles.input} type="text" placeholder={item.placeholder}
            onChange={value => item.input.onChange(value)} value={item.input.value} />
        {item.input.error && <span className={styles.error__text}>{item.input.error}</span>}
    </div>
}


export default function OrderForm({ inputsGroup, certType, isMockVisible, goMock, setLoading }: OrderFormProps) {
    const [emailBody, setEmailBody] = useState('')
    const [isAgree, setIsAgree] = useState(false)
    const [isAgreeError, setIsAgreeError] = useState(false)
    useEffect(() => {

        const inputsGroupBody = inputsGroup.reduce((str, item) => str + `<p><strong>${item.label}:</strong>${item.input.value}</p>`, `<p><strong>Тип получения:</strong>${certType}</p>`)
        setEmailBody(inputsGroupBody)

    }, [JSON.stringify(inputsGroup)])
    const { sendMail, loading } = useSendMail()
    useEffect(() => {
        setLoading(loading)
    }, [loading])

    const onSubmit = () => {


        const inputArr = inputsGroup
        let error: boolean | undefined;

        setIsAgreeError(!isAgree)

        inputArr.forEach(item => {
            if (item.input.value === '') {
                item.input.setError(textEmptyError)
                error = true
                return
            }
            if (item.input.value.includes('_') && item.id === 'phone') {
                item.input.setError(phoneEmptyError)
                error = true
                return
            }
            if (item.id === 'email' && (!item.input.value.includes('.') || !item.input.value.includes('@'))) {
                item.input.setError(emailTypeError)
                error = true
                return
            }
            if ((item.id === 'sum') && !Number(item.input.value)) {
                item.input.setError(numberTypeError)
                error = true
                return
            }
            item.input.setError('')
        })



        if (!error) {
            sendMail(emailBody, CERT_MAIL_SUBJECT, () => {
                goMock()
                nullify()
            })
        }

    }


    function nullify() {
        //@ts-ignore
        inputsGroup.forEach(item => item.input.onChange({ target: { value: '' } }))
    }
    return (
        <form onSubmit={e => e.preventDefault()} className={stack(styles.form, `transition-all duration-700  ${isMockVisible || loading ? 'pointer-events-none opacity-[0.2] filter blur-md' : ''}`)} action="#">
            {inputsGroup.map((item, index) => <OrderFormInput key={item.id} {...item}></OrderFormInput>)}
            <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new')}>Отправить
            </button>
            <Agreement className='col-span-2 mt-[25px] xl:mt-[20px] md:mt-[16px]' isChecked={isAgree} error={isAgreeError} setIsChecked={setIsAgree} isSmall={false}></Agreement>

        </form>
    )
}
