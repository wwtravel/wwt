'use client'

import React, { useEffect, useState } from 'react'
import ModalWindow from '../../SharedComponents/ModalWindow';
import LogIn from './LogIn';
import SignUp from './SignUp';

interface LogInModalProps{
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const LogInModal:React.FC<LogInModalProps> = ({ isOpen, setIsOpen }) => {

  const [modalContent, setModalContent] = useState<"LogIn" | "SignUp" | "EmailSent">("LogIn")

  useEffect(() => {
    if(isOpen === false){
      setModalContent("LogIn")
    }
  }, [isOpen])

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={32}>
      { modalContent === "LogIn" && <LogIn setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
      { modalContent === "SignUp" && <SignUp setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
    </ModalWindow>
  )
}

export default LogInModal