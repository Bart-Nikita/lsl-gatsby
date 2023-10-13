import { useMutation } from '@apollo/client'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { EMAIL_TO, EMAIL_FROM, CONTACTS_MAIL_SUBJECT } from '../../../../../config'
import { SEND_MAIL } from '../../../../../gql/mutations/sendMail'
import { stack } from '../../../../../hooks/useClassName'
import { useInputState } from '../../../../../hooks/useInputState'
import OrderBox from '../OrderBox/OrderBox'
import OrderForm, { InputItem } from '../OrderForm/OrderForm'
import { useMock } from '../../../../../hooks/useMock'

export default function SecondSection(img: GatsbyImageProps) {
    
    const name = useInputState()
    const phone = useInputState()
    const address = useInputState()
    const sum = useInputState()
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
            input: address,
            id: 'address',
            placeholder: 'Россия, г. Москва, Кремлевский проезд, д. 1, кв. 1',
            label: 'Адрес для отправки'
        }]


    return (
        <OrderBox isMockVisible={isMockVisible}>
          <OrderForm isMockVisible={isMockVisible} goMock={goMock} inputsGroup={inputsGroup} certType='На руки' ></OrderForm>
            <div className='absolute top-[-5px] left-[-5px] right-[-5px] bottom-[-5px] [background:linear-gradient(270deg,_rgba(255,_255,_255,_0.80)_1.53%,_#FFF_40.77%)] z-[2] md:hidden'></div>
            <div className='absolute top-0 left-[200] right-[-50px] bottom-0 z-[1] md:hidden' ><GatsbyImage {...img}></GatsbyImage></div>
        </OrderBox>
    )
}
