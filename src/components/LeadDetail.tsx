"use client"
import { LEAD_CARD_DATA_LIST } from '@/utils/helper'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

const LeadDetail = () => {
    const path = usePathname();
    const detail = path.replace(/\/card\//g, '');
    const cardData = LEAD_CARD_DATA_LIST?.filter(obj =>
        obj.title?.toLowerCase()?.replace(/ /g, '-') === detail
    )
    return (
        <div className='py-40'>
            {cardData.map((obj, i) => (
                <div key={i} >
                    <div className='container mx-auto'>
                        <Image width={1100} height={630} src={obj.image} alt='img' className='mx-auto h-[630px] object-cover object-top'/>
                        <p className='text-center font-bold text-3xl'>{obj.title}</p>
                        <p className='text-center font-normal text-lg'>{obj.description}</p>
                    </div>

                </div>
            ))
            }
        </div >
    )
}

export default LeadDetail