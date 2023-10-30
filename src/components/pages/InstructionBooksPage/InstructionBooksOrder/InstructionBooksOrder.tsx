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
import { useSendMail } from '../../../../hooks/useSendMail';
import Loading from '../../../loading/Loading';
import Agreement from '../../../common/Agreement/Agreement';

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

    const { sendMail, loading } = useSendMail()


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
            sendMail(emailBody, INSTRUCTION_MAIL_SUBJECT, () => {
                goMock()
                nullifyInputs()
            })
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

                <div className={stack(styles.right)}>
                    <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5]  duration-700 transition-all ${isMockVisible || loading ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                        <div className='block max-w-[500px] h-full  relative'>
                            {loading && <div className='flex absolute animate-appear top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-start items-center '>
                                <Loading isLoading={loading} className=''></Loading>
                            </div>}
                            {isMockVisible && <div className={'w-full animate-appear absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[32px] rounded-[12px] flex flex-col justify-center max-w-[500px]'}><h3 className='text-center text-[28px] xl:text-[24px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
                                <p className='text-center text-[24px] xl:text-[16px] leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время&nbsp;<svg xmlns="http://www.w3.org/2000/svg" className='inline translate-y-[-5px]' width="35" height="30" viewBox="0 0 172 158" fill="none">
                                    <path d="M86 158C83.3445 157.997 80.7514 157.198 78.5581 155.708C46.0659 133.757 31.9965 118.706 24.2363 109.296C7.6987 89.2371 -0.218666 68.6436 0.0045909 46.3426C0.265058 20.7869 20.8667 0 45.9294 0C64.1539 0 76.7762 10.2165 84.1271 18.7255C84.36 18.9923 84.6477 19.2063 84.9708 19.3529C85.2939 19.4995 85.6449 19.5754 86 19.5754C86.3551 19.5754 86.7061 19.4995 87.0292 19.3529C87.3523 19.2063 87.64 18.9923 87.8729 18.7255C95.2238 10.2083 107.846 0 126.071 0C151.133 0 171.735 20.7869 171.995 46.3467C172.219 68.6518 164.293 89.2453 147.764 109.3C140.003 118.71 125.934 133.761 93.4419 155.712C91.2481 157.201 88.6551 157.998 86 158Z" fill="#FEC955" />
                                </svg></p>
                            </div>}
                        </div>
                    </div>
                    <form onSubmit={e => e.preventDefault()} className={stack(styles.form, `transition-all duration-700  ${isMockVisible || loading ? 'opacity-[0.2] filter blur-md' : ''}`)} action="#">

                        {inputsGroup.map(item => <FormInput key={item.id} {...item}></FormInput>)}
                        <Agreement className='mb-[50px] md:mb-[36px] col-span-2' isChecked={isAgree} error={isAgreeError} setIsChecked={setIsAgree} isSmall={false}></Agreement>
            
                        <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new', loading && 'disabled')}>Отправить
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default InstructionBooksOrder;