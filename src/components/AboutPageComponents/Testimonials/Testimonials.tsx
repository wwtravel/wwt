import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import React from 'react'
import TestimonialsCarousel from './TestimonialsCarousel'

const Testimonials = () => {

  const t = useTranslations("AboutPage_Testimonials")

  return (
    <div className='mt-[6.75rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='mt-[5.375rem]'>
            <TestimonialsCarousel />
        </div>
    </div>
  )
}

export default Testimonials