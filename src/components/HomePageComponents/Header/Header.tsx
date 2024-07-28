
import { useTranslations } from 'next-intl'
import RedButton from '../../SharedComponents/RedButton'
import RouteSearch from './RouteSearch'

const Header = () => {

  const t = useTranslations("Header")

  return (
    <div className="relative h-[calc(100dvh-4.75rem)] bg-[url('/images/header_bg.png')] bg-bottom bg-cover px-[12rem] pt-[21.25rem]">
        <h1 className='text-[6rem] font-bold font-montserrat text-white uppercase'><span className='text-red'>{t('ticketsWord1')}</span> { t('ticketsWord2') }</h1>
        <div className='text-[2rem] font-bold text-white uppercase flex gap-[1rem]  items-center'>
          <h3>{t('country1')}</h3>
          <div className='w-[0.125rem] h-[3rem] bg-white'/>
          <h3>{t('country2')}</h3>
          <div className='w-[0.125rem] h-[3rem] bg-white'/>
          <h3>{t('country3')}</h3>
          <div className='w-[0.125rem] h-[3rem] bg-white'/>
          <h3>{t('country4')}</h3>
        </div>

        <div className='mt-[3rem]'>
          <RedButton text={t('headerBtn')}/>
        </div>

        <RouteSearch />

    </div>
  )
}

export default Header