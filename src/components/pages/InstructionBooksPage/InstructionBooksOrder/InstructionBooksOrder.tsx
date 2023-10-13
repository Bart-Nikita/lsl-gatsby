import React, { ChangeEvent, createRef, useEffect, useState } from 'react';
import * as styles from './InstructionBooksOrder.module.css'
import { useGlobalContext } from "../../../../context/context";
import { stack } from "../../../../hooks/useClassName";
import { typo } from '../../../../tipograf';
import { useInputState, useInputStateType } from '../../../../hooks/useInputState';
import { useTrainings } from '../../../../hooks/useTrainings';
import ReactInputMask from 'react-input-mask';
import { useCommonSection } from '../../../../hooks/useCommonSection';
import { useMutation } from '@apollo/client';
import { SEND_MAIL } from '../../../../gql/mutations/sendMail';
import { CONTACTS_MAIL_SUBJECT, EMAIL_FROM, EMAIL_TO, INSTRUCTION_MAIL_SUBJECT } from '../../../../config';
import LightPicture from '../../../images/LightPicture/LightPicture';
import ArrowDown from '../../../svg/ArrowDown';
import { GatsbyImage } from 'gatsby-plugin-image';
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

const isBrowser = typeof window !== "undefined"


const FormInput = (item: InputItem) => {

    if (item.id === 'training') {
        const { trainings, isMobile } = useGlobalContext()
        const [value, setValue] = useState<string>()
        const [searchValue, setSearchValue] = useState<string>()
        const [filteredArr, setFilteredArr] = useState<Queries.WpTraining[]>()

        useEffect(() => {
            if (value !== undefined) {
                //@ts-ignore
                item.input.onChange({ target: { value } })
            }
        }, [value]);

        const [isSublistOpen, setIsSublistOpen] = useState(false)

        useEffect(() => {
            if (!!searchValue) {
                if (trainings?.some(item => item.title === searchValue)) {
                    setFilteredArr(trainings)
                    return
                }
                setValue('')
                setFilteredArr(trainings?.filter(item => item?.title?.toLowerCase().includes(searchValue.toLowerCase())))
            } else {
                trainings && setFilteredArr(trainings)
            }
        }, [searchValue, trainings]);

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value)
        }

        const onItemClick = (item: Queries.WpTraining) => {
            setIsSublistOpen(false)
            setValue(item.title || '')
            setSearchValue(item.title || '')
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
            // //console.log('hi')

            if (e.key === "Enter" || e.key === "Space") {
                setIsSublistOpen(prev => !prev)
            } else {
                setIsSublistOpen(true)

            }
        }

        const onItemKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, item: Queries.WpTraining) => {
            // //console.log('hi')
            if (e.key === "Enter" || e.key === "Space") {
                e.stopPropagation()
                e.preventDefault()
                onItemClick(item)
            }
        }
        const block = createRef<HTMLDivElement>()
        const [hover, setHover] = useState(false)
        const [clickCounter, setClickCOunter] = useState(0)

        useEffect(() => {
            if (isBrowser && block?.current) {

                window.document.addEventListener('mousedown', (e) => {

                    setClickCOunter(prev => prev + 1)
                })
                return () => {
                    window.document.removeEventListener('mousedown', (e) => {
                        setClickCOunter(prev => prev + 1)
                    })
                }
            }
        }, [isBrowser, block?.current])

        useEffect(() => {
            if (!hover) {
                !isMobile && setIsSublistOpen(false)
            }
        }, [clickCounter])

        return <div ref={block} className={stack(styles.form__block, item.input.error && styles.error)} onKeyDown={onBlockKeyDown}
            onMouseEnter={() => !isMobile && setHover(true)} onMouseLeave={() => !isMobile && setHover(false)} >
            <label className={styles.label} htmlFor={item.id}>{item.label}</label>
            <input onClick={() => setIsSublistOpen(prev => !prev)} id={item.id} onKeyDown={onInputKeyDown} className={styles.input} type="text"
                placeholder={item.placeholder}
                onChange={onChange} value={searchValue || ''} />
            {item.input.error && <span className={styles.error__text}>{item.input.error}</span>}
            {isSublistOpen && <ul className={styles.sublist}>
                {filteredArr?.map((item, index) => <li key={item.slug} className={styles.sublist__item}>
                    <button {...index === 0 ? { ref } : {}} onKeyDown={e => onItemKeyDown(e, item)}
                        onClick={(e) => (e.preventDefault(), onItemClick(item))}
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
    const { goMock, isMockVisible } = useMock()


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

            sendMail({
                variables: {
                    emailTo: EMAIL_TO,
                    emailFrom: EMAIL_FROM,
                    subject: INSTRUCTION_MAIL_SUBJECT,
                    body: emailBody
                }
            }).then(() => {
                goMock()
                nullifyInputs()})
        }

    }

    function nullifyInputs() {
        //@ts-ignore
        inputsGroup.forEach(item => (item.input.onChange({ target: { value: '' } }), item.input.setError('')))
        setIsAgree(false)
    }

    return (
        <section className={stack(styles.section)} >
            <div className={styles.picture}>
                {instructionBooksPage?.wpPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera?.gatsbyImage && <GatsbyImage className='w-full h-full' image={instructionBooksPage?.wpPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera?.gatsbyImage} alt={instructionBooksPage?.wpPage?.instructionBooks?.instructionsOrderFonovoeIzobrazhenieDlyaKonpyutera?.altText || ''}></GatsbyImage>}

            </div>
            <div className={stack('container', styles.container)} >
                <div className={styles.left}>
                    <h2 className={styles.title}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsOrderZagolovok || '')}</h2>
                    <p className={styles.text}>{typo.execute(instructionBooksPage?.wpPage?.instructionBooks?.instructionsOrderPodzagolovok || '')}</p>
                </div>

                <div className={stack(styles.right )}>
                    <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5]  duration-700 transition-all ${isMockVisible ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                        <div className='flex  h-full justify-start items-center '>
                            <div className={'w-full  py-[32px] rounded-[12px] flex flex-col justify-center max-w-[500px]'}>
                                <h3 className='text-center text-[28px] xl:text-[24px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
                                <p className='text-center text-[24px] xl:text-[16px] leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время</p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={e => e.preventDefault()} className={stack(styles.form, `transition-all duration-700  ${isMockVisible ? 'opacity-[0.2] filter blur-md' : ''}`)} action="#">

                        {inputsGroup.map(item => <FormInput key={item.id} {...item}></FormInput>)}

                        <div className={styles.checkbox}>
                            <button type={"button"} onClick={onCheckboxClick}
                                className={stack(styles.checkbox__box, isAgree && styles.checked, isAgreeError && styles.error,  loading && 'disabled')}>
                                <div className={styles.checkbox__sign}></div>
                            </button>
                            <p className={styles.checkbox__text}>Я соглашаюсь с&nbsp; <a className={styles.checkbox__link}
                                href={section?.footer?.footerPolitikaKonfidenczialnosti?.mediaItemUrl || ''}>условиями
                                обработки</a> персональных данных</p>
                        </div>
                        <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new', loading && 'disabled')}>Отправить
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default InstructionBooksOrder;