'use client'

import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import RedButton from '@/components/SharedComponents/RedButton';

interface SignUpEmailSentProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent" | "ResetPass" | "SignUpEmailSent">>
    sentEmail : string;
}

const SignUpEmailSent:React.FC<SignUpEmailSentProps> = ({ setIsOpen, setModalContent, sentEmail }) => {

    const t = useTranslations("SignUpEmailSentModal")
    const login_t = useTranslations("LogInModal")

    const [mouseHover1, setMouseHover1] = useState(false)
    const [mouseHover2, setMouseHover2] = useState(false)

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('title') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message1') } <span className='font-bold'>{ sentEmail }</span></p>

        <img src="/icons/contacts-page-icons/icon-email.svg" alt="email" draggable={false} className='size-[4.5rem] mx-auto mt-[2rem]' />

        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message2') }</p>

        <div className='flex items-center justify-center gap-[2rem] mt-[1.5rem]'>
            <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center flex flex-wrap justify-center'>
                <span onMouseEnter={() => setMouseHover1(true)} onMouseLeave={() => setMouseHover1(false)} className="relative">
                    <span onClick={() => setIsOpen(false)} className='cursor-pointer'>{ t('back-to-website') }</span>
                    <motion.div 
                        className="absolute bottom-[15%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: mouseHover1 ? [0, 1] : 1 }}
                        transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
                    />
                </span>
            </div>

            <div onClick={() => setModalContent('LogIn')}>
                <RedButton text={ t('log-in') }/>
            </div>
        </div>

        <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center mt-[4rem] flex flex-wrap justify-center'>
            <span className='text-dark-gray'>{ login_t('question') }</span> &nbsp;
            <span onMouseEnter={() => setMouseHover2(true)} onMouseLeave={() => setMouseHover2(false)} className="relative">
              <span onClick={() => setModalContent('SignUp')} className='cursor-pointer'>{ login_t('sign-up') }</span>
              <motion.div 
                className="absolute bottom-[15%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: mouseHover2 ? [0, 1] : 1 }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
              />
            </span>
        </div>
    </div>
  )
}

export default SignUpEmailSent