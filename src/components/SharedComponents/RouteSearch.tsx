'use client'

import { useTranslations } from 'next-intl';
import ComboBox from './ComboBox'
import DatePicker from './DatePicker';
import RedButton from '@/components/SharedComponents/RedButton';

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

const RouteSearch = () => {

  const t = useTranslations("Header")

  const [retour, setRetour] = useState(false)

  const [departureCity, setDepartureCity] = useState('')
  const [arrivalCity, setArrivalCity] = useState('')

  const interchangeValues = () => {
    const temp = departureCity
    setDepartureCity(arrivalCity)
    setArrivalCity(temp)
  }

  return (
    <div className='absolute flex flex-col justify-center bottom-0 left-[50%] -translate-x-[50%] w-fit h-[9.5rem] bg-light-white shadow-custom rounded-[1rem] translate-y-[50%] px-[4rem]'>

      <div className='flex gap-[1rem] items-center'>
        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(true)}>
          <svg className='size-[1.125rem]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ retour ? "stroke-red" : "stroke-gray/25" }`} x="0.5" y="0.5" width="17" height="17" rx="8.5"/>
            <rect className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-0" }`} x="3" y="3" width="12" height="12" rx="6" fill="#ED1C24"/>
          </svg>
          <p className='text-dark-gray text-[1rem] font-open-sans font-[400]'>{ t('radioBtn_1') }</p>
        </div>

        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(false)}>
          <svg className='size-[1.125rem]' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ !retour ? "stroke-red" : "stroke-gray/25" }`} x="0.5" y="0.5" width="17" height="17" rx="8.5"/>
            <rect className={`transition-opacity duration-300 ${ !retour ? "opacity-100" : "opacity-0" }`} x="3" y="3" width="12" height="12" rx="6" fill="#ED1C24"/>
          </svg>
          <p className='text-dark-gray text-[1rem] font-open-sans font-[400]'>{ t('radioBtn_2') }</p>
        </div>
      </div>

      <div className='flex gap-[1rem] items-center mt-[0.375rem]'>
        <div className='w-[15rem]'>
          <ComboBox 
            options={CITIES}
            placeholder={t('combobox1placeholder')}
            value={departureCity}
            onChange={setDepartureCity}
          />
        </div>

          <img onClick={interchangeValues} className='size-[1.5rem] cursor-pointer hover:rotate-180 transition-transform duration-300' src="/icons/icon-reverse.svg" alt="reverse" draggable={false} />

          <div className='w-[15rem]'>
            <ComboBox 
              options={CITIES}
              placeholder={t('combobox2placeholder')}
              value={arrivalCity}
              onChange={setArrivalCity}
            />
          </div>

          <DatePicker placeholder={t('calendar1placeholder')}/>

          <div className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-50" } lg:h-[3.5rem] h-[4.667rem]`} onClick={() => setRetour(true)}>
            <DatePicker placeholder={t('calendar2placeholder')}/>
          </div>
          
          <RedButton text={t('search')} iconURL='/icons/icon-search.svg'/>
      </div>
    </div>
  )
}

export default RouteSearch