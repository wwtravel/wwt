'use client'

import CurrencyPicker from '@/components/NavBarComponents/CurrencyPicker';
import LangPicker from '@/components/NavBarComponents/LangPicker';
import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl';
import React from 'react'

import {zeroRightClassName,fullWidthClassName, noScrollbarsClassName} from 'react-remove-scroll-bar';

const AdminNav = () => {

  const pathname = usePathname()
  const activePage = pathname.split('/')[2];

  const t = useTranslations("AdminNav")

  return (
    <div className={`${ zeroRightClassName } fixed z-[100] top-[1.5rem] left-0 right-0 flex justify-center px-[1rem]`}>
        <div className={`max-w-[103rem] w-full flex justify-between items-center px-[3.5rem] bg-light-white rounded-[1rem] xl:h-[4rem] h-[4.667rem] border border-gray/25 shadow-custom`}>
            <div className='flex items-center gap-[1.5rem] font-open-sans'>
                <Link href="/admin/admin-routes" className={`font-bold xl:text-[1rem] text-[1.333rem] ${activePage === 'admin-routes' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('all-routes')}</Link>
                <Link href="/admin/admin-prices" className={`font-bold xl:text-[1rem] text-[1.333rem] ${activePage === 'admin-prices' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('routes-prices')}</Link>
                <Link href="/admin/admin-orders" className={`font-bold xl:text-[1rem] text-[1.333rem] ${activePage === 'admin-orders' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('orders')}</Link>
            </div>

            <div className='flex'>
                <LangPicker />
                <CurrencyPicker />
                <Link href="/">
                    <button className='xl:h-[2.5rem] h-[3rem] px-[1.5rem] grid place-content-center bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem]'>
                        <p className='text-light-white font-open-sans font-bold xl:text-[1rem] text-[1.333rem]'>{ t('exit-admin') }</p>
                    </button>
                </Link>

            </div>
        </div>
    </div>
  )
}

export default AdminNav