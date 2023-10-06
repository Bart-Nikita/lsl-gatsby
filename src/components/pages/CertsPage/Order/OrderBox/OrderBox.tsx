import React, { ReactElement, ReactNode } from 'react'

export default function OrderBox({children}: {children: ReactNode | ReactElement}) {
  return (
    <div className='z-[5] min-h-[818px] h-full flex items-center md:min-h-0 overflow-hidden relative bg-white [box-shadow:0px_4px_10px_0px_rgba(0,_0,_0,_0.15)] rounded-b-[20px] px-[36px] pt-[78px] pb-[64px] xl:px-[34px] xl:pt-[68px] xl:pb-[80px] md:shadow-none md:rounded-none md:px-[0px] md:bg-transparent md:py-[0px] md:block '>{children}</div>
  )
}
