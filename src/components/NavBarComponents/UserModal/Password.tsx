'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'

interface PasswordProps {
    value: string;
    label: string;
}

const Password: React.FC<PasswordProps> = ({value, label }) => {

  const [showPass, setShowPass] = useState(false)

  return (
    <div className="w-full relative select-none">
              <div className="relative">
                <input readOnly name="password" value={value} className={`w-full md:text-[1rem] text-[1.333rem] md:h-[3.5rem] h-[4.667rem] border border-gray/25 rounded-[0.5rem] outline-none pl-[1.5rem] pt-[1rem] pr-[4rem] ${ showPass ? "text-dark-gray" : "text-[transparent]"} font-open-sans text-[1rem] font-[400]`} type={ showPass ? "text" : "password" }/>
                <motion.label
                  className="origin-top-left absolute top-[50%] left-[1.5rem] text-gray/75 lg:text-[1rem] text-[1.333rem] font-[400]"
                  initial={{ scale: 1, y: '-50%' }}
                  animate={{
                    scale: showPass ? 0.7 : 1,
                    y: showPass ? '-80%' : '-50%'
                  }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
                >
                  { label }
                </motion.label>
              </div>
                <img onClick={() => setShowPass(prev => !prev)} src={showPass ? "/icons/icon-eye-closed.svg" : '/icons/icon-eye-open.svg'} alt="eye" draggable={false} className="size-[1rem] absolute top-[50%] -translate-y-[50%] right-[1.5rem] cursor-pointer" />
            </div>
  )
}

export default Password