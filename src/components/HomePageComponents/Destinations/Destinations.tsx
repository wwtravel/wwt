import React from 'react'
import DestinationsCarousel from './DestinationsCarousel'
import { useTranslations } from 'next-intl'

import Image from 'next/image'

const Destinations = () => {

  const t = useTranslations("Destinations")

  return (
    <div className="mt-[11.5rem] relative pb-[6rem] px-[12rem]">
      <Image 
        src="/images/dotted-map-bg.png"
        alt='dotted-map'
        draggable={false}
        width={1358}
        height={658}
        className='absolute bottom-0 left-[2rem]'
      />
        <div className='w-full relative font-montserrat flex flex-col items-center'>
            <p className='text-[10rem] leading-[0.7] text-dark-gray/5 font-bold uppercase select-none'>{ t('lowOpacityTitle') }</p>
            <h2 className='absolute left-[50%] -translate-x-[50%] uppercase top-[50%] -translate-y-[50%] text-[2.5rem] font-bold text-dark-gray'>{ t('title') }</h2>
            <div className='h-[0.25rem] w-[6rem] bg-red mt-[1rem]'/>
        </div>

        <div className='mt-[4rem] px-[7.5rem]'>
          <DestinationsCarousel />
        </div>
    </div>
  )
}

export default Destinations