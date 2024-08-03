
import { useTranslations } from 'next-intl'
import RedButton from '../../SharedComponents/RedButton'
import RouteSearch from './RouteSearch'
import MobileRouteSearch from './MobileRouteSearch'

const Header = () => {

  const t = useTranslations("Header")

  return (
    <div className="relative lg:h-[calc(100dvh-4.75rem)] max-lg:pb-[2.667rem] bg-[url('/images/header_bg.png')] bg-bottom bg-cover lg:px-[12rem] px-[1rem] lg:pt-[30vh] pt-[13.75rem]">
        <h1 className='md:text-[6rem] text-[2.70rem] font-bold font-montserrat text-white uppercase'><span className='text-red'>{t('ticketsWord1')}</span> { t('ticketsWord2') }</h1>
        <div className='md:text-[2rem] text-[1.35rem] font-bold text-white uppercase flex md:gap-[1rem] gap-[0.5rem]  items-center'>
          <h3>{t('country1')}</h3>
          <div className='w-[0.125rem] md:h-[3rem] h-[2rem] bg-white'/>
          <h3>{t('country2')}</h3>
          <div className='w-[0.125rem] md:h-[3rem] h-[2rem] bg-white'/>
          <h3>{t('country3')}</h3>
          <div className='w-[0.125rem] md:h-[3rem] h-[2rem] bg-white'/>
          <h3>{t('country4')}</h3>
        </div>

        <div className='md:mt-[3rem] mt-[2rem]'>
          <RedButton text={t('headerBtn')}/>
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

export default Header