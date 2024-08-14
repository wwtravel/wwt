import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import TestimonialsCarousel from './TestimonialsCarousel'
import MobileTestimonialsCarousel from './MobileTestimonialsCarousel'

const Testimonials = () => {

  const t = useTranslations("AboutPage_Testimonials")

  return (
    <div className='mt-[6.75rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='mt-[5.375rem]'>
          <div className='max-lg:hidden'>
            <TestimonialsCarousel />
          </div>
          <div className='lg:hidden'>
            <MobileTestimonialsCarousel />
          </div>
        </div>
    </div>
  )
}

export default Testimonials