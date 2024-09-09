'use client'

import { useTranslations } from "next-intl"
import TextInput from "./TextInput"
import { useEffect, useState } from "react"
import DobDatePicker from "./DobDatePicker"
import Password from "./Password"

import { motion } from "framer-motion"
import RedButton from "@/components/SharedComponents/RedButton"

import { signOut } from "next-auth/react"

import { useSession } from "next-auth/react"

import { toast } from "sonner"
import PulseLoader from "react-spinners/PulseLoader"

import { PatchUserSchema } from "@/lib/types"
import { z } from "zod"

interface AccSettingsProps{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const AccSettings:React.FC<AccSettingsProps> = ({ setIsOpen }) => {

  const t = useTranslations("UserModal")

  const [loading, setLoading] = useState(false)

  const [mouseHover, setMouseHover] = useState(false)
  const [dob, setDob] = useState('')

  const { data, update } = useSession()
  const user = data?.user

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: ''
  })

  useEffect(() => {
    if(user){
      setFormData({
        firstname : user.firstname ?? '',
        lastname : user.lastname ?? '',
        email : user.email ?? '',
        phone: user.phone_number ?? '',
        dob: user.dob ?? ''
      })
      setDob(user.dob!)
    }
  }, [user])

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      dob: dob
    }));
  }, [dob])

  const [lastNameErr, setLastNameErr] = useState(false)
  const [firstNameErr, setFirstNameErr] = useState(false)
  const [dobErr, setDobErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const onSignOut = async () => {
      setIsOpen(false)
      signOut()
    };

    const handleClick = async () => {
      setLoading(true);
      try {
        setDobErr(false)
        setFirstNameErr(false)
        setLastNameErr(false)
        setPhoneErr(false)

        const updatedData = Object.fromEntries(
          Object.entries({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            dob: formData.dob,
            phone_number: formData.phone
          }).filter(([_, value]) => value !== '')
        );

        //data validation
        PatchUserSchema.parse({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          dob: formData.dob,
          phone_number: formData.phone
        });

        const response = await fetch('/api/user', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
    
        if (!response.ok) {
          toast( t('update-error-title'), {
            description: t('update-error-desc'),
            action: {
              label: t('close'),
              onClick: () => {}
            }
          })
        } else {
          const newSession = {
            ...data,
            user: {
              ...data?.user,
              ...updatedData
            },
          };
    
          // Update the session
          await update(newSession);

          toast( t('update-success-title'), {
            description: t('update-success-desc'),
            action: {
              label: t('close'),
              onClick: () => {}
            }
          })

        }
    
        const responseData = await response.json();

      } catch (err) {
        if (err instanceof z.ZodError) {
          err.errors.forEach(error => {
            const field = error.path[0];
            if(field === 'lastname'){
              setLastNameErr(true)
              toast( t('lastname-err-title'), {
                description: t('lastname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
            if(field === 'firstname'){
              setFirstNameErr(true)
              toast( t('firstname-err-title'), {
                description: t('firstname-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
            if(field === 'phone_number'){
              setPhoneErr(true)
              toast( t('phone-err-title'), {
                description: t('phone-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
            if(field === 'dob'){
              setDobErr(true)
              toast( t('date-err-title'), {
                description: t('date-err-desc'),
                action: {
                  label: t('close'),
                  onClick: () => {}
                }
              })
            }
          })
        }
      } finally {
        setLoading(false);
      }
    }

  return (
    <div className='p-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('accDet') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>

        <div className="mt-[2rem] grid md:grid-cols-2 grid-cols-1 gap-[1rem]">
          <TextInput err={lastNameErr} readOnly={false} onChange={handleChange} value={ formData.lastname } id="UserModalLastName" label={ t('lastName') } name="lastname"/>
          <TextInput err={firstNameErr} readOnly={false} onChange={handleChange} value={ formData.firstname } id="UserModalFirstName" label={ t('firstName') } name="firstname"/>
          <TextInput err={false} readOnly={true} onChange={handleChange} value={ formData.email } id="UserModalEmail" label={ t('email') } name="email"/>
          <TextInput err={phoneErr} readOnly={false} onChange={handleChange} value={ formData.phone } id="UserModalPhone" label={ t('phone') } name="phone"/>
          <DobDatePicker err={dobErr} placeholder={ t('dob') } setDob={setDob} dob={dob}/>
        </div>

        <div className="mt-[2rem] flex sm:flex-row flex-col-reverse max-sm:gap-[1rem] justify-between items-center">
          <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center'>
              <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
                <span onClick={onSignOut} className='cursor-pointer'>{ t('signOut') }</span>
                <motion.div 
                  className="absolute bottom-[7%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: mouseHover ? [0, 1] : 1 }}
                  transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
                />
              </span>
          </div>

          <div onClick={handleClick}>
          <button className='relative md:h-[3.5rem] h-[3.333rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] px-[1.5rem] flex items-center justify-center md:text-[1.125rem] text-[1rem] font-bold text-white'>
            <p className={` ${ loading ? "opacity-0" : "opacity-100" } `}>{t('saveCh')}</p>
              { 
                  loading && <div className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
                    <PulseLoader 
                        size={5}
                        color="#FCFEFF"
                    />
                  </div>
                }
          </button>
          </div>
        </div>
    </div>
  )
}

export default AccSettings