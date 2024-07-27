'use client'

import { useTranslations } from 'next-intl';
import ComboBox from './ComboBox'
import DatePicker from './DatePicker';
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

const RouteSearch = () => {

  const t = useTranslations("Header")

  return (
    <div className='absolute bottom-0 left-[50%] -translate-x-[50%] w-fit h-[9.5rem] bg-light-white shadow-lg rounded-[1rem] translate-y-[50%] flex gap-[1rem] items-center px-[4rem]'>
        <ComboBox 
          options={CITIES}
          placeholder={t('combobox1placeholder')}
        />

        <img className='size-[1.5rem]' src="/icons/icon-reverse.svg" alt="reverse" draggable={false} />

        <ComboBox 
          options={CITIES}
          placeholder={t('combobox2placeholder')}
        />

        <DatePicker placeholder={t('calendar1placeholder')}/>
        <DatePicker placeholder={t('calendar2placeholder')}/>
        
        <RedButton text={t('search')} iconURL='/icons/icon-search.svg'/>
    </div>
  )
}

export default RouteSearch