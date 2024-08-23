'use client'

import { useTranslations } from "next-intl"
import TextInput from "./TextInput"
import { useState } from "react"

interface AccSettingsProps{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const AccSettings:React.FC<AccSettingsProps> = ({ setIsOpen }) => {

  const t = useTranslations("UserModal")

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
        </div>
    </div>
  )
}

export default AccSettings