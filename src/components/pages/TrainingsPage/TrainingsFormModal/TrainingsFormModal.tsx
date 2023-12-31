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
import { useSendMailArr } from '../../../../hooks/useSendMailArr';
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

const FormInput = (item: InputItem) => {



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
    const { trainingModalData, setIsTrainingFormModalOpen, trainingsPage, emails } = useGlobalContext()
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

    const { sendMail, loading } = useSendMail()

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

        const inputsGroup = isOrganisation ? secondInputsGroup : firstInputsGroup
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
            sendMail(emailBody, TRAINING_MAIL_SUBJECT, () => {
                goMock()
                nullify()
            })
        }
    }


    return (
        <div className={stack(styles.container, !isBottomVisible && styles.light)}>
            <dialog onClick={e => e.stopPropagation()}
                className={stack(styles.body)}>
                <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5] bg-[#FFF] bg-opacity-[0.7] backdrop-blur-md duration-700 transition-all ${isMockVisible || loading ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
                    <div className='flex  h-full justify-center items-center relative '>
                        <Loading isLoading={loading} className=''></Loading>
                        {isMockVisible && <div className={`w-full px-[42px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[32px] animate-appear rounded-[12px] flex flex-col justify-center duration-700 transiiton-all ${loading ? 'opacity-0 hidden' : ''}`}>
                            <h3 className='text-center text-[28px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
                            <p className='text-center text-[24px] relative leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время&nbsp;<svg xmlns="http://www.w3.org/2000/svg" className='inline translate-y-[-5px]' width="35" height="30" viewBox="0 0 172 158" fill="none">
                                <path d="M86 158C83.3445 157.997 80.7514 157.198 78.5581 155.708C46.0659 133.757 31.9965 118.706 24.2363 109.296C7.6987 89.2371 -0.218666 68.6436 0.0045909 46.3426C0.265058 20.7869 20.8667 0 45.9294 0C64.1539 0 76.7762 10.2165 84.1271 18.7255C84.36 18.9923 84.6477 19.2063 84.9708 19.3529C85.2939 19.4995 85.6449 19.5754 86 19.5754C86.3551 19.5754 86.7061 19.4995 87.0292 19.3529C87.3523 19.2063 87.64 18.9923 87.8729 18.7255C95.2238 10.2083 107.846 0 126.071 0C151.133 0 171.735 20.7869 171.995 46.3467C172.219 68.6518 164.293 89.2453 147.764 109.3C140.003 118.71 125.934 133.761 93.4419 155.712C91.2481 157.201 88.6551 157.998 86 158Z" fill="#FEC955" />
                            </svg></p>
                        </div>}
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
                    <Agreement className='mb-[50px] md:mb-[36px] col-span-2' isChecked={isAgree} error={isAgreeError} setIsChecked={setIsAgree} isSmall={false}></Agreement>
                    <button type={"submit"} onClick={onSubmit} className={stack(styles.button, 'button-secondary-new', loading && 'disabled')}>Оформить заказ
                    </button>
                </form>
  
            </dialog>
            <InView onChange={value => setIsBottomVisible(value)}></InView>

        </div>
    );
};

export default TrainingsFormModal;