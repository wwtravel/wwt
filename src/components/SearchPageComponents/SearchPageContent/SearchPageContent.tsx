import { useTranslations } from 'next-intl'
import React from 'react'
import RoutesContainer from './RoutesContainer'

const SearchPageContent = () => {

  const t = useTranslations("RouteSearchPage")

  return (
    <div className='mt-[7.75rem] px-[1rem]'>
        <h1 className='text-center font-montserrat font-bold text-[2.5rem] uppercase'>{ t('title') }</h1>
        <div className='h-[4px] w-[6rem] mx-auto mt-[1.5rem] bg-red'/>

        <RoutesContainer />
    </div>
  )
}

export default SearchPageContent