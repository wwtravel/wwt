import React from 'react'
import DestinationsCarousel from './DestinationsCarousel'
import { useTranslations } from 'next-intl'

import Image from 'next/image'
import SectionTitle from '@/components/SharedComponents/SectionTitle'
import MobileDestinationsCarousel from './MobileDestinationsCarousel'

const Destinations = () => {

  const t = useTranslations("Destinations")

  return (
    <div className="bg-[#F1F8FD] lg:mt-[11.5rem] mt-[-1.333rem] max-lg:pt-[2.667rem] rounded-[0.667rem] overflow-hidden relative pb-[6rem]">
      <Image 
        src="/images/dotted-map-bg.png"
        alt='dotted-map'
        draggable={false}
        width={1358}
        height={658}
        objectPosition='left'
        objectFit='cover'
        className='absolute min-w-[84.875rem] bottom-0 md:left-[2rem] left-[-14rem]'
      />
      
        <SectionTitle lowOpacityTitle={t('lowOpacityTitle')} title={t('title')}/>

        <div className='mt-[4rem] max-lg:hidden'>
          <DestinationsCarousel />
        </div>

        <div className='lg:hidden mt-[2.667rem]'>
          <MobileDestinationsCarousel />
        </div>
    </div>
  )
}

export default Destinations