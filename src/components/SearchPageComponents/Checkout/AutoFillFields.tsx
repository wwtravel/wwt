import { useTranslations } from 'next-intl'
import React from 'react'

interface AutoFillFieldsProps{
    onClick: () => void;
}

const AutoFillFields:React.FC<AutoFillFieldsProps> = ({ onClick }) => {

    const t = useTranslations("RouteSearchPage_Checkout")

  return (
    <div className='w-full py-[1rem] px-[2rem] flex justify-center bg-[#56B6FF]/20 border border-gray/25 shadow-custom rounded-[0.5rem]'>
        <div className='flex items-start gap-[0.25rem]'>
            <img src="/icons/route-card-icons/icon-attention.svg" alt="attention" draggable={false} className='size-[1rem] mt-[0.25rem]' />
            <p className='text-dark-gray font-[400] font-open-sans text-[1rem]'>
                <span>{ t('fill-in-data-question') }</span> &nbsp;
                <span onClick={onClick} className='underline font-bold cursor-pointer'>{ t('fill-in-data-msg') }</span>
            </p>
        </div>

    </div>
  )
}

export default AutoFillFields