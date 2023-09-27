import React from 'react'
import { stack } from '../../hooks/useClassName'

export default function ArrowDown({className}: {className: string}) {
    return (
        <svg className={stack(className)} xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
            <path d="M17 1L9 9L0.999999 0.999999" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
