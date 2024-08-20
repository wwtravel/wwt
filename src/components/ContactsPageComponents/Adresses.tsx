import { useTranslations } from 'next-intl'
import React from 'react'

const Adresses = () => {

  const t = useTranslations('ContactsPage')

  return (
    <div className='flex-1 flex flex-col md:gap-[1.5rem] gap-[0.667rem] text-dark-gray font-open-sans'>

      <div className='shadow-custom border border-gray/25 rounded-[0.5rem] py-[1.5rem] px-[3rem] bg-light-white text-center h-full'>
        <img src="/icons/contacts-page-icons/icon-adress.svg" alt="adress" draggable={false} className='size-[4.5rem] mx-auto' />
        <h3 className='text-[1.5rem] font-bold mt-[1rem]'>{ t('officeAdress') }</h3>
        <p className='font-[400] text-[1.125rem] mt-[0.5rem]'> <span>{ t('street') }</span> <br /> <span>{ t('city-country') }</span> </p>
      </div>

      <div className='shadow-custom border border-gray/25 rounded-[0.5rem] py-[1.5rem] px-[3rem] bg-light-white text-center h-full'>
        <img src="/icons/contacts-page-icons/icon-email.svg" alt="adress" draggable={false} className='size-[4.5rem] mx-auto' />
        <h3 className='text-[1.5rem] font-bold mt-[1rem]'>{ t('email') }</h3>
        <p className='font-[400] text-[1.125rem] mt-[0.25rem]'>wwtravelmd@gmail.com</p>
      </div>

    </div>
  )
}

export default Adresses