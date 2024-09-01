'use client'

import { SelectedRoutes } from '@/app/[locale]/route-search/PageContent'
import { Travel } from '@/types/routeType';
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import ReturnRoutesContainer from './ReturnRoutesContainer';

interface SearchReturnContentProps{
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
  seletcedRoute : Travel;
}

const SearchReturnContent: React.FC<SearchReturnContentProps> = ({ setSelectedRoutes, seletcedRoute }) => {

  const t = useTranslations("RouteSearchPage")
  const date_t = useTranslations("RouteSearchPage_Date")

  const searchParams = useSearchParams()

  const parseDate = (dateString : string) => {
    const date = new Date(dateString.replace(" ", "T"));

    const dayOfWeek = date.getDay();

    const dayOfMonth = date.getDate();

    const month = date.getMonth() + 1;

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeString = `${hours}:${minutes}`;

    return { dayOfWeek, month, timeString, dayOfMonth };
  }

  const getMonthText = ( month : number ) => {
    switch(month){
        case 1 : return date_t('jan')
        case 2 : return date_t('feb')
        case 3 : return date_t('mar')
        case 4 : return date_t('apr')
        case 5 : return date_t('may')
        case 6 : return date_t('jun')
        case 7 : return date_t('jul')
        case 8 : return date_t('aug')
        case 9 : return date_t('sept')
        case 10 : return date_t('oct')
        case 11 : return date_t('nov')
        case 12 : return date_t('dec')
    }
  }

  return (
    <div className='lg:mt-[7.75rem] mt-[4rem] px-[1rem]'>
        <h1 className='text-center font-montserrat font-bold md:text-[2.5rem] text-[2rem] uppercase'>
            { t('return-title') } &nbsp;
            
          <span className='text-red'>{ parseDate(searchParams.get('arrdate')!).dayOfMonth } { getMonthText(parseDate(searchParams.get('arrdate')!).month) }</span>
            
        </h1>
        <div className='h-[4px] w-[6rem] mx-auto mt-[1.5rem] bg-red'/>

        <ReturnRoutesContainer seletcedRoute={seletcedRoute} setSelectedRoutes={setSelectedRoutes}/>
    </div>
  )
}

export default SearchReturnContent