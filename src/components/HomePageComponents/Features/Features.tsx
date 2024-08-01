import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import FeatureCard from './FeatureCard'
import FeatureCeckText from './FeatureCeckText'
import RedButton from '@/components/SharedComponents/RedButton'

const Features = () => {

  const t = useTranslations("Features")

  return (
    <div className='mt-[8rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='mt-[4rem] grid grid-cols-[1fr,1.5fr] gap-x-[4rem]'>
            <Image 
                src="/images/features-image.png"
                alt='features'
                draggable={false}
                width={6000}
                height={4000}
                className='rounded-[1rem] h-full object-cover object-right'

            />

            <div className='w-full'>
                <div className='grid grid-cols-3 gap-x-[1rem]'>
                    <FeatureCard title='99%' subtitle={ t('featureCard1') }/>
                    <FeatureCard title='5.000+' subtitle={ t('featureCard2') }/>
                    <FeatureCard title='13' subtitle={ t('featureCard3') }/>
                </div>

                <p className='text-dark-gray text-[1.5rem] font-bold font-open-sans mt-[3rem]' >{ t('featuresBoldText') }</p>

                <div className='flex flex-col gap-[1rem] mt-[1.5rem]'>
                    <FeatureCeckText title={ t('featuresCheckText_1_Title') } descrption={ t('featuresCheckText_1_Description') }/>
                    <FeatureCeckText title={ t('featuresCheckText_2_Title') } descrption={ t('featuresCheckText_2_Description') }/>
                    <FeatureCeckText title={ t('featuresCheckText_3_Title') } descrption={ t('featuresCheckText_3_Description') }/>
                </div>

                <div className='mt-[3rem]'>
                    <RedButton text={ t('featuresBtn') } />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features