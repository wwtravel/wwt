'use client'

import { useTranslations } from 'next-intl'
import React from 'react'
import ParcelFormSelect from './ParcelFormSelect'
import RedButton from '@/components/SharedComponents/RedButton';

const CITIES = [
    {
      value: "new_york",
      label: "New York",
    },
    {
      value: "paris",
      label: "Paris",
    },
    {
      value: "tokyo",
      label: "Tokyo",
    },
    {
      value: "sydney",
      label: "Sydney",
    },
    {
      value: "london",
      label: "London",
    },
    {
      value: "berlin",
      label: "Berlin",
    },
    {
      value: "dubai",
      label: "Dubai",
    },
    {
      value: "san_francisco",
      label: "San Francisco",
    },
  ];

const ParcelForm = () => {

  const t = useTranslations("Services")

  return (
    <div className='mt-[2rem] grid sm:grid-cols-2 grid-cols-1 gap-x-[1.5rem] sm:gap-y-[1rem] gap-y-[0.667rem] font-open-sans text-dark-gray text-[1rem] font-[400]'>
        <input required className='w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75' type="text" placeholder={ t('nameInputPlaceholder') } maxLength={50}/>
        <input required className='w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75' type="text" placeholder={ t('phoneInputPlaceholder') } maxLength={20}/>
        <ParcelFormSelect options={CITIES} placeholder={ t('selectBox1Placeholder') } onChange={() => {}}/>
        <ParcelFormSelect options={CITIES} placeholder={ t('selectBox2Placeholder') } onChange={() => {}}/>
        
        <div className='max-sm:hidden'>
          <RedButton text={t('send')}/>
        </div>

        <button className='sm:hidden h-[4.667rem] bg-red rounded-[0.5rem] px-[1.5rem] flex items-center justify-center text-[1.333rem] font-bold text-white'>
          {t('send')}
        </button>
        
    </div>
  )
}

export default ParcelForm