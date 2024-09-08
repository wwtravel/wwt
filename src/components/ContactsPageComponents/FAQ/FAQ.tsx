import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import React from 'react'
import FAQAcordion from './FAQAcordion'

const FAQ = () => {

    const t = useTranslations("Contacts_FAQ")

  return (
    <div className='px-[1rem] mt-[10rem]'>
        <SectionTitle lowOpacityTitle={ t('lowOpacityTitle') } title={ t('title') }/>

        <div className='mt-[4rem] max-w-[79.5rem] w-full mx-auto'>
            <FAQAcordion />
        </div>
    </div>
  )
}

export default FAQ