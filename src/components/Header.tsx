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
        <div className='max-w-[1536px] mx-auto xl:ps-[115px] lg:ps-[57px] lg:pe-0 md:px-[100px] px-5'>
            {LEAD_CARD_DATA_LIST.slice(0, 1).map((obj: LeadCardData, i: number) => (
                <div key={i} className='flex max-lg:flex-wrap xl:gap-2 gap-4 items-center justify-between max-lg:py-10
                '>
                    <div className='max-lg:mx-auto'>
                        <h1 className='ff_sohne font-bold custom-xl:!text-[55px] lg:text-[50px] text-[35px] text-black leading-[100%] max-w-[551px] uppercase max-lg:text-center'>{obj.heading}</h1>
                        <p className='ff_maison font-normal text-base leading-[160%] max-lg:text-center'>{obj.subheading}</p>
                        <button className='cursor-pointer font-semibold md:text-base text-sm leading-[20px] text-black pt-9 max-lg:mx-auto max-lg:text-center max-lg:flex '>Read More</button>
                    </div>

                    <div className='max-lg:pt-5 max-lg:mx-auto'>
                        <Image width={800} height={800} className='w-full h-[800px] object-cover' src={obj.girlImage} alt='mask-girl' />
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Header