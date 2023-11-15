import React from 'react'
import OrderBox from '../OrderBox/OrderBox'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'

export default function ThirdSection(img: GatsbyImageProps & { whatsappLink: string, email: string }) {
    return (
        <OrderBox loading={false}>
                <div className=' max-w-[662px] mx-auto z-[3] xl:max-w-[54%] md:max-w-none'>
                    <p className='text-[32px] font-bold leading-[1.4] xl:text-[24px] mb-[40px] md:mb-[20px]'>
                        Чтобы заказать подарочный сертификат, напишите нам в&nbsp;<a target="_blank" className='link text-[#FEC955] underline' href={img.whatsappLink}>WhatsApp</a> или на&nbsp;почту <a target="_blank" className='link text-[#FEC955] underline' href={"mailto:" + img.email}>{img.email}</a>
                    </p>
                    <p className='text-[22px] leading-[1.4] max-w-[400px] xl:text-[18px]'>
                        Если не&nbsp;получим ответ, то&nbsp;перезвоним по&nbsp;указанному номеру телефона
                    </p>
                </div>
            <div className='absolute top-0 left-0 right-0 bottom-0 [background:radial-gradient(96.53%_58.97%_at_100%_100%,_rgba(255,_255,_255,_0.50)_0%,_#FFF_100%)] z-[2] md:hidden'></div>
            <div className='absolute top-0 left-[0px] right-[0px] bottom-[-150px] z-[1] md:hidden' ><GatsbyImage {...img}></GatsbyImage></div>
        </OrderBox>
    )
}
