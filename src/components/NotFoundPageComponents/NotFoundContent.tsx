import { useTranslations } from 'next-intl'
import React from 'react'

const NotFoundContent = () => {
    
    const t = useTranslations("NotFoundPage")

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
        <p>{ t('desc') }</p>
      </div>
      </div>
    </div>
  )
}

export default NotFoundContent