'use client'


import { useTranslations } from 'next-intl'
import RouteSearch from '@/components/SharedComponents/RouteSearch'
import MobileRouteSearch from '@/components/SharedComponents/MobileRouteSearch'

const Header = () => {

  const t = useTranslations("Header")

  return (
    <div className="relative lg:h-[24.75rem] max-lg:pb-[2.667rem] bg-[url('/images/header_bg.png')] bg-center bg-cover lg:px-[12rem] px-[1rem] lg:pt-[30vh] pt-[13.75rem]">

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