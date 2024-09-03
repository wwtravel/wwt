'use client'

import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const CheckoutSuccess = () => {

  const t = useTranslations("RouteSearchPage_CheckoutSuccess")

  const [mouseHover, setMouseHover] = useState(false)

  return (
    <div className='w-full pt-[14rem] px-[1rem]'>
      <div className='max-w-[84.25rem] w-full mx-auto h-[40.875rem] bg-[url(/images/dotted-map-bg.png)] bg-cover bg-center flex items-center'>
        <div className='max-w-[32rem] w-full mx-auto bg-light-white border border-gray/25 rounded-[1rem] shadow-custom py-[4rem] lg:px-[3rem] px-[2rem]'>
          <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[1]'>{ t('title') }</h3>
          <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
          <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('msg1') }</p>
          <p className='text-dark-gray font-open-sans font-bold text-[1.125rem] text-center mt-[2rem]'>{ t('msg2') }</p>
          <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[2rem]'>{ t('msg3') }</p>

          <Link href="/">
            <button className='w-full mt-[2rem] h-[3.5rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] text-light-white font-open-sans font-bold text-[1.125rem]'>
                { t('btn-text') }
            </button>
          </Link>

          <div className='flex flex-wrap gap-[0.25rem] mt-[1rem] justify-center'>
            <p className='text-gray font-[400] lg:text-[1rem] text-[1.125rem] font-open-sans'>{ t('question') }</p>

            <Link href="/contacts">
                <div className='font-open-sans text-gray lg:text-[1rem] text-[1.125rem] font-[400] text-center cursor-pointer'>
                    <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
                        <span>{ t('link') }</span>
                        <motion.div
                            className="absolute bottom-[7%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: mouseHover ? [0, 1] : 1 }}
                            transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
                        />
                    </span>
                </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess