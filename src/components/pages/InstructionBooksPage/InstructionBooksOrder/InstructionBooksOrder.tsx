import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import styles from './InstructionBooksOrder.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import { typo } from '../../../../tipograf';
import { useInputState, useInputStateType } from '../../../../hooks/useInputState';
import { NodeTrainings, TrainingsNode } from '../../../../types/data';
import { useTrainings } from '../../../../hooks/useTrainings';
import ReactInputMask from 'react-input-mask';
import { useCommonSection } from '../../../../hooks/useCommonSection';
import { useMutation } from '@apollo/client';
import { SEND_MAIL } from '../../../../gql/mutations/sendMail';
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO } from '../../../../config';
import LightPicture from '../../../images/LightPicture/LightPicture';
import ArrowDown from '../../../svg/ArrowDown';

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

    if (item.id === 'training') {
        const [trainings] = useTrainings()
        const [value, setValue] = useState<string>()
        const [searchValue, setSearchValue] = useState<string>()
        const [filteredArr, setFilteredArr] = useState<TrainingsNode[]>()

        useEffect(() => {
            if (value !== undefined) {
                //@ts-ignore
                item.input.onChange({ target: { value } })
            }
        }, [value]);

        const [isSublistOpen, setIsSublistOpen] = useState(false)

        useEffect(() => {
            if (!!searchValue) {
                if (trainings.some(item => item.title === searchValue)) {
                    setFilteredArr(trainings)
                    return
                }
                setValue('')
                setFilteredArr(trainings.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())))
            } else {
                setFilteredArr(trainings)
            }
        }, [searchValue, trainings]);

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
        }

        const onItemClick = (item: TrainingsNode) => {

            setValue(item.title || '')
            setSearchValue(item.title || '')
            setIsSublistOpen(false)
        }

        const ref = createRef<HTMLButtonElement>()

        useEffect(() => {
            if (isSublistOpen) {
                // ref.current.focus()
            }
        }, [isSublistOpen]);


        const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isSublistOpen && !!filteredArr.length && e.key === "Tab") {
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

        const onItemKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, item: TrainingsNode) => {
            if (e.key === "Enter" || e.key === "Space") {
                e.stopPropagation()
                e.preventDefault()
                onItemClick(item)
            }
        }

        return <div className={stack(styles.form__block, item.input.error && styles.error)} onKeyDown={onBlockKeyDown}
            onClick={() => setIsSublistOpen(prev => !prev)} onBlur={() => setIsSublistOpen(false)}>
            <label className={styles.label} htmlFor={item.id}>{item.label}</label>
            <input id={item.id} onKeyDown={onInputKeyDown} className={styles.input} type="text"
                placeholder={item.placeholder}
                onChange={onChange} value={searchValue || ''} />
            {item.input.error && <span className={styles.error__text}>{item.input.error}</span>}
            {isSublistOpen && <ul className={styles.sublist}>
                {filteredArr?.map((item, index) => <li key={index} className={styles.sublist__item}>
                    <button {...index === 0 ? { ref } : {}} onKeyDown={e => onItemKeyDown(e, item)}
                        onClick={(e) => (e.stopPropagation(), onItemClick(item))}
                        className={styles.sublist__button}>{item.title}</button>
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

const InstructionBooksOrder = () => {
    const { instructionBooksPage } = useGlobalContext()
    const [isAgree, setIsAgree] = useState(false)
    const [isAgreeError, setIsAgreeError] = useState(false)
    const name = useInputState()
    const training = useInputState()
    const phone = useInputState()
    const email = useInputState()
    const [emailBody, setEmailBody] = useState('')


    const inputsGroup: InputItem[] = [
        {
            input: name,
            id: 'name',
            placeholder: 'Иванов Иван',
            label: 'Имя'
        },
        {
            input: training,
            id: 'training',
            placeholder: 'Ёлочка',
            label: 'Название тренажера'
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
        }

    ]


    useEffect(() => {

        const inputsGroupBody = inputsGroup.reduce((str, item) => str + `<p><strong>${item.label}:</strong>${item.input.value}</p>`, ``)

        setEmailBody(inputsGroupBody)

    }, [JSON.stringify(inputsGroup)])



    const [section] = useCommonSection("podval")


    const onCheckboxClick = () => {
        setIsAgree(prev => !prev)
    }

    const [sendMail, { data, loading }] = useMutation(SEND_MAIL)


    const onSubmit = () => {
        const inputArr = inputsGroup
        let error: boolean;

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

        console.log('error')

        if (!error) {
            console.log(emailBody)

            sendMail({
                variables: {
                    emailTo: EMAIL_TO,
                    emailFrom: EMAIL_FROM,
                    subject: CONTACTS_MAIL_SUBJECT,
                    body: emailBody
                }
            }).then(() => nullifyInputs())
        }

    }

    function nullifyInputs() {
        //@ts-ignore
        inputsGroup.forEach(item => (item.input.onChange({ target: { value: '' } }), item.input.setError('')))
        setIsAgree(false)
    }

    return (
        <section className={stack(styles.section)} >
            <LightPicture className={styles.picture} desktopIImage={instructionBooksPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera?.sourceUrl} imageClassName={styles.image} mobileIImage={instructionBooksPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaTelefona?.sourceUrl} alt={instructionBooksPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera?.altText}></LightPicture>
            <div className={stack('container', styles.container)} >
                <div className={styles.left}>
                    <h2 className={styles.title}>{typo.execute(instructionBooksPage?.instructionBooks.instructionsOrderZagolovok)}</h2>
                    <p className={styles.text}>{typo.execute(instructionBooksPage?.instructionBooks.instructionsOrderPodzagolovok)}</p>
                </div>

                <div className={styles.right}>
                    <form onSubmit={e => e.preventDefault()} className={styles.form} action="#">

                        {inputsGroup.map(item => <FormInput key={item.id} {...item}></FormInput>)}

                        <div className={styles.checkbox}>
                            <button type={"button"} onClick={onCheckboxClick}
                                className={stack(styles.checkbox__box, isAgree && styles.checked, isAgreeError && styles.error)}>
                                <div className={styles.checkbox__sign}></div>
                            </button>
                            <p className={styles.checkbox__text}>Я соглашаюсь с&nbsp; <a className={styles.checkbox__link}
                                href={section?.footer?.footerPolitikaKonfidenczialnosti?.mediaItemUrl}>условиями
                                обработки</a> персональных данных</p>
                        </div>
                        <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new')}>Отправить
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default InstructionBooksOrder;