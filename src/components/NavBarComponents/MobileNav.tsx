import { Link } from '@/navigation'
import React from 'react'
import LangPicker from './LangPicker'
import CurrencyPicker from './CurrencyPicker'

const MobileNav = () => {
  return (
    <div className='xl:hidden bg-red flex items-center justify-between py-[1rem] lg:px-[12rem] px-[1rem]'>
        <Link href='/'>
            <img className='md:w-[17rem] w-[13.25rem]' src="/logo.svg" alt="logo" draggable={false} />
        </Link>

        <div className='flex gap-[0.5rem]'>
            <LangPicker />
            <CurrencyPicker />
            <img src="/icons/icon-menu.svg" draggable={false} alt="menu" className='size-[2rem] ml-[0.5rem]' />
        </div>
    </div>
  )
}

export default MobileNav