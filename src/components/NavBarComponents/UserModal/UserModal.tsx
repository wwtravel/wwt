'use client'

import React, { useEffect, useState } from 'react'
import ModalWindow from '../../SharedComponents/ModalWindow';
import AccSettings from './AccSettings';
import Orders from './orders';

interface UserModalProps{
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, setIsOpen }) => {

  const [modalContent, setModalContent] = useState<"AccSettings" | "AccDetails">("AccDetails")

  useEffect(() => {
    if(isOpen === false){
      setModalContent("AccDetails")
    }
  }, [isOpen])

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={32}>
      { modalContent === "AccSettings" && <AccSettings /> }
      { modalContent === "AccDetails" && <Orders /> }
    </ModalWindow>
  )
}

export default UserModal