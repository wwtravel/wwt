'use client'

import { useTranslations } from "next-intl"
import { useState } from "react"
import { motion } from "framer-motion"

import { toast } from "sonner"

import { signIn } from "next-auth/react";

import { usePathname, useRouter } from "@/navigation";

import PulseLoader from 'react-spinners/PulseLoader'

interface LogInProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent" | "ResetPass" | "SignUpEmailSent">>
}

const LogIn:React.FC<LogInProps> = ({ setIsOpen, setModalContent }) => {

  const t = useTranslations('LogInModal')

  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [emailFocus, setEmailFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)
  const [mouseHover, setMouseHover] = useState(false)

  const [emailErr, setEmailErr] = useState(false)
  const [passErr, setPassErr] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Auth

  const onSignIn = async () => {

    if( formData.email === '' || formData.password === ''){
      if( formData.email === '' && formData.password !== '' ) {
        setEmailErr(true)
        setPassErr(false)
        toast( t('email-req-title'), {
          description: t('email-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
      if( formData.password === '' && formData.email !== '' ) {
        setPassErr(true)
        setEmailErr(false)
        toast( t('pass-req-title'), {
          description: t('pass-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
      if( formData.password === '' && formData.email === '' ) {
        setEmailErr(true)
        setPassErr(true)
        toast( t('fields-req-title'), {
          description: t('fields-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
    }
    else {
      setLoading(true)
      try {
        const response: any = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if(response.ok) {
          setIsOpen(false);
          setLoading(false);
        }
          else {
            setEmailErr(true)
            setPassErr(true)
            setLoading(false)

            toast( t('login-fail-title'), {
              description: t('login-fail-desc'),
              action: {
                label: t('close'),
                onClick: () => {}
              }
            })
          }

      } catch (error: any) {
        setEmailErr(true)
        setPassErr(true)
        setLoading(false)

        toast( t('login-fail-title'), {
          description: t('login-fail-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
    }
    
  };

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('greetings') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

        <form noValidate className='mt-[2rem] w-full' onSubmit={(e) => { e.preventDefault(); onSignIn() }}>

          <div className="relative">
            <input 
              id="loginFormEmail" 
                onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} 
                name="email" value={formData.email} onChange={handleChange} 
                className={`${emailErr && 'animate-input-error'} w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="email"
              />

            <motion.label
              htmlFor='loginFormEmail'
              className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
              initial={{ scale: 1, y: '-50%' }}
              animate={{
                scale: emailFocus || formData.email !== '' ? 0.7 : 1,
                y: emailFocus || formData.email !== '' ? '-80%' : '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            >
              { t('email') }
            </motion.label>
          </div>
            
            
            <div className="w-full mt-[1rem] relative">
              <div className="relative">
                <input id="passwordLogInInput" name="password" onFocus={() => setPassFocus(true)} onBlur={() => setPassFocus(false)} value={formData.password} onChange={handleChange} className={`${passErr && 'animate-input-error'} w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type={ showPass ? "text" : "password" }/>
                <motion.label
                  htmlFor='passwordLogInInput'
                  className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                  initial={{ scale: 1, y: '-50%' }}
                  animate={{
                    scale: passFocus || formData.password !== '' ? 0.7 : 1,
                    y: passFocus || formData.password !== '' ? '-80%' : '-50%'
                  }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                >
                  { t('password') }
                </motion.label>
              </div>
                <img onClick={() => setShowPass(prev => !prev)} src={showPass ? "/icons/icon-eye-closed.svg" : '/icons/icon-eye-open.svg'} alt="eye" draggable={false} className="size-[1rem] absolute top-[50%] -translate-y-[50%] right-[1.5rem] cursor-pointer" />
            </div>

            <button type="submit" className='bg-red hover:bg-dark-red transition-colors duration-300 w-full h-[3.5rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'>
              { 
                loading 
                  ? <PulseLoader 
                      size={5}
                      color="#FCFEFF"
                    />
                  : t('log-in') 
              }
            </button>
        </form>

        <p className='text-gray text-[1rem] text-center font-open-sans font-[400] mt-[1rem] cursor-pointer hover:opacity-75 transition-opacity duration-300' onClick={() => setModalContent('ResetPass')}>{ t('forgot-pass') }</p>

        <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center mt-[2rem] flex flex-wrap justify-center'>
            <span className='text-dark-gray'>{ t('question') }</span> &nbsp;
            <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
              <span onClick={() => setModalContent('SignUp')} className='cursor-pointer'>{ t('sign-up') }</span>
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

export default LogIn