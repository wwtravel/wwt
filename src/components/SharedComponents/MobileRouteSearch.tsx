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

    const [retour, setRetour] = useState(false)

    const [departureCity, setDepartureCity] = useState('')
    const [arrivalCity, setArrivalCity] = useState('')

  return (
    <div className='flex flex-col gap-[0.667rem] mt-[5.333rem]'>

      <div className='flex gap-[1rem] items-center'>
        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(true)}>
          <svg className='size-[1.125rem]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ retour ? "stroke-red" : "stroke-light-white" }`} x="0.5" y="0.5" width="17" height="17" rx="8.5"/>
            <rect className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-0" }`} x="3" y="3" width="12" height="12" rx="6" fill="#ED1C24"/>
          </svg>
          <p className='text-light-white text-[1.333rem] font-open-sans font-[400]'>{ t('radioBtn_1') }</p>
        </div>

        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(false)}>
          <svg className='size-[1.125rem]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ !retour ? "stroke-red" : "stroke-light-white" }`} x="0.5" y="0.5" width="17" height="17" rx="8.5"/>
            <rect className={`transition-opacity duration-300 ${ !retour ? "opacity-100" : "opacity-0" }`} x="3" y="3" width="12" height="12" rx="6" fill="#ED1C24"/>
          </svg>
          <p className='text-light-white text-[1.333rem] font-open-sans font-[400]'>{ t('radioBtn_2') }</p>
        </div>
      </div>

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

        <div className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-60" } lg:h-[3.5rem] h-[4.667rem] w-full`} onClick={() => setRetour(true)}>
            <DatePicker placeholder={t('calendar2placeholder')}/>
        </div>

        <button className=' h-[4.667rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] px-[1.5rem] flex items-center justify-center text-[1.5rem] font-bold text-white'>
            <img className='size-[1.5rem] mr-[0.5rem]' src='/icons/icon-search.svg' alt="icon" draggable={false} />
            <p>
                { t('search') }
            </p>
        </button>
    </div>
  )
}

export default MobileRouteSearch