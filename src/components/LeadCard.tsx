"use client"
import React from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/autoplay';
import { LEAD_CARD_DATA_LIST } from '@/utils/helper';
import Link from 'next/link';

const LeadCard = () => {

    return (
        <div className='pt-20'>
            <Swiper modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={60}
                loop={true}
                // autoplay={{
                //     delay: 0,
                //     disableOnInteraction: false,
                // }}
                speed={3000}
                allowTouchMove={true}
                breakpoints={
                    {
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 60

                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,

                        },
                        557: {
                            slidesPerView: 2,
                            spaceBetween: 24,

                        },
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },

                    }
                }>
                {LEAD_CARD_DATA_LIST.map((obj, i) => (
                    <SwiperSlide key={i}>
                        <Link href={`/card/${obj ? obj.title?.toLowerCase()?.replace(/ /g, '-') : '404'}`} className={`${obj.bgImage} bg-full !bg-no-repeat w-full max-w-[440px] min-h-[551px] relative xl:p-7 p-5 flex`}>
                            <div className='flex items-end'>
                                <div className=' min-h-[320px] max-w-[382px] w-full bg-white rounded-3xl xl:p-[35px_28px_29px_28px] p-4 flex flex-col justify-between'>
                                    <div>
                                        <p className='ff_maison font-semibold text-base leading-[20px] text-[#00AFB5] uppercase pb-4'>lead-gen</p>
                                        <h2 className='font-light text-[30px] leading-[100%] text-black pb-4'>{obj.title}</h2>
                                        <p className='font-normal text-[15px]  leading-[20px] text-xl text-black'>{obj.description}</p>
                                    </div>
                                    <div><button className='font-semibold text-base leading-[20px] text-black'>Read More</button></div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}

export default LeadCard