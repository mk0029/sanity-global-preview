"use client"
import { LEAD_CARD_DATA_LIST } from '@/utils/helper'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
interface LeadCardData {
    heading: string
    subheading: string
    userImage: string
    userName: string
    date: string
    image: string
    title: string
    description: string
    briefInfo: string[]
}
const LeadDetail: React.FC = () => {
    const path = usePathname();
    const detail = path.replace(/\/card\//g, '');
    const cardData: LeadCardData[] = LEAD_CARD_DATA_LIST?.filter((obj: LeadCardData) =>
        obj.title?.toLowerCase()?.replace(/ /g, '-') === detail
    )
    return (
        <div className='py-20'>
            {cardData.map((obj, i) => (
                <div key={i} >
                    <div className='container mx-auto px-3'>
                        <h1 className='ff_sohne font-bold lg:text-[80px] sm:text-[50px] text-4xl leading-[100%] text-center mx-auto text-black '>{obj.heading}</h1>
                        <p className='font-normal text-base  leading-[150%] text-black text-center pt-3 max-w-[400px] mx-auto lg:pb-10 pb-6'>{obj.subheading}</p>
                        <div className='flex items-center gap-3 justify-center pb-12'>
                            <Image width={41} height={41} className='size-10 max-w-10 rounded-full object-cover' src={obj.userImage} alt='userimage' />
                            <div className='flex items-center gap-2'>
                                <p className='font-normal text-xs leading-160% text-[#4DBC15]'>{obj.userName} </p>
                                <p className='font-normal text-xs leading-160% text-[#646464] h-fit'>.</p>
                                <p className='font-normal text-xs leading-160% text-[#646464]'> {obj.date}</p>
                            </div>
                        </div>
                        <Image width={1100} height={630} src={obj.image} sizes='100vw' alt='img' className='mx-auto lg:h-[630px] object-cover object-top' />
                        <div className='md:pt-20 pt-10 flex flex-col gap-3'>
                            <p className='text-center font-bold text-3xl'>{obj.title}</p>
                            <p className='text-center font-normal text-lg max-w-[300px] mx-auto'>{obj.description}</p>
                        </div>
                        {obj.briefInfo.map((item, index) => (
                            <div key={index}>
                                <p className='max-w-[500px] mx-auto pt-3'>{item}</p>
                            </div>
                        ))}
                    </div>

                </div>
            ))
            }
        </div >
    )
}

export default LeadDetail