import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import FeatureCard from './FeatureCard'
import FeatureCeckText from './FeatureCeckText'
import RedButton from '@/components/SharedComponents/RedButton'
import { Link } from '@/navigation'

const Features = () => {

  const t = useTranslations("Features")

  return (
    <div className='mt-[8rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='max-w-[85rem] w-full mx-auto px-[1rem] mt-[4rem] grid lg:grid-cols-[1fr,1.5fr] grid-cols-1 lg:gap-x-[4rem] max-lg:gap-y-[2rem]'>
            <Image 
                src="/images/features-image.png"
                alt='features'
                draggable={false}
                width={1500}
                height={1000}
                className='rounded-[1rem] h-full object-cover object-right'
                priority

            />

            <div className='w-full'>
                <div className='grid md:grid-cols-3 grid-cols-1 md:gap-x-[1rem] max-md:gap-y-[0.667rem]'>
                    <FeatureCard title='99%' subtitle={ t('featureCard1') }/>
                    <FeatureCard title='5.000+' subtitle={ t('featureCard2') }/>
                    <FeatureCard title='13' subtitle={ t('featureCard3') }/>
                </div>

                <p className='text-dark-gray md:text-[1.5rem] text-[1.333rem] font-bold font-open-sans mt-[3rem]' >{ t('featuresBoldText') }</p>

                <div className='flex flex-col gap-[1rem] mt-[1.5rem]'>
                    <FeatureCeckText title={ t('featuresCheckText_1_Title') } descrption={ t('featuresCheckText_1_Description') }/>
                    <FeatureCeckText title={ t('featuresCheckText_2_Title') } descrption={ t('featuresCheckText_2_Description') }/>
                    <FeatureCeckText title={ t('featuresCheckText_3_Title') } descrption={ t('featuresCheckText_3_Description') }/>
                </div>

                <Link href="/about" >
                    <div className='md:mt-[3rem] mt-[2rem]'>
                        <RedButton text={ t('featuresBtn') } />
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Features