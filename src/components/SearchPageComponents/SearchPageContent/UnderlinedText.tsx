'use client'

import { useState } from "react";
import { motion } from "framer-motion";

interface UnderlinedTextProps{
    text : string;
}

const UnderlinedText:React.FC<UnderlinedTextProps> = ({ text }) => {

    const [mouseHover, setMouseHover] = useState(false)

  return (
    <div className='font-open-sans text-gray text-[1rem] font-[400] text-center cursor-pointer'>
        <span onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)} className="relative">
            <span>{ text }</span>
            <motion.div 
            className="absolute bottom-[7%] left-0 w-full h-[1px] bg-gray/75 origin-left"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: mouseHover ? [0, 1] : 1 }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
            />
        </span>
    </div>
  )
}

export default UnderlinedText