import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import React from 'react'
import ServiceSubSectionTitle from './ServiceSubSectionTitle'
import PassengerInfo from './PassengerInfo'
import ParcelInfo from './ParcelInfo'

const Services = () => {

  const t = useTranslations('Services')

  return (
    <div className='px-[1rem] mt-[2rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='mt-[4rem] flex justify-center'>
            <ServiceSubSectionTitle title={ t('subtitle1') } description={t('description1')}/>
        </div>

        <PassengerInfo />

        <div className='md:mt-[8rem] mt-[6.667rem] flex justify-center'>
            <ServiceSubSectionTitle title={ t('subtitle2') } description={t('description2')}/>
        </div>

        <ParcelInfo />
    </div>
  )
}

export default Services