import SectionTitleWhite from '@/components/SharedComponents/SectionTitleWhite'
import { useTranslations } from 'next-intl'
import React from 'react'
import FeatureCard from './FeatureCard'

const AboutFeatures = () => {

  const t = useTranslations("AboutFeatures")

  return (
    <div className='bg-red pt-[4.75rem] pb-[4.5rem] mt-[8rem] px-[1rem]'>
        <SectionTitleWhite lowOpacityTitle={t('lowOpacityTitle')} title={ t('title') }/>

        <div className='mt-[4rem] grid md:grid-cols-3 grid-cols-1 gap-[1.5rem] max-w-[79.5rem] mx-auto'>
          <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-shield.svg' title={ t('featureCard_1_Title') } description={ t('featureCard_1_Description') }/>
          <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-bag.svg' title={ t('featureCard_2_Title') } description={ t('featureCard_2_Description') }/>
          <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-price-label.svg' title={ t('featureCard_3_Title') } description={ t('featureCard_3_Description') }/>
          <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-calendar.svg' title={ t('featureCard_4_Title') } description={ t('featureCard_4_Description') }/>

          <div className='max-md:hidden'>
            <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-bulb.svg' title={ t('featureCard_5_Title') } description={ t('featureCard_5_Description') }/>
          </div>

          <div className='max-md:hidden'>
            <FeatureCard imageUrl='/icons/about-page-icons/about-features-icons/icon-sms.svg' title={ t('featureCard_6_Title') } description={ t('featureCard_6_Description') }/>
          </div>
        </div>
    </div>
  )
}

export default AboutFeatures