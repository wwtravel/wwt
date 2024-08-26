'use client'

import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import PulseLoader from 'react-spinners/PulseLoader'

import { PostUserSchema } from "@/lib/types"
import { z } from "zod"


interface SignUpProps{
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setModalContent : React.Dispatch<React.SetStateAction<"LogIn" | "SignUp" | "EmailSent">>
}

const SignUp:React.FC<SignUpProps> = ({ setIsOpen, setModalContent }) => {

  const t = useTranslations('SignUpModal')

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName : '',
    lastName : '',
    email: '',
  })

  const locale = useLocale()

  const [firstNameFocus, setFirstNameFocus] = useState(false)
  const [lastNameFocus, setLastNameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [mouseHover, setMouseHover] = useState(false)

  const [lastNameErr, setLastNameErr] = useState(false)
  const [firstNameErr, setFirstNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.email === '' || formData.firstName === '' || formData.lastName === ''){
      setEmailErr(false)
      setLastNameErr(false)
      setFirstNameErr(false)

      if(formData.email === '') {
        setEmailErr(true)
        toast( t('email-req-title'), {
          description: t('email-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
      if(formData.firstName === '') {
        setFirstNameErr(true)
        toast( t('firstname-req-title'), {
          description: t('firstname-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
      if(formData.lastName === '') {
        setLastNameErr(true)
        toast( t('lastname-req-title'), {
          description: t('lastname-req-desc'),
          action: {
            label: t('close'),
            onClick: () => {}
          }
        })
      }
    } 
    else {
      
      setLoading(true);
      try {
        
        //data validation
        PostUserSchema.parse({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          lang: locale,
        });

          const response = await fetch('/api/user', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  firstname: formData.firstName,
                  lastname: formData.lastName,
                  email: formData.email,
                  lang: locale,
              }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              console.log("Email Sent")
              setIsOpen(false)
          } else {
              if(response.status === 400){
                toast( t('email-taken-title'), {
                  description: t('email-taken-desc'),
                  action: {
                    label: t('close'),
                    onClick: () => {}
                  }
                })
              } else {
                toast( t('general-error-title'), {
                  description: t('general-error-desc'),
                  action: {
                    label: t('close'),
                    onClick: () => {}
                  }
                })
              }
          }
      } catch (err) {
        if (err instanceof z.ZodError) {
          err.errors.forEach(error => {
            const field = error.path[0];
            if(field === 'lastname') {
              toast( t('lastname-err-title'), {
                description: t('lastname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
            if(field === 'firstname') {
              toast( t('firstname-err-title'), {
                description: t('firstname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
            if(field === 'email') {
              toast( t('email-err-title'), {
                description: t('email-err-desc'),
                action: {
                  label: t('close'),
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

};

  return (
    <div className='py-[4rem] px-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('createAccTitle') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>
        <p className='text-dark-gray font-open-sans font-[400] text-[1.125rem] text-center mt-[1rem]'>{ t('message') }</p>

        <form noValidate className='mt-[2rem] w-full' onSubmit={handleSubmit}>
          <div className="relative">
            <input maxLength={50} id="signUpFormLastName" name="lastName" onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)} value={formData.lastName} onChange={handleChange} className={`${lastNameErr && 'animate-input-error'} w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text"/>

            <motion.label
              htmlFor='signUpFormLastName'
              className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
              initial={{ scale: 1, y: '-50%' }}
              animate={{
                scale: lastNameFocus || formData.lastName !== '' ? 0.7 : 1,
                y: lastNameFocus || formData.lastName !== '' ? '-80%' : '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            >
              { t('last-name') }
            </motion.label>
          </div>

          <div className="relative mt-[1rem]">
            <input maxLength={50} id="signUpFormFirstName" name="firstName" onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)} value={formData.firstName} onChange={handleChange} className={`${firstNameErr && 'animate-input-error'} w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text"/>

            <motion.label
              htmlFor='signUpFormFirstName'
              className="origin-top-left cursor-text absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
              initial={{ scale: 1, y: '-50%' }}
              animate={{
                scale: firstNameFocus || formData.firstName !== '' ? 0.7 : 1,
                y: firstNameFocus || formData.firstName !== '' ? '-80%' : '-50%'
              }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
            >
              { t('first-name') }
            </motion.label>
          </div>

          <div className="relative mt-[1rem]">
            <input maxLength={50} id="signUpFormEmail" name="email" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} value={formData.email} onChange={handleChange} className={`${emailErr && 'animate-input-error'} w-full h-[3.5rem] border border-gray/25 rounded-[0.5rem] outline-none px-[1.5rem] text-dark-gray font-open-sans text-[1rem] font-[400] pt-[1rem]`} required type="text"/>

            <motion.label
              htmlFor='signUpFormEmail'
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

            <button type="submit" className='bg-red hover:bg-dark-red transition-colors duration-300 w-full h-[3.5rem] rounded-[0.5rem] text-light-white text-[1.125rem] font-bold font-open-sans mt-[2rem] cursor-pointer'>
              { 
                loading 
                  ? <PulseLoader 
                      size={5}
                      color="#FCFEFF"
                    />
                  : t('sign-up') 
              }
            </button>
        </form>

        <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center mt-[2rem] flex flex-wrap justify-center'>
            <span className='text-dark-gray'>{ t('question') }</span> &nbsp;
            <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
              <span onClick={() => setModalContent('LogIn')} className='cursor-pointer'>{ t('log-in') }</span>
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

export default SignUp