import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useCommonSection } from '../../../hooks/useCommonSection'
import { v4 } from 'uuid'

type AgreementProps = {
    isChecked: boolean
    setIsChecked: Dispatch<SetStateAction<boolean>>
    isSmall: boolean
    error: boolean
    className?: string
}

export default function Agreement({ isSmall, isChecked, setIsChecked, error, className }: AgreementProps) {

    const [footer] = useCommonSection('podval')

    const [id, setId] = useState<string>()

    useEffect(() => {
        setId(v4())
    }, [])
    return (
        <div className={className ? className : ''}>
            <input id={id} className='hidden' checked={isChecked} onChange={e => setIsChecked(e.target.checked)} type="checkbox" />
            <label className='flex gap-[12px] ' htmlFor={id}>
                <div className={`border-[2px] translate-y-[6px] md:translate-y-[3px] shrink-0 rounded-[5px] w-[30px] h-[30px] md:border-[1px] relative ${error ? 'border-red-500' : 'border-yellow-400'}`}>
                    <div className={`bg-yellow-400 rounded-[5px] w-[70%] h-[70%] transition-all absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ${!isChecked ? 'scale-0' : ''}`}></div>
                </div>
                {!isSmall && <p className='text-[20px] leading-[1.4] md:text-[16px]'>Я&nbsp;даю свое согласие на&nbsp;обработку моих персональных данных, в&nbsp;соответствии с&nbsp;Федеральным законом от&nbsp;27.07.2006 &#8470;&nbsp;152&#8209;фз &laquo;О&nbsp;персональных данных&raquo; и&nbsp;<a className='underline transition-all hover:opacity-70' target='_blank' href={footer?.footer?.footerPolitikaKonfidenczialnosti?.publicUrl || ''}>политикой конфиденциальности</a>, на&nbsp;условиях и&nbsp;для целей определенных в&nbsp;Согласии на&nbsp;обработку персональных данных</p>}
                {isSmall && <p className='text-[16px] leading-[1.4] '>Я&nbsp;согласен на&nbsp;получение информационной и&nbsp;рекламной рассылки</p>}
            </label>
        </div>
    )
}
