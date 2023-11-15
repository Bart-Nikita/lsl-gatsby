import React, { ReactElement, ReactNode } from 'react'
import Loading from '../../../../loading/Loading'

export default function OrderBox({ children, isMockVisible, loading }: { loading: boolean, children: ReactNode | ReactElement, isMockVisible?: boolean }) {
  return (
    <div className='z-[5] min-h-[818px] h-full flex items-center md:min-h-0 overflow-hidden relative bg-white [box-shadow:0px_4px_10px_0px_rgba(0,_0,_0,_0.15)] rounded-[20px] px-[36px] pt-[78px] pb-[64px] xl:px-[34px] xl:pt-[68px] xl:pb-[80px] md:shadow-none md:rounded-none md:px-[0px] md:bg-transparent md:py-[0px] md:block '>
      <div className={`absolute top-0 left-0 right-0 bottom-0 z-[5]  duration-700 transition-all ${isMockVisible || loading  ? 'pointer-events-auto opacity-[1]' : 'pointer-events-none opacity-0'}`}>
        <div className='block mx-auto h-full w-full relative'>
        {loading &&  <div className='flex absolute animate-appear top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-start items-center '>
            <Loading isLoading={loading } className=''></Loading>
          </div>}
          {isMockVisible && <div className={'w-full animate-appear py-[32px] rounded-[12px] flex flex-col justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] xl:max-w-[400px]'}>
            <h3 className='text-center text-[28px] xl:text-[24px] leading-[1.4]  font-bold mb-[12px]'>Ваша заявка в&nbsp;работе.</h3>
            <p className='text-center text-[24px] xl:text-[16px] leading-[1.4]'>Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время&nbsp;<svg xmlns="http://www.w3.org/2000/svg" className='inline translate-y-[-5px]' width="35" height="30" viewBox="0 0 172 158" fill="none">
                <path d="M86 158C83.3445 157.997 80.7514 157.198 78.5581 155.708C46.0659 133.757 31.9965 118.706 24.2363 109.296C7.6987 89.2371 -0.218666 68.6436 0.0045909 46.3426C0.265058 20.7869 20.8667 0 45.9294 0C64.1539 0 76.7762 10.2165 84.1271 18.7255C84.36 18.9923 84.6477 19.2063 84.9708 19.3529C85.2939 19.4995 85.6449 19.5754 86 19.5754C86.3551 19.5754 86.7061 19.4995 87.0292 19.3529C87.3523 19.2063 87.64 18.9923 87.8729 18.7255C95.2238 10.2083 107.846 0 126.071 0C151.133 0 171.735 20.7869 171.995 46.3467C172.219 68.6518 164.293 89.2453 147.764 109.3C140.003 118.71 125.934 133.761 93.4419 155.712C91.2481 157.201 88.6551 157.998 86 158Z" fill="#FEC955" />
            </svg></p>
          </div>}
        </div>
      </div>
      {children}</div>
  )
}
