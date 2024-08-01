import React from 'react'
import DestinationsCarousel from './DestinationsCarousel'
import { useTranslations } from 'next-intl'

import Image from 'next/image'
import SectionTitle from '@/components/SharedComponents/SectionTitle'

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
      
        <SectionTitle lowOpacityTitle={t('lowOpacityTitle')} title={t('title')}/>

        <div className='mt-[4rem] px-[7.5rem]'>
          <DestinationsCarousel />
        </div>
    </div>
  )
}

export default Destinations