'use client'

import { useTranslations } from 'next-intl';
import ComboBox from './ComboBox'
import DatePicker from './DatePicker';

import { useState } from 'react';

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

const MobileRouteSearch = () => {

    const t = useTranslations("Header")

    const [departureCity, setDepartureCity] = useState('')
    const [arrivalCity, setArrivalCity] = useState('')

  return (
    <div className='flex flex-col gap-[0.667rem] mt-[5.333rem]'>
        <ComboBox 
          options={CITIES}
          placeholder={t('combobox1placeholder')}
          value={departureCity}
          onChange={setDepartureCity}
        />

        <ComboBox 
          options={CITIES}
          placeholder={t('combobox2placeholder')}
          value={arrivalCity}
          onChange={setArrivalCity}
        />

        <DatePicker placeholder={t('calendar1placeholder')}/>
        <DatePicker placeholder={t('calendar2placeholder')}/>

        <button className=' h-[4.667rem] bg-red rounded-[0.5rem] px-[1.5rem] flex items-center justify-center text-[1.5rem] font-bold text-white'>
            <img className='size-[1.5rem] mr-[0.5rem]' src='/icons/icon-search.svg' alt="icon" draggable={false} />
            <p>
                { t('search') }
            </p>
        </button>
    </div>
  )
}

export default MobileRouteSearch