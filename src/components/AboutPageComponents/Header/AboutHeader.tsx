import { useTranslations } from 'next-intl'
import RedButton from '../../SharedComponents/RedButton'
import RouteSearch from '@/components/SharedComponents/RouteSearch'
import MobileRouteSearch from '@/components/SharedComponents/MobileRouteSearch'

const AboutHeader = () => {

  const t = useTranslations("AboutHeader")

  return (
    <div className="relative lg:h-[calc(100dvh-14.25rem)] max-lg:pb-[2.667rem] bg-[url('/images/aboutPage/about-header-bg.webp')] bg-center bg-cover lg:px-[12rem] px-[1rem] lg:pt-[30vh] pt-[13.75rem]">

        <h1 className='md:text-[6rem] text-[2.70rem] font-bold font-montserrat text-white uppercase'><span className='text-red'>{t('aboutWord1')}</span> { t('aboutWord2') }</h1>
        <div className='md:text-[1.5rem] text-[1.333rem] font-[600] text-white max-w-[54.1875rem]'>
            <p>{ t('headerDesc') }</p>
        </div>

        <div className='max-lg:hidden'>
          <RouteSearch />
        </div>

        <div className='lg:hidden'>
          <MobileRouteSearch />
        </div>

    </div>
  )
}

export default AboutHeader