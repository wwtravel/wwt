'use client'

import { useTranslations } from 'next-intl';
import ComboBox from './ComboBox'
import DatePicker from './DatePicker';

import { useEffect, useState } from 'react';

const MobileRouteSearch = () => {

    const t = useTranslations("Header")

    const [retour, setRetour] = useState(false)

    const [departureCity, setDepartureCity] = useState('')
    const [arrivalCity, setArrivalCity] = useState('')
    const [departureDate, setDepartureDate] = useState('')
    const [arrivalDate, setArrivalDate] = useState('')

    const [parsedDepartureDate, setParsedDepartureDate] = useState<Date | null>(null)

  useEffect(() => {
    if(departureDate !== ''){
      const dateObject = new Date(departureDate);
      setParsedDepartureDate(dateObject)
    }
  }, [departureDate])

    const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchCities();
  }, []);

  return (
    <div className='flex flex-col gap-[0.667rem] mt-[5.333rem]'>

      <div className='flex gap-[1rem] items-center'>
        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(true)}>
          <svg className='size-[1.375rem]' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ retour ? "stroke-red" : "stroke-light-white" }`} x="2" y="2" width="18" height="18" rx="9"/>
            <rect className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-0" }`} x="4.5" y="4.5" width="13" height="13" rx="6.5" fill="#ED1C24"/>
          </svg>
          <p className='text-light-white text-[1.333rem] font-open-sans font-[400]'>{ t('radioBtn_1') }</p>
        </div>

        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => setRetour(false)}>
          <svg className='size-[1.375rem]' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ !retour ? "stroke-red" : "stroke-light-white" }`} x="2" y="2" width="18" height="18" rx="9"/>
            <rect className={`transition-opacity duration-300 ${ !retour ? "opacity-100" : "opacity-0" }`} x="4.5" y="4.5" width="13" height="13" rx="6.5" fill="#ED1C24"/>
          </svg>
          <p className='text-light-white text-[1.333rem] font-open-sans font-[400]'>{ t('radioBtn_2') }</p>
        </div>
      </div>

        <ComboBox 
          options={cities}
          placeholder={t('combobox1placeholder')}
          value={departureCity}
          onChange={setDepartureCity}
        />

        <ComboBox 
          options={cities}
          placeholder={t('combobox2placeholder')}
          value={arrivalCity}
          onChange={setArrivalCity}
        />

        <DatePicker dateValue={departureDate} calName='departure' edgeDate={parsedDepartureDate} setSearchDate={setDepartureDate} placeholder={t('calendar1placeholder')}/>

        <div className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-60" } lg:h-[3.5rem] h-[4.667rem] w-full`} onClick={() => setRetour(true)}>
            <DatePicker dateValue={arrivalDate} calName='arrival' edgeDate={parsedDepartureDate} setSearchDate={setArrivalDate} placeholder={t('calendar2placeholder')}/>
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