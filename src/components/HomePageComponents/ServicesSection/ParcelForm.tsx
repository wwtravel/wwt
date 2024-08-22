'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import ParcelFormSelect from './ParcelFormSelect'
import RedButton from '@/components/SharedComponents/RedButton';

import { motion } from 'framer-motion';

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

  const [nameInputFocused, setNameInputFocused] = useState(false)
  const [phoneInputFocused, setPhoneInputFocused] = useState(false)

  const [fromCityValue, setFromCityValue] = useState('')
  const [toCityValue, setToCityValue] = useState('')

  const [formData, setFormData] = useState({
    nameInput: '',
    phoneInput: '',
    fromCity: '',
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
      fromCity: fromCityValue
    });
  }, [toCityValue, fromCityValue])

  console.log(formData)

  return (
    <div className='mt-[2rem] grid sm:grid-cols-2 grid-cols-1 gap-x-[1.5rem] sm:gap-y-[1rem] gap-y-[0.667rem] font-open-sans text-dark-gray text-[1rem] font-[400]'>

        <div className='relative' >
          <input
            name="nameInput"
            value={formData.nameInput}
            onChange={handleChange} 
            onFocus={() => setNameInputFocused(true)}
            onBlur={() => setNameInputFocused(false)} 
            id='nameInput' required className='w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75 lg:pt-[1rem] pt-[1.5rem]' 
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
            id='phoneInput' required className='w-full sm:h-[3.5rem] h-[4.667rem] sm:text-[1rem] text-[1.333rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] bg-light-white placeholder:text-gray/75 lg:pt-[1rem] pt-[1.5rem]' 
            type="text" maxLength={20}
          />

            <motion.label
              htmlFor='phoneInput'
              className="origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
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

        <ParcelFormSelect inputValue={formData.fromCity} options={CITIES} placeholder={ t('selectBox1Placeholder') } setInputValue={setFromCityValue}/>
        <ParcelFormSelect inputValue={formData.toCity} options={CITIES} placeholder={ t('selectBox2Placeholder') } setInputValue={setToCityValue}/>
        
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