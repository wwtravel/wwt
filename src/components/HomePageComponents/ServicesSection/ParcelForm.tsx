'use client'

import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import ParcelFormSelect from './ParcelFormSelect'
import RedButton from '@/components/SharedComponents/RedButton';

import { motion } from 'framer-motion';
import { Option } from '@/components/SharedComponents/ComboBox';
import { toast } from 'sonner';
import { createWhatsAppLink } from '@/constants/messages';

const ParcelForm = () => {

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

  const t = useTranslations("Services")

  const [nameInputFocused, setNameInputFocused] = useState(false)
  const [phoneInputFocused, setPhoneInputFocused] = useState(false)
  const [toCityValue, setToCityValue] = useState('')

  const locale = useLocale()

  const getLocale = ( locale: string ) => {
    switch(locale) {
        case 'ro' : return 'ro'
        case 'ru' : return 'ru'
        case 'en' : return 'en'
        case 'fr' : return 'fr'
        default : return 'en'
    }
}

  const [formData, setFormData] = useState({
    nameInput: '',
    phoneInput: '',
    toCity: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      toCity: toCityValue,
    });
  }, [toCityValue])

  const [nameInputErr, setNameInputErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)
  const [toCityErr, setToCityErr] = useState(false)

  const handleClick = () => {

    setNameInputErr(false)
    setPhoneErr(false)
    setToCityErr(false)

    if(formData.nameInput === ''){
      setNameInputErr(true)
      toast( t('first-name-last-name-req-err-title'), {
        description: t('first-name-last-name-req-err-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return;
    } 
    if(formData.phoneInput === ''){
      setPhoneErr(true)
      toast( t('phone-req-title'), {
        description: t('phone-req-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return;
    } 
    if(formData.toCity === ''){
      setToCityErr(true)
      toast( t('to-city-req-title'), {
        description: t('to-city-req-desc'),
        action: {
          label: t('close'),
          onClick: () => {}
        }
      })
      return;
    } 

    let toCity = ''

    cities.map(city => {
      if(city.value === formData.toCity) {
          toCity = city.label[getLocale(locale)]
      }
    })

    //generating link
    const link = createWhatsAppLink(formData.nameInput, formData.phoneInput, toCity, getLocale(locale), "37360262525")
    window.open(link, '_blank');
  }

  return (
    <div className='mt-[2rem] grid sm:grid-cols-2 grid-cols-1 gap-x-[1.5rem] sm:gap-y-[1rem] gap-y-[0.667rem] font-open-sans text-dark-gray text-[1rem] font-[400]'>

        <div className='relative' >
          <input
            name="nameInput"
            value={formData.nameInput}
            onChange={handleChange} 
            onFocus={() => setNameInputFocused(true)}
            onBlur={() => setNameInputFocused(false)} 
            id='nameInput' required className={`${ nameInputErr && 'animate-input-error' } w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75 lg:pt-[1rem] pt-[1.5rem]`} 
            type="text" maxLength={50}
          />

            <motion.label
              htmlFor='nameInput'
              className="origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
              initial={{ scale: 1, y: '-50%' }}
              animate={{
                scale: nameInputFocused || formData.nameInput !== '' ? 0.7 : 1,
                y: nameInputFocused || formData.nameInput !== '' ? '-80%' : '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            >
              { t('nameInputPlaceholder') }
            </motion.label>
        </div>

        <div className='relative' >
          <input
            name="phoneInput"
            value={formData.phoneInput}
            onChange={handleChange} 
            onFocus={() => setPhoneInputFocused(true)}
            onBlur={() => setPhoneInputFocused(false)} 
            id='phoneInput' required className={`${ phoneErr && 'animate-input-error' } w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75 lg:pt-[1rem] pt-[1.5rem]`} 
            type="text" maxLength={20}
          />

            <motion.label
              htmlFor='phoneInput'
              className={` origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]`}
              initial={{ scale: 1, y: '-50%' }}
              animate={{
                scale: phoneInputFocused || formData.phoneInput !== '' ? 0.7 : 1,
                y: phoneInputFocused || formData.phoneInput !== '' ? '-80%' : '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            >
              { t('phoneInputPlaceholder') }
            </motion.label>
        </div>

        <ParcelFormSelect toCityErr={toCityErr} inputValue={formData.toCity} options={cities} placeholder={ t('selectBox2Placeholder') } setInputValue={setToCityValue}/>

        <button className='max-sm:hidden md:h-[3.5rem] h-[3.333rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] px-[1.5rem] flex items-center justify-center md:text-[1.125rem] text-[1rem] font-bold text-white' onClick={handleClick}>
          <p>
            { t('send') }
          </p>
        </button>

        <button className='sm:hidden h-[4.667rem] bg-red rounded-[0.5rem] px-[1.5rem] flex items-center justify-center text-[1.333rem] font-bold text-white' onClick={handleClick}>
          {t('send')}
        </button>
        
    </div>
  )
}

export default ParcelForm