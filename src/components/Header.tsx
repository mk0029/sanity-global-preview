import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='flex max-lg:flex-wrap items-center justify-between max-lg:py-10'>

            <div className='max-lg:mx-auto'>
                <h1 className='ff_sohne font-bold lg:text-[70px] text-[40px] text-black leading-[100%] max-w-[551px] uppercase max-lg:text-center'>Marketing to Contractors and Installers:The Ultimate Guide</h1>
                <p className='ff_maison font-normal text-base leading-[160%] max-lg:text-center'>Understanding the process and maximize the opportunities</p>
            </div>

            <div className='max-lg:pt-5 max-lg:mx-auto'>
                <Image width={800} height={800} className='w-full' src="/assets/images/png/mask-girl.png" alt='mask-girl' />
            </div>
        </div>
    )
}

export default Header