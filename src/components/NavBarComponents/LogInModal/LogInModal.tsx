'use client'

import React, { useEffect, useState } from 'react'
import ModalWindow from '../../SharedComponents/ModalWindow';
import LogIn from './LogIn';
import SignUp from './SignUp';
import EmailSent from './EmailSent';
import ResetPass from './ResetPass';
import SignUpEmailSent from './SignUpEmailSent';

interface LogInModalProps{
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const LogInModal:React.FC<LogInModalProps> = ({ isOpen, setIsOpen }) => {

  const [modalContent, setModalContent] = useState<"LogIn" | "SignUp" | "EmailSent" | "ResetPass" | "SignUpEmailSent">("LogIn")

  const [sentEmail, setSentEmail] = useState('')

  const [signUpSentEmail, setSignUpSentEmail] = useState('')


  useEffect(() => {
    if(isOpen === false){
      setModalContent("LogIn")
    }
  }, [isOpen])

  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} maxWidth={32}>
      { modalContent === "LogIn" && <LogIn setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
      { modalContent === "SignUp" && <SignUp setSentEmail={setSignUpSentEmail} setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
      { modalContent === "EmailSent" && <EmailSent sentEmail={sentEmail} setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
      { modalContent === "ResetPass" && <ResetPass setSentEmail={setSentEmail} setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
      { modalContent === "SignUpEmailSent" && <SignUpEmailSent sentEmail={signUpSentEmail} setIsOpen={setIsOpen} setModalContent={setModalContent}/> }
    </ModalWindow>
  )
}

export default LogInModal