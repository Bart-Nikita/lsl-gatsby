import React, { ChangeEvent, ChangeEventHandler, createRef, useEffect, useState } from 'react';
import * as styles from './TrainingsFormModal.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import { InView } from "react-intersection-observer";
import Chrest from "../../../svg/Chrest";
import { useInputState, useInputStateType } from "../../../../hooks/useInputState";
import ReactInputMask from "react-input-mask";
import { useCommonSection } from "../../../../hooks/useCommonSection";
import { useMutation } from "@apollo/client";
import { SEND_MAIL } from "../../../../gql/mutations/sendMail";
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO, TRAINING_MAIL_SUBJECT } from "../../../../config";
import ArrowDown from '../../../svg/ArrowDown';
import { useMock } from '../../../../hooks/useMock';

type InputItem = {
    input: useInputStateType
    id: string,
    placeholder: string,
    label: string,
}

const textEmptyError = 'Поле необходимо заполнить'
const phoneEmptyError = 'Не корректный номер'
const emailTypeError = 'Email должен содержать "@" и "."'
const numberTypeError = 'Поле должно содержать только цифры'

const FormInput = (item: InputItem) => {

    if (item.id === 'city') {
        const { trainingsPage, mainPage } = useGlobalContext()
        const [value, setValue] = useState<string>()
        const [searchValue, setSearchValue] = useState<string>()
        const [initArr, setInitArr] = useState<Queries.WpPage_Trainings_trainingsModalSpisokGorodov[]>()
        const [filteredArr, setFilteredArr] = useState<Queries.WpPage_Trainings_trainingsModalSpisokGorodov[]>()

        useEffect(() => {
            if (value !== undefined) {
                //@ts-ignore
                item.input.onChange({ target: { value } })
            }
        }, [value]);

        const [isSublistOpen, setIsSublistOpen] = useState(false)

        useEffect(() => {
            if (trainingsPage) {
                //@ts-ignore
                setInitArr(trainingsPage?.wpPage?.trainings?.trainingsModalSpisokGorodov)
            }
            if (mainPage) {
                //@ts-ignore
                setInitArr(mainPage?.wpPage?.main?.mainSpisokGorodovVForme)

            }
        }, [mainPage, trainingsPage])

        useEffect(() => {
            if (initArr) {
                console.log(initArr)
            }
        }, [initArr])

        useEffect(() => {

            if (!!searchValue) {
                if (initArr?.some(item => item?.nazvanieGoroda === searchValue)) {
                    //@ts-ignore
                    setFilteredArr(initArr)
                    return
                }
                setValue('')
                //@ts-ignore
                setFilteredArr(initArr.filter(item => item.nazvanieGoroda.toLowerCase().includes(searchValue.toLowerCase())))
            } else {
                //@ts-ignore
                setFilteredArr(initArr)
            }


        }, [searchValue, initArr]);

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


const TrainingsFormModal = () => {
    const { trainingModalData, setIsTrainingFormModalOpen, trainingsPage } = useGlobalContext()
    const [isBottomVisible, setIsBottomVisible] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const [isAgreeError, setIsAgreeError] = useState(false)

    const [isOrganisation, setIsOrganisation] = useState(false)
    const name = useInputState()
    const height = useInputState()
    const age = useInputState()
    const phone = useInputState()
    const email = useInputState()
    const inn = useInputState()
    const kpp = useInputState()
    const address = useInputState()
    const city = useInputState()
    const company = useInputState()
    const [emailBody, setEmailBody] = useState('')


    const firstInputsGroup: InputItem[] = [
        {
            input: name,
            id: 'name',
            placeholder: 'Иванов Иван',
            label: 'Имя и фамилия'
        },
        {
            input: age,
            id: 'age',
            placeholder: '10 лет',
            label: 'Возраст ребёнка'
        },
        {
            input: height,
            id: 'height',
            placeholder: '120 см',
            label: 'Рост ребёнка'
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
        },

        {
            input: city,
            id: 'city',
            placeholder: 'Москва',
            label: 'Город доставки'
        },

    ]

    const secondInputsGroup: InputItem[] = [
        {
            input: company,
            id: 'company',
            placeholder: 'Ростелеком',
            label: 'Название компании'
        },
        {
            input: inn,
            id: 'inn',
            placeholder: '123456789012',
            label: 'ИНН'
        },
        {
            input: kpp,
            id: 'kpp',
            placeholder: '770201001',
            label: 'КПП'
        }, {
            input: address,
            id: 'address',
            placeholder: 'Г. Москва, Гранатный пер. 7с1',
            label: 'Юридический адрес'
        },
        {
            input: phone,
            id: 'phone',
            placeholder: '+7 (___) ___−__−__',
            label: 'Телефон'
        }, {
            input: email,
            id: 'email',
            placeholder: 'example@gmail.com',
            label: 'E-mail'
        },
        {
            input: city,
            id: 'city',
            placeholder: 'Москва',
            label: 'Город доставки'
        }, {
            input: name,
            id: 'name',
            placeholder: 'Иванов Иван',
            label: 'Имя и фамилия'
        },
    ]

    useEffect(() => {

        const str = `<p><strong>Название тренажера:</strong>${trainingModalData?.title}</p><p><strong>Юр. лицо (организация):</strong>${isOrganisation ? 'Да' : 'Нет'}</p>`

        const firstInputsGroupBody = firstInputsGroup.reduce((str, item) => str + `<p><strong>${item.label}:</strong>${item.input.value}</p>`, str)
        const secondInputsGroupBody = secondInputsGroup.reduce((str, item) => str + `<p><strong>${item.label}:</strong>${item.input.value}</p>`, str)
        setEmailBody(isOrganisation ? secondInputsGroupBody : firstInputsGroupBody)

    }, [JSON.stringify(firstInputsGroup), JSON.stringify(secondInputsGroup)])


    const closeClickHandler = (e: any) => {
        e.preventDefault()
        setIsTrainingFormModalOpen(false)
    }

    const [section] = useCommonSection("podval")


    const onCheckboxClick = () => {
        setIsAgree(prev => !prev)
    }

    const [sendMail, { data, loading }] = useMutation(SEND_MAIL)

    useEffect(() => {
        setIsAgreeError(false)
        if (isOrganisation) {
            secondInputsGroup.forEach(item => item.input.setError(''))
        } else {
            firstInputsGroup.forEach(item => item.input.setError(''))

        }
    }, [isOrganisation]);

    const { goMock, isMockVisible } = useMock()

    const nullify = () => {
        // @ts-ignore
        inputsGroup.forEach(item => item.input.onChange({ target: { value: '' } }))
    }

    const onSubmit = () => {
        const inputArr = !isOrganisation ? firstInputsGroup : secondInputsGroup
        let error: boolean | undefined;

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
            if ((item.id === 'kpp' || item.id === 'inn') && !Number(item.input.value)) {
                item.input.setError(numberTypeError)
                error = true
                return
            }
            item.input.setError('')
        })

        if (!isAgree) {
            setIsAgreeError(true)
            error = true
        } else {
            setIsAgreeError(false)

        }

        if (!error) {
            //console.log(emailBody)

            sendMail({
                variables: {
                    emailTo: EMAIL_TO,
                    emailFrom: EMAIL_FROM,
                    subject: TRAINING_MAIL_SUBJECT,
                    body: emailBody
                }
            }).then(() => {
                goMock()
                nullify()
            })
        }

    }

    return (
        <div className={stack(styles.container, !isBottomVisible && styles.light)}>
            <dialog onClick={e => e.stopPropagation()}
                className={stack(styles.body)}>
                <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5] bg-[#FFF] bg-opacity-[0.7] backdrop-blur-md duration-700 transition-all ${isMockVisible ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                    <div className='flex  h-full justify-center items-center '>
                        <div className={'w-full px-[42px] py-[32px] rounded-[12px] flex flex-col justify-center'}>
                            <h3 className='text-center text-[28px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
                            <p className='text-center text-[24px] leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время</p>
                        </div>
                    </div>
                </div>
                <button onClick={closeClickHandler} className={styles.close}>
                    <Chrest className={styles.close__svg}></Chrest>
                </button>

                <div className={styles.top}>
                    <h2 className={styles.title}>Заполните форму</h2>
                    <button onClick={() => setIsOrganisation(prev => !prev)}
                        className={stack(styles.switcher, isOrganisation && styles.on)}>
                        <div className={styles.switcher__body}>
                            <div className={styles.switcher__boll}></div>
                        </div>
                        <span className={styles.switcher__text}>Юр.лицо (организация)</span>
                    </button>
                </div>
                <form onSubmit={e => e.preventDefault()} className={styles.form} action="#">
                    {isOrganisation ? <>
                        {secondInputsGroup.map(item => <FormInput key={item.id} {...item}></FormInput>)}
                    </> :
                        <>
                            {firstInputsGroup.map(item => <FormInput key={item.id} {...item}></FormInput>)}
                        </>}
                    <div className={styles.checkbox}>
                        <button type={"button"} onClick={onCheckboxClick}
                            className={stack(styles.checkbox__box, isAgree && styles.checked, isAgreeError && styles.error)}>
                            <div className={styles.checkbox__sign}></div>
                        </button>
                        <p className={styles.checkbox__text}>Я соглашаюсь с&nbsp; <a className={styles.checkbox__link}
                            href={section?.footer?.footerPolitikaKonfidenczialnosti?.mediaItemUrl || ''}>условиями
                            обработки</a> персональных данных</p>
                    </div>
                    <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new', loading && 'disabled')}>Оформить заказ
                    </button>
                </form>
            </dialog>
            <InView onChange={value => setIsBottomVisible(value)}></InView>

        </div>
    );
};

export default TrainingsFormModal;