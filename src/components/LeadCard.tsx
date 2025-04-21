"use client"
import React, { useState } from 'react'
import { LEAD_CARD_DATA_LIST } from '@/utils/helper';
import Link from 'next/link';
interface LeadCardData {
    title: string
    description: string
    bgImage: string
}

const LeadCard: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState<number>(3)

    const allCardsShown = visibleCount >= LEAD_CARD_DATA_LIST.length

    const handleLoadMore = () => {
        if (allCardsShown) {
            setVisibleCount(3) // collapse
        } else {
            setVisibleCount((prev) => prev + 3) // load more
        }
    }

    const visibleCards: LeadCardData[] = LEAD_CARD_DATA_LIST.slice(0, visibleCount)
    return (
        <div className='pt-20'>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[60px] gap-6 justify-center'>
                {visibleCards.map((obj: LeadCardData, i: number) => (
                    <div key={i} className='overflow-hidden'>
                        <Link href={`/card/${obj ? obj.title?.toLowerCase()?.replace(/ /g, '-') : '404'}`} className={`${obj.bgImage} bg-full !bg-no-repeat w-full lg:max-w-[440px] 2xl:max-w-full min-h-[551px] relative xl:p-7 p-5 flex hover:scale-110 overflow-hidden transition-all ease-linear duration-300`}>
                            <div className='flex items-end mx-auto'>
                                <div className=' md:min-h-[320px] min-h-[250px] max-w-[382px] w-full bg-white rounded-3xl xl:p-[35px_28px_29px_28px] p-4 flex flex-col justify-between'>
                                    <div>
                                        <p className='ff_maison font-semibold text-base leading-[20px] text-[#00AFB5] uppercase md:pb-4 pb-3'>lead-gen</p>
                                        <h2 className='font-light md:text-[30px] text-lg leading-[100%] text-black md:pb-4 pb-2'>{obj.title}</h2>
                                        <p className='font-normal md:text-[15px]  leading-[20px] md:text-xl text-base text-black'>{obj.description}</p>
                                    </div>
                                    <div><button className='cursor-pointer font-semibold md:text-base text-sm leading-[20px] text-black'>Read More</button></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
            <button
                onClick={handleLoadMore}
                className='bg-blue-500 rounded-lg text-white text-base font-normal py-4 px-6 flex mx-auto mt-10'
            >
                {allCardsShown ? 'Show Less' : 'Show More'}
            </button>



        </div>
    )
}

export default LeadCard