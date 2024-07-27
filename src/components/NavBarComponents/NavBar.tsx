import React from 'react'
import { Link } from '../../navigation'
import NavContact from './NavContact'

import { useTranslations } from "next-intl";
import LangPicker from './LangPicker';
import CurrencyPicker from './CurrencyPicker';

const NavBar = () => {
  const t = useTranslations('NavBar');

  return (
    <div className='fixed z-[10] w-full'>
      <div className='relative h-[7.3125rem] w-full bg-red rounded-b-[1rem] pt-[1rem] px-[12rem] font-open-sans'>
        <div className='flex justify-between'>
          <Link href='/'>
            <img className='w-[20rem] mt-[0.5rem]' src="/logo.svg" alt="logo" draggable={false} />
          </Link>

          <div className='flex gap-[1.5rem]'>
              <NavContact imageUrl='/icons/icon-phone.svg' title={t('titleMD')} info={['+373 60 262 525', '+373 60 262 525']}/>
              <NavContact imageUrl='/icons/icon-phone.svg' title={t('titleSW')} info={['+41 762 333 452', '+41 766 023 886']}/>
              <NavContact imageUrl='/icons/icon-email.svg' title={t('titleEmail')} info={['wwtravelmd@gmail.com']}/>
          </div>
        </div>

        <div className='absolute bottom-0 translate-y-[50%] left-0 right-0 h-[4rem] bg-white rounded-[1rem] mx-[8.4375rem] px-[3.5rem] flex justify-between items-center'>
          <div className='flex gap-[1.5rem]'>
            <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navHome')}</Link>
            <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navSchedule')}</Link>
            <Link href="/about" className='font-bold text-[1rem] text-dark-gray'>{t('navAbout')}</Link>
            <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navContact')}</Link>
          </div>

          <div className='flex'>
            <div className='flex gap-[1.5rem] mr-[3rem]'>
              <LangPicker />
              <CurrencyPicker />
            </div>

            <Link className='flex items-center gap-[0.5rem] mr-[1.5rem]' href="/">
              <img src="/icons/icon-cart.svg" alt="cart" draggable={false} className='size-[1rem]'/>
              <p className='font-bold text-dark-gray text-[1rem]'>{ t('navCart') }</p>
            </Link>

            <div className='bg-red rounded-[0.5rem] px-[1.5rem] h-[2.5rem] flex justify-center items-center gap-[0.5rem] cursor-pointer'>
              <img src="/icons/icon-profile.svg" alt="profile" draggable={false} className='size-[1rem]' />
              <p className='text-white font-bold text-[1rem]'>Cătălin P.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar