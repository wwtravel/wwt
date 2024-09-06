'use client'

import { useTranslations } from 'next-intl';
import ComboBox from './ComboBox'
import DatePicker from './DatePicker';
import RedButton from '@/components/SharedComponents/RedButton';

import { useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/navigation';
import { Option } from './ComboBox';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const RouteSearch = () => {

  //search params | router

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const err_t = useTranslations("RouteSearchErrors")

  const [cities, setCities] = useState<Option[]>([])

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

  const t = useTranslations("Header")

  const [retour, setRetour] = useState(false)

  const [departureCity, setDepartureCity] = useState('')
  const [arrivalCity, setArrivalCity] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')

  const [departureCityErr, setDepartureCityErr] = useState(false)
  const [arrivalCityErr, setArrivalCityErr] = useState(false)
  const [departureDateErr, setDepartureDateErr] = useState(false)
  const [arrivalDateErr, setArrivalDateErr] = useState(false)

  useEffect(() => {
    if (searchParams) {
      setRetour(searchParams.get('r') === 'true');
      setDepartureCity(searchParams.get('dep') || '');
      setArrivalCity(searchParams.get('arr') || '');
      setDepartureDate(searchParams.get('depdate') || '');
      setArrivalDate(searchParams.get('arrdate') || '');
    }
  }, [searchParams]);

  const [parsedDepartureDate, setParsedDepartureDate] = useState<Date | null>(null)

  useEffect(() => {
    if(departureDate !== ''){
      const dateObject = new Date(departureDate);
      setParsedDepartureDate(dateObject)
    }
  }, [departureDate])

  const interchangeValues = () => {
    const temp = departureCity
    setDepartureCity(arrivalCity)
    setArrivalCity(temp)
  }

  //validation functions

  const validateCombobox = ( value : string ) => {
    let foundMatch = 0

    cities.map(city => {
      if(city.value === value) foundMatch = 1
    })
    
    if(foundMatch === 1) return true
      else return false
  }

  const getDate = (date : string) => {
    return new Date(date)
  }

  const handleSearchClick = () => {
    if(cities) {

      setArrivalCityErr(false)
      setDepartureCityErr(false)
      setDepartureDateErr(false)
      setArrivalDateErr(false)

      if(departureCity === '') {
        setDepartureCityErr(true)
        toast( err_t("departure-city-required-err-title"), {
          description: err_t("departure-city-required-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if( !validateCombobox(departureCity) ) {
        setDepartureCityErr(true)
        toast( err_t("departure-city-invalid-err-title"), {
          description: err_t("departure-city-invalid-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if(arrivalCity === ''){
        setArrivalCityErr(true)
        toast( err_t("arrival-city-required-err-title"), {
          description: err_t("arrival-city-required-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if( !validateCombobox(arrivalCity) ) {
        setArrivalCityErr(true)
        toast( err_t("arrival-city-invalid-err-title"), {
          description: err_t("arrival-city-invalid-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if(arrivalCity === departureCity){
        setArrivalCityErr(true)
        setDepartureCityErr(true)
        toast( err_t("same-city-err-title"), {
          description: err_t("same-city-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if(departureDate === ''){
        setDepartureDateErr(true)
        toast( err_t("departure-date-required-err-title"), {
          description: err_t("departure-date-required-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if(arrivalDate === '' && retour){
        setArrivalDateErr(true)
        toast( err_t("return-date-required-err-title"), {
          description: err_t("return-date-required-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      if(retour && getDate(arrivalDate) <= getDate(departureDate)){
        setArrivalDateErr(true)
        toast( err_t("return-date-invalid-err-title"), {
          description: err_t("return-date-invalid-err-desc"),
          action: {
            label: err_t('close'),
            onClick: () => {}
          }
        })
        return
      }
      
      //user redirect
      const params = new URLSearchParams(searchParams)
      params.set('dep', departureCity)
      params.set('arr', arrivalCity)
      params.set('depdate', departureDate)
      if(retour) params.set('arrdate', arrivalDate)
        else params.delete('arrdate')
      params.set('r', String(retour))

      router.push(`/route-search?${params.toString()}`, { scroll: false })



    }
  }


  //changing retour

  useEffect(() => {
    if(searchParams.has('r')){
      const currentParams = new URLSearchParams(searchParams.toString());
  
      currentParams.set("r", String(retour));
  
      router.replace(`${pathname}?${currentParams.toString()}`, {scroll: false})
    }
  }, [retour])

  useEffect(() => {
    if (pathname === '/route-search') {
      const currentParams = new URLSearchParams(searchParams.toString());
  
      if (arrivalDate !== '') {
        currentParams.set("arrdate", arrivalDate);
      } else {
        if (currentParams.has('arrdate')) {
          currentParams.delete("arrdate");
        }
      }
  
      router.replace(`${pathname}?${currentParams.toString()}`, {scroll: false});
    }
  }, [arrivalDate]);

  useEffect(() => {
    if (pathname === '/route-search') {
      const currentParams = new URLSearchParams(searchParams.toString());
  
      if (departureDate !== '') {
        currentParams.set("depdate", departureDate);
      }
  
      router.replace(`${pathname}?${currentParams.toString()}`, {scroll: false});
    }
  }, [departureDate]);

  useEffect(() => {
    if (pathname === '/route-search') {
      const currentParams = new URLSearchParams(searchParams.toString());
  
      if (departureCity !== '') {
        currentParams.set("dep", departureCity);
        currentParams.set("arr", arrivalCity);
      }
  
      router.replace(`${pathname}?${currentParams.toString()}`, {scroll: false});
    }
  }, [departureCity]);

  useEffect(() => {
    if (pathname === '/route-search') {
      const currentParams = new URLSearchParams(searchParams.toString());
  
      if (arrivalCity !== '') {
        currentParams.set("arr", arrivalCity);
        currentParams.set("dep", departureCity);
      }
  
      router.replace(`${pathname}?${currentParams.toString()}`, {scroll: false});
    }
  }, [arrivalCity]);

  return (
    <div className='absolute flex flex-col justify-center bottom-0 left-[50%] -translate-x-[50%] w-max h-[9.5rem] bg-light-white shadow-custom rounded-[1rem] translate-y-[50%] px-[4rem]'>

      <div className='flex gap-[1rem] items-center'>
        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => {setRetour(true)}}>
          <svg className='size-[1.375rem]' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ retour ? "stroke-red" : "stroke-gray/25" }`} x="2" y="2" width="18" height="18" rx="9"/>
            <rect className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-0" }`} x="4.5" y="4.5" width="13" height="13" rx="6.5" fill="#ED1C24"/>
          </svg>
          <p className='text-dark-gray text-[1rem] font-open-sans font-[400]'>{ t('radioBtn_1') }</p>
        </div>

        <div className='flex gap-[0.5rem] items-center cursor-pointer' onClick={() => {setRetour(false)}}>
          <svg className='size-[1.375rem]' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className={`transition-colors duration-300 ${ !retour ? "stroke-red" : "stroke-gray/25" }`} x="2" y="2" width="18" height="18" rx="9"/>
            <rect className={`transition-opacity duration-300 ${ !retour ? "opacity-100" : "opacity-0" }`} x="4.5" y="4.5" width="13" height="13" rx="6.5" fill="#ED1C24"/>
          </svg>
          <p className='text-dark-gray text-[1rem] font-open-sans font-[400]'>{ t('radioBtn_2') }</p>
        </div>
      </div>

      <div className='flex gap-[1rem] items-center mt-[0.375rem]'>
        <div className='w-[15rem]'>
          <ComboBox 
            options={cities}
            placeholder={t('combobox1placeholder')}
            value={departureCity}
            onChange={setDepartureCity}
            errTrigger={departureCityErr}
          />
        </div>

          <img onClick={interchangeValues} className='size-[1.5rem] cursor-pointer hover:rotate-180 transition-transform duration-300' src="/icons/icon-reverse.svg" alt="reverse" draggable={false} />

          <div className='w-[15rem]'>
            <ComboBox 
              options={cities}
              placeholder={t('combobox2placeholder')}
              value={arrivalCity}
              onChange={setArrivalCity}
              errTrigger={arrivalCityErr}
            />
          </div>

          <DatePicker errTrigger={departureDateErr} dateValue={departureDate} calName='departure' edgeDate={parsedDepartureDate} setSearchDate={setDepartureDate} placeholder={t('calendar1placeholder')}/>

          <div className={`transition-opacity duration-300 ${ retour ? "opacity-100" : "opacity-50" } lg:h-[3.5rem] h-[4.667rem]`} onClick={() => setRetour(true)}>
            <DatePicker errTrigger={arrivalDateErr} dateValue={arrivalDate} calName='arrival' edgeDate={parsedDepartureDate} setSearchDate={setArrivalDate} placeholder={t('calendar2placeholder')}/>
          </div>
          
          <div onClick={handleSearchClick}>
            <RedButton text={t('search')} iconURL='/icons/icon-search.svg'/>
          </div>
      </div>
    </div>
  )
}

export default RouteSearch