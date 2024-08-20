import React from 'react'
import SectionTitle from '../SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import ContactPhones from './ContactPhones'
import Adresses from './Adresses'
import ContactsMap from './ContactsMap'

const Contacts = () => {

  const t = useTranslations("ContactsPage")

  return (
    <div className='pt-[14.75rem] px-[1rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='max-w-[79.5rem] w-full mx-auto md:mt-[4rem] mt-[2.667rem] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-[1.5rem] gap-[0.667rem]'>
            <ContactPhones />
            <Adresses />
            <div className='lg:col-span-1 md:col-span-2 col-span-1 max-lg:h-[26.125rem]'>
                <ContactsMap />
            </div>
        </div>
    </div>
  )
}

export default Contacts