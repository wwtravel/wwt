'use client'

import { useTranslations } from "next-intl"
import TextInput from "./TextInput"
import { useEffect, useState } from "react"
import DobDatePicker from "./DobDatePicker"
import Password from "./Password"

import { motion } from "framer-motion"
import RedButton from "@/components/SharedComponents/RedButton"

import { signOut } from "next-auth/react"

interface AccSettingsProps{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const AccSettings:React.FC<AccSettingsProps> = ({ setIsOpen }) => {

  const t = useTranslations("UserModal")

  const [mouseHover, setMouseHover] = useState(false)
  const [dob, setDob] = useState('')

  useEffect(() => {
    setFormData({
      ...formData,
      dob: dob
    });
  }, [dob])

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: ''
  })

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

  return (
    <div className='p-[3rem] relative'>
        <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('accDet') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>

        <div className="mt-[2rem] grid grid-cols-2 gap-[1rem]">
          <TextInput onChange={handleChange} value={ formData.lastname } id="UserModalLastName" label={ t('lastName') } name="lastname"/>
          <TextInput onChange={handleChange} value={ formData.firstname } id="UserModalFirstName" label={ t('firstName') } name="firstname"/>
          <TextInput onChange={handleChange} value={ formData.email } id="UserModalEmail" label={ t('email') } name="email"/>
          <TextInput onChange={handleChange} value={ formData.phone } id="UserModalPhone" label={ t('phone') } name="phone"/>
          <DobDatePicker placeholder={ t('dob') } setDob={setDob}/>
          <Password value="gfgfgf" label={ t('pass') }/>
        </div>

        <div className="mt-[2rem] flex justify-between items-center">
          <div className='font-open-sans text-gray text-[1.125rem] font-[400] text-center'>
              <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
                <span onClick={onSignOut} className='cursor-pointer'>{ t('signOut') }</span>
                <motion.div 
                  className="absolute bottom-[15%] left-0 w-full h-[1px] bg-gray/75 origin-left"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: mouseHover ? [0, 1] : 1 }}
                  transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
                />
              </span>
          </div>

          <RedButton text={ t('saveCh') }/>
        </div>
    </div>
  )
}

export default AccSettings