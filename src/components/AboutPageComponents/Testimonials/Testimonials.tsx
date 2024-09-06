import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'

import dynamic from 'next/dynamic';


// Dynamically import ItineraryMap
const TestimonialsCarousel = dynamic(() => import('./TestimonialsCarousel'), {
  ssr: false,  // Disable server-side rendering for this component
  loading: () => <p>Loading map...</p>  // Optional: Loading placeholder while the map is being fetched
});

const MobileTestimonialsCarousel = dynamic(() => import('./MobileTestimonialsCarousel'), {
  ssr: false,  // Disable server-side rendering for this component
  loading: () => <p>Loading map...</p>  // Optional: Loading placeholder while the map is being fetched
});

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