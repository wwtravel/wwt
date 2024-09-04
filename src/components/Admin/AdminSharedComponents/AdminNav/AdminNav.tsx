'use client'

import CurrencyPicker from '@/components/NavBarComponents/CurrencyPicker';
import LangPicker from '@/components/NavBarComponents/LangPicker';
import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl';
import React from 'react'

const AdminNav = () => {

  const pathname = usePathname()
  const activePage = pathname.split('/')[2];

  const t = useTranslations("AdminNav")

  return (
    <div className='fixed z-[100] left-0 right-0 top-[1.5rem] flex justify-between items-center mx-[8.5rem] px-[3.5rem] bg-light-white rounded-[1rem] h-[4rem] border border-gray/25 shadow-custom'>
        <div className='flex items-center gap-[1.5rem] font-open-sans'>
            <Link href="/admin/admin-routes" className={`font-bold text-[1rem] ${activePage === 'admin-routes' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('all-routes')}</Link>
            <Link href="/admin/admin-prices" className={`font-bold text-[1rem] ${activePage === 'admin-prices' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('routes-prices')}</Link>
            <Link href="/admin/admin-orders" className={`font-bold text-[1rem] ${activePage === 'admin-orders' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('orders')}</Link>
            <Link href="/admin/admin-statistics" className={`font-bold text-[1rem] ${activePage === 'admin-statistics' ? ' text-red ' : 'text-dark-gray hover:opacity-75'}  transition-opacity duration-300`}>{t('exit-admin')}</Link>
        </div>

        <div className='flex gap-[1.5rem]'>
            <LangPicker />
            <CurrencyPicker />
            <Link href="/">
                <button className='h-[2.5rem] px-[1.5rem] grid place-content-center bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem]'>
                    <p className='text-light-white font-open-sans font-bold text-[1rem]'>{ t('exit-admin') }</p>
                </button>
            </Link>

        </div>
    </div>
  )
}

export default AdminNav