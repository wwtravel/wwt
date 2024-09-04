import { useTranslations } from 'next-intl'
import React from 'react'
import FilterDatePicker from './FilterDatePicker'
import { Checkbox } from '@/components/ui/checkbox'
import FilterSelect from './FilterSelect'
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText'

const Filter = () => {

  const t = useTranslations("AdminRoutes")

  return (
    <div className='max-w-[22rem] w-full font-open-sans'>
        <p className='font-bold text-[1.125rem] text-dark-gray mb-[0.5rem]'>{ t('filter-by') }</p>

        <div className='w-full p-[1.5rem] bg-light-white border border-gray/25 rounded-[1rem] shadow-sm'>
            <p className='text-[1.125rem] text-dark-gray font-[400] mb-[0.5rem]'>{ t('route-date') }:</p>
            <FilterDatePicker />
            <p className='text-[1.125rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('route-output') }:</p>

            <div className='flex flex-col gap-[0.5rem]'>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='allRoutes'/>
                    <label className='text-gray text-[1rem] font-[400]' htmlFor="allRoutes">{ t('all-routes') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='tour'/>
                    <label className='text-gray text-[1rem] font-[400]' htmlFor="tour">{ t('tour') }</label>
                </div>
                <div className='flex items-center gap-[0.5rem] select-none'>
                    <Checkbox id='return'/>
                    <label className='text-gray text-[1rem] font-[400]' htmlFor="return">{ t('return') }</label>
                </div>
            </div>

            <p className='text-[1.125rem] text-dark-gray font-[400] mb-[0.5rem] mt-[1.5rem]'>{ t('sort-by') }:</p>
            <FilterSelect />

            <div className='flex justify-between items-center mt-[3rem]'>
                <UnderlinedText text={ t('delete') }/>

                <button className='bg-red hover:bg-dark-red transition-colors duration-300 grid place-content-center rounded-[0.5rem] h-[2.5rem] px-[1.5rem]'>
                    <p className='text-light-white text-[1rem] font-bold'>{ t('filter') }</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Filter