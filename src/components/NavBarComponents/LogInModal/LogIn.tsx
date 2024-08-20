'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"

interface LogInProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent">>
}

const LogIn:React.FC<LogInProps> = ({ setIsOpen, setModalContent }) => {

  const t = useTranslations('LogInModal')

  const [showPass, setShowPass] = useState(false)

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('greetings') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

        <form className='mt-[2rem] w-full'>
            <input className='w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400]' required type="email" placeholder={ t('email') }/>
            <div className="w-full mt-[1rem] relative">
                <input className='w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] pr-[4rem] text-dark-gray font-open-sans text-[1rem] font-[400]' required type={ showPass ? "text" : "password" } placeholder={ t('password') }/>
                <img onClick={() => setShowPass(prev => !prev)} src={showPass ? "/icons/icon-eye-closed.svg" : '/icons/icon-eye-open.svg'} alt="eye" draggable={false} className="size-[1rem] absolute top-[50%] -translate-y-[50%] right-[1.5rem] cursor-pointer" />
            </div>

            <input type="submit" value={ t('log-in') } className='bg-red w-full h-[3.5rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'/>
        </form>

        <p className='text-gray text-[1rem] text-center font-open-sans font-[400] mt-[1rem] cursor-pointer'>{ t('forgot-pass') }</p>

        <p className='font-open-sans text-gray text-[1.125rem] font-[400] text-center mt-[2rem]'><span className='text-dark-gray'>{ t('question') }</span> <span onClick={() => setModalContent('SignUp')} className='cursor-pointer underline'>{ t('sign-up') }</span></p>
    </div>
  )
}

export default LogIn