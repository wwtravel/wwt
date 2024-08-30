'use client'

import { useLocale, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'sonner'

import { ResetPasswordSchema } from '@/lib/types'
import { z } from 'zod'

interface ResetPassProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent" | "ResetPass" | "SignUpEmailSent">>
    setSentEmail : React.Dispatch<React.SetStateAction<string>>
}

const ResetPass: React.FC<ResetPassProps> = ({ setIsOpen, setModalContent, setSentEmail }) => {

  const t = useTranslations("ResetPassModal")
  const login_t = useTranslations("LogInModal")

  const [emailFocus, setEmailFocus] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mouseHover, setMouseHover] = useState(false)
  const locale = useLocale()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(emailInput === '') {
        setEmailErr(true)
        toast( t('email-req-title'), {
          description: t('email-req-desc'),
          action: {
            label: login_t('close'),
            onClick: () => {}
          }
        })
      } 
      else {
        setLoading(true);

        try {

            ResetPasswordSchema.parse({
                email : emailInput,
                lang: locale
            })

            const response = await fetch('/api/reset-password-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput,
                    lang: locale,
                }),
            });

            if (response.ok) {
                setSentEmail(emailInput)
                setModalContent("EmailSent")
            } else {
                toast( t('general-error-title'), {
                    description: t('general-error-desc'),
                    action: {
                      label: login_t('close'),
                      onClick: () => {}
                    }
                  })
            }
            
        } catch (err) {
            if (err instanceof z.ZodError) {
                err.errors.forEach(error => {
                  const field = error.path[0];
                  if(field === 'email') {
                    setEmailErr(true)
                    toast( t('email-err-title'), {
                      description: t('email-err-desc'),
                      action: {
                        label: login_t('close'),
                        onClick: () => {}
                      }
                    })
                  }
              }); 
            }
        } finally {
            setLoading(false);
        }
      } 
    }

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('title') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

        <form noValidate className='w-full' onSubmit={handleSubmit}>
            <div className="relative mt-[2rem]">
                <input maxLength={50} id="ResetPassFormEmail" name="email" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={`${emailErr && 'animate-input-error'} w-full lg:h-[3.5rem] h-[4rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text"/>

                <motion.label
                htmlFor='ResetPassFormEmail'
                className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                initial={{ scale: 1, y: '-50%' }}
                animate={{
                    scale: emailFocus || emailInput !== '' ? 0.7 : 1,
                    y: emailFocus || emailInput !== '' ? '-80%' : '-50%'
                }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                >
                    { t('email') }
                </motion.label>
            </div>

            <button type="submit" className='bg-red hover:bg-dark-red transition-colors duration-300 w-full lg:h-[3.5rem] h-[4rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'>
              { 
                loading 
                  ? <PulseLoader 
                      size={5}
                      color="#FCFEFF"
                    />
                  : t('title') 
              }
            </button>
        </form>

        <p className='font-open-sans font-[400] text-[1.125rem] text-dark-gray mt-[2rem] text-center'>{ t('message2') }</p>

        <div className='font-open-sans text-gray lg:text-[1.125rem] text-[1.333rem] font-[400] text-center mt-[2rem] flex flex-wrap justify-center'>
            <span className='text-dark-gray'>{ login_t('question') }</span> &nbsp;
            <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
              <span onClick={() => setModalContent('SignUp')} className='cursor-pointer'>{ login_t('sign-up') }</span>
              <motion.div 
                className="absolute bottom-[15%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: mouseHover ? [0, 1] : 1 }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
              />
            </span>
        </div>

    </div>
  )
}

export default ResetPass