import { LEAD_CARD_DATA_LIST } from '@/utils/helper'
import Image from 'next/image'
import React from 'react'
interface LeadCardData {
    heading: string
    subheading: string
    girlImage: string
}


const Header: React.FC = () => {
    return (
        <div className='max-w-[1536px] mx-auto'>
            {LEAD_CARD_DATA_LIST.slice(0, 1).map((obj: LeadCardData, i: number) => (
                <div key={i} className='flex max-lg:flex-wrap gap-2 items-center justify-between max-lg:py-10
                '>
                    <div className='max-lg:mx-auto'>
                        <h1 className='ff_sohne font-bold custom-xl:!text-[70px] lg:text-[50px] text-[40px] text-black leading-[100%] max-w-[551px] uppercase max-lg:text-center'>{obj.heading}</h1>
                        <p className='ff_maison font-normal text-base leading-[160%] max-lg:text-center'>{obj.subheading}</p>
                        <button className='font-semibold md:text-base text-sm leading-[20px] text-black pt-9 max-lg:mx-auto max-lg:text-center max-lg:flex '>Read More</button>
                    </div>

                    <div className='max-lg:pt-5 max-lg:mx-auto'>
                        <Image width={800} height={800} className='w-full h-[800px]' src={obj.girlImage} alt='mask-girl' />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Header