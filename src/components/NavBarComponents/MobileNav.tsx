'use client'

import { Link } from '@/navigation'
import React, { useState } from 'react'
import LangPicker from './LangPicker'
import CurrencyPicker from './CurrencyPicker'

import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});

const MobileNav = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className='xl:hidden bg-red flex items-center justify-between py-[1rem] lg:px-[12rem] px-[1rem] rounded-b-[0.5rem]'>
          <Link href='/'>
              <img className='md:w-[17rem] w-[13.25rem]' src="/logo.svg" alt="logo" draggable={false} />
          </Link>

          <div className='flex gap-[0.5rem]'>
              <LangPicker />
              <CurrencyPicker />
              <img onClick={() => setIsOpen(true)} src="/icons/icon-menu.svg" draggable={false} alt="menu" className='size-[2rem] ml-[0.5rem] cursor-pointer' />
          </div>

      </div>
      <div className='xl:hidden'>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </>
  )
}

export default MobileNav