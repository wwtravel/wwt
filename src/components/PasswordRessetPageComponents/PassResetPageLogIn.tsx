'use client'


import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { Link, useRouter } from '@/navigation'

const PassResetPageLogIn = () => {

  const router = useRouter()

  const t = useTranslations("ResetSuccessfulPage")
  const login_t = useTranslations("LogInModal")

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
        toast( login_t('email-req-title'), {
          description: login_t('email-req-desc'),
          action: {
            label: login_t('close'),
            onClick: () => {}
          }
        })
      }
      if( formData.password === '' && formData.email !== '' ) {
        setPassErr(true)
        setEmailErr(false)
        toast( login_t('pass-req-title'), {
          description: login_t('pass-req-desc'),
          action: {
            label: login_t('close'),
            onClick: () => {}
          }
        })
      }
      if( formData.password === '' && formData.email === '' ) {
        setEmailErr(true)
        setPassErr(true)
        toast( login_t('fields-req-title'), {
          description: login_t('fields-req-desc'),
          action: {
            label: login_t('close'),
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
          setLoading(false)
          router.push('/')
        }
          else {
            setEmailErr(true)
            setPassErr(true)
            setLoading(false)

            toast( login_t('login-fail-title'), {
              description: login_t('login-fail-desc'),
              action: {
                label: login_t('close'),
                onClick: () => {}
              }
            })
          }

      } catch (error: any) {
        setEmailErr(true)
        setPassErr(true)
        setLoading(false)

        toast( login_t('login-fail-title'), {
          description: login_t('login-fail-desc'),
          action: {
            label: login_t('close'),
            onClick: () => {}
          }
        })
      }
    }
    
  };


  return (
    <div className='w-full pt-[14rem] px-[1rem]'>
      <div className='max-w-[84.25rem] w-full mx-auto h-[40.875rem] bg-[url(/images/dotted-map-bg.png)] bg-cover bg-center flex items-center'>
        <div className='max-w-[32rem] w-full mx-auto bg-light-white border border-gray/25 rounded-[1rem] shadow-custom py-[4rem] lg:px-[3rem] px-[2rem]'>
          <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[1]'>{ t('title') }</h3>
          <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
          <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

          <form noValidate className='mt-[2rem] w-full' onSubmit={(e) => { e.preventDefault(); onSignIn() }}>

            <div className="relative">
              <input 
                id="ResetloginFormEmail" 
                  onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} 
                  name="email" value={formData.email} onChange={handleChange} 
                  className={`${emailErr && 'animate-input-error'} w-full lg:h-[3.5rem] h-[4rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="email"
                />

              <motion.label
                htmlFor='ResetloginFormEmail'
                className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                initial={{ scale: 1, y: '-50%' }}
                animate={{
                  scale: emailFocus || formData.email !== '' ? 0.7 : 1,
                  y: emailFocus || formData.email !== '' ? '-80%' : '-50%'
                }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              >
                { login_t('email') }
              </motion.label>
            </div>
              
              
              <div className="w-full mt-[1rem] relative">
                <div className="relative">
                  <input id="ResetpasswordLogInInput" name="password" onFocus={() => setPassFocus(true)} onBlur={() => setPassFocus(false)} value={formData.password} onChange={handleChange} className={`${passErr && 'animate-input-error'} w-full lg:h-[3.5rem] h-[4rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type={ showPass ? "text" : "password" }/>
                  <motion.label
                    htmlFor='ResetpasswordLogInInput'
                    className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                    initial={{ scale: 1, y: '-50%' }}
                    animate={{
                      scale: passFocus || formData.password !== '' ? 0.7 : 1,
                      y: passFocus || formData.password !== '' ? '-80%' : '-50%'
                    }}
                    transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                  >
                    { login_t('password') }
                  </motion.label>
                </div>
                  <img onClick={() => setShowPass(prev => !prev)} src={showPass ? "/icons/icon-eye-closed.svg" : '/icons/icon-eye-open.svg'} alt="eye" draggable={false} className="size-[1rem] absolute top-[50%] -translate-y-[50%] right-[1.5rem] cursor-pointer" />
              </div>

              <button type="submit" className='bg-red hover:bg-dark-red transition-colors duration-300 w-full lg:h-[3.5rem] h-[4rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'>
                { 
                  loading 
                    ? <PulseLoader 
                        size={5}
                        color="#FCFEFF"
                      />
                    : login_t('log-in') 
                }
              </button>
          </form>
          
          <div className='text-center mt-[1rem]'>
            <Link href="/" className='text-gray text-[1rem] font-open-sans font-[400] cursor-pointer hover:opacity-75 transition-opacity duration-300'>{ t('back-to-website') }</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassResetPageLogIn