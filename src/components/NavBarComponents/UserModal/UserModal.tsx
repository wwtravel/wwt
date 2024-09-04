'use client'

import React, { useEffect, useState } from 'react'
import ModalWindow from '../../SharedComponents/ModalWindow';
import AccSettings from './AccSettings';
import Orders from './Orders';
import { useTranslations } from 'next-intl';

interface UserModalProps{
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, setIsOpen }) => {

  const t = useTranslations("UserModal")

  const [modalContent, setModalContent] = useState<"AccSettings" | "Orders">("AccSettings")

  useEffect(() => {
    if(isOpen === false){
      setModalContent("AccSettings")
    }
  }, [isOpen])

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={45.75}>
      <div className='w-full h-[5rem] flex'>
        <div onClick={() => setModalContent('Orders')} className={`h-full px-[1rem] text-center cursor-pointer uppercase grid place-content-center md:text-[1.5rem] text-[1rem] font-bold font-montserrat flex-1 transition-colors duration-300 ${ modalContent === "Orders" ? "bg-light-white text-red" : "bg-red text-light-white" }`}>{ t('tab_1_text') }</div>
        <div onClick={() => setModalContent('AccSettings')} className={`h-full px-[1rem] text-center cursor-pointer uppercase grid place-content-center md:text-[1.5rem] text-[1rem] font-bold font-montserrat flex-1 transition-colors duration-300 ${ modalContent === "AccSettings" ? "bg-light-white text-red" : "bg-red text-light-white" }`}>{ t('tab_2_text') }</div>
      </div>
      { modalContent === "AccSettings" && <AccSettings setIsOpen={setIsOpen}/> }
      { modalContent === "Orders" && <Orders setIsOpen={setIsOpen}/> }
    </ModalWindow>
  )
}

export default UserModal