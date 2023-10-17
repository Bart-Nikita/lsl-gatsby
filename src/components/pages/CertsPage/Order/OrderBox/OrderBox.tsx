import React, { ReactElement, ReactNode } from 'react'
import Loading from '../../../../loading/Loading'

export default function OrderBox({ children, isMockVisible, loading }: { loading: boolean, children: ReactNode | ReactElement, isMockVisible?: boolean }) {
  return (
    <div className='z-[5] min-h-[818px] h-full flex items-center md:min-h-0 overflow-hidden relative bg-white [box-shadow:0px_4px_10px_0px_rgba(0,_0,_0,_0.15)] rounded-b-[20px] px-[36px] pt-[78px] pb-[64px] xl:px-[34px] xl:pt-[68px] xl:pb-[80px] md:shadow-none md:rounded-none md:px-[0px] md:bg-transparent md:py-[0px] md:block '>
      <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5]  duration-700 transition-all ${isMockVisible || loading  ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
        <div className='block mx-auto h-full w-full relative'>
        {loading &&  <div className='flex absolute animate-appear top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-start items-center '>
            <Loading isLoading={loading } className=''></Loading>
          </div>}
          {isMockVisible && <div className={'w-full animate-appear py-[32px] rounded-[12px] flex flex-col justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] xl:max-w-[400px]'}>
            <h3 className='text-center text-[28px] xl:text-[24px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
            <p className='text-center text-[24px] xl:text-[16px] leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время</p>
          </div>}
        </div>
      </div>
      {children}</div>
  )
}
