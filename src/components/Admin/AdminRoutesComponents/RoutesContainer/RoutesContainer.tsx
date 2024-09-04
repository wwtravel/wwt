import { useTranslations } from 'next-intl'
import React from 'react'

const RoutesContainer = () => {

  const t= useTranslations("AdminRoutes")

  return (
    <div className='max-w-[66rem] w-full'>
        <p className='font-bold text-[1.125rem] text-dark-gray mb-[0.5rem]'>{ t('routes') }</p>
    </div>
  )
}

export default RoutesContainer