'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import RedButton from '../SharedComponents/RedButton'
import { Link, useRouter } from '@/navigation'

const NotFoundContent = () => {
    
    const t = useTranslations("NotFoundPage")

    const router = useRouter()

    const [timer, setTimer] = useState(10)

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimer(prev => {
            if (prev === 1) {
              clearInterval(intervalId);
              router.push('/');
              return prev;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(intervalId);
      }, [router]);

  return (
    <div className='w-full pt-[14rem] px-[1rem]'>
      <div className='max-w-[84.25rem] w-full mx-auto h-[40.875rem] bg-[url(/images/dotted-map-bg.png)] bg-cover bg-center flex justify-center'>
      <div className='mt-[3.5rem]'>
        <div className='flex gap-[0.5rem] items-center h-fit'>
            <p className='font-montserrat text-dark-gray font-bold text-[20rem] leading-[0.7]'>4</p>
            <img src="/images/wheel.png" alt="wheel" draggable={false} className='size-[16rem]'/>
            <p className='font-montserrat text-dark-gray font-bold text-[20rem] leading-[0.7]'>4</p>
        </div>

        <p className='mt-[3.5rem] font-montserrat font-bold text-[3.25rem] text-center text-dark-gray'>{ t('title') }</p>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center'>{ t('desc') }</p>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center'>{ t('msg') }... 00:00:{timer.toString().padStart(2, '0')}</p>

        <div className='flex justify-center mt-[2rem]'>
            <Link href="/">
                <RedButton text={ t('back-to-website') }/>
            </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default NotFoundContent