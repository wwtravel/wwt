import LogInModal from '@/components/NavBarComponents/LogInModal/LogInModal'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const SignInQuestionBox = () => {

    const t = useTranslations("RouteSearchPage_Checkout")

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full px-[2rem] py-[1rem] flex justify-center bg-[#56B6FF]/20 border border-gray/25 shadow-custom rounded-[0.5rem]'>
        <div className='flex items-start gap-[0.25rem]'>
            <img src="/icons/route-card-icons/icon-attention.svg" alt="attention" draggable={false} className='size-[1rem] mt-[0.25rem]' />
            <p className='text-dark-gray font-[400] font-open-sans text-[1rem]'>
                <span>{ t('sign-in-question') }</span> &nbsp;
                <span onClick={() => setIsOpen(true)} className='underline font-bold cursor-pointer'>{ t('sign-in-btn') }</span> &nbsp;
                <span>{ t('sign-in-msg') }</span>
            </p>
        </div>

        <LogInModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default SignInQuestionBox