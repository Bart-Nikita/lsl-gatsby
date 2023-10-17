import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'
import React, { ChangeEvent, createRef, useEffect, useState } from 'react'
import ArrowDown from '../../../../svg/ArrowDown'
import * as styles from './FirstSection.module.css'
import { useInputState, useInputStateType } from '../../../../../hooks/useInputState'
import ReactInputMask from 'react-input-mask'
import { useGlobalContext } from '../../../../../context/context'
import { stack } from '../../../../../hooks/useClassName'
import { useMutation } from '@apollo/client'
import { EMAIL_TO, EMAIL_FROM, CONTACTS_MAIL_SUBJECT } from '../../../../../config'
import { SEND_MAIL } from '../../../../../gql/mutations/sendMail'
import OrderBox from '../OrderBox/OrderBox'
import OrderForm from '../OrderForm/OrderForm'
import { useMock } from '../../../../../hooks/useMock'

type InputItem = {
    input: useInputStateType
    id: string,
    placeholder: string,
    label: string,
}

export const textEmptyError = 'Поле необходимо заполнить'
export const phoneEmptyError = 'Не корректный номер'
export const emailTypeError = 'Email должен содержать "@" и "."'
export const numberTypeError = 'Поле должно содержать только цифры'

export const OrderFormInput = (item: InputItem) => {

    if (item.id === 'city') {
        const { trainingsPage } = useGlobalContext()
        const [value, setValue] = useState<string>()
        const [searchValue, setSearchValue] = useState<string>()
        const [filteredArr, setFilteredArr] = useState<Queries.WpPage_Trainings_trainingsModalSpisokGorodov[]>()

        useEffect(() => {
            if (value !== undefined) {
                //@ts-ignore
                item.input.onChange({ target: { value } })
            }
        }, [value]);

        const [isSublistOpen, setIsSublistOpen] = useState(false)

        useEffect(() => {
            if (!!searchValue) {
                if (trainingsPage?.wpPage?.trainings?.trainingsModalSpisokGorodov?.some(item => item?.nazvanieGoroda === searchValue)) {
                    //@ts-ignore
                    setFilteredArr(trainingsPage?.wpPage?.trainings?.trainingsModalSpisokGorodov)
                    return
                }
                setValue('')
                //@ts-ignore
                setFilteredArr(trainingsPage?.wpPage?.trainings?.trainingsModalSpisokGorodov.filter(item => item.nazvanieGoroda.toLowerCase().includes(searchValue.toLowerCase())))
            } else {
                //@ts-ignore
                setFilteredArr(trainingsPage?.wpPage?.trainings?.trainingsModalSpisokGorodov)
            }
        }, [searchValue]);

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
        }

        const onItemClick = (item: Queries.WpPage_Trainings_trainingsModalSpisokGorodov) => {

            setValue(item.nazvanieGoroda || '')
            setSearchValue(item.nazvanieGoroda || '')
            setIsSublistOpen(false)
        }

        const ref = createRef<HTMLButtonElement>()

        useEffect(() => {
            if (isSublistOpen) {
                // ref.current.focus()
            }
        }, [isSublistOpen]);


        const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isSublistOpen && !!filteredArr?.length && e.key === "Tab") {
                // ref.current.focus()
            }
        }

        const onBlockKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === "Space") {
                setIsSublistOpen(prev => !prev)
            } else {
                setIsSublistOpen(true)

            }
        }

        const onItemKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, item: Queries.WpPage_Trainings_trainingsModalSpisokGorodov) => {
            if (e.key === "Enter" || e.key === "Space") {
                e.stopPropagation()
                e.preventDefault()
                onItemClick(item)
            }
        }

        return <div className={stack(styles.form__block, item.input.error && styles.error)} onKeyDown={onBlockKeyDown}
            onClick={() => setIsSublistOpen(prev => !prev)}>
            <label className={styles.label} htmlFor={item.id}>{item.label}</label>
            <input id={item.id} onKeyDown={onInputKeyDown} className={styles.input} type="text"
                placeholder={item.placeholder}
                onChange={onChange} value={searchValue || ''} />
            {item.input.error && <span className={styles.error__text}>{item.input.error}</span>}
            {isSublistOpen && <ul className={styles.sublist}>
                {filteredArr?.map((item, index) => <li key={index} className={styles.sublist__item}>
                    <button {...index === 0 ? { ref } : {}} onKeyDown={e => onItemKeyDown(e, item)}
                        onClick={(e) => (e.stopPropagation(), onItemClick(item))}
                        className={styles.sublist__button}>{item.nazvanieGoroda}</button>
                </li>)}
            </ul>}
            <ArrowDown className={stack(styles.input__arrow, isSublistOpen && styles.up)}></ArrowDown>
        </div>
    }

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


export default function FirstSection(img: GatsbyImageProps) {

    const name = useInputState()
    const phone = useInputState()
    const email = useInputState()
    const sum = useInputState()
    const [loading, setLoading] = useState<boolean>(false)
    const { goMock, isMockVisible } = useMock()


    const inputsGroup: InputItem[] = [
        {
            input: sum,
            id: 'sum',
            placeholder: '10 000',
            label: 'Номинал сертификата в рублях*'
        },
        {
            input: name,
            id: 'name',
            placeholder: 'Иванов Иван',
            label: 'Имя и фамилия'
        },
        {
            input: phone,
            id: 'phone',
            placeholder: '+7 (___) ___−__−__',
            label: 'Телефон'
        },
        {
            input: email,
            id: 'email',
            placeholder: 'example@gmail.com',
            label: 'E-mail'
        }]




    return (
        <OrderBox loading={loading}  isMockVisible={isMockVisible}>
          <OrderForm setLoading={setLoading} goMock={goMock} isMockVisible={isMockVisible} inputsGroup={inputsGroup} certType='Онлайн' ></OrderForm>
            <div className='absolute top-0 left-0 right-0 bottom-0 [background:radial-gradient(78.53%_82.97%_at_100%_100%,_rgba(255,_255,_255,_0.50)_0%,_#FFF_100%)] z-[2] xl:[background:radial-gradient(65.53%_97.97%_at_100%_100%,_rgba(255,_255,_255,_0.50)_0%,_#FFF_100%)] md:hidden'></div>
            <div className='absolute top-[177px] left-[361px] right-[-183px] bottom-[-314px] z-[1] xl:bottom-0 xl:left-[30%] xl:top-[13%] xl:right-[-5%] md:hidden' ><GatsbyImage {...img}></GatsbyImage></div>
        </OrderBox>
    )
}


