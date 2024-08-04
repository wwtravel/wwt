'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const FooterNewsLetter = () => {
  const t = useTranslations("Footer")
  const btnRef = useRef<HTMLButtonElement>(null)
  const [btnWidth, setBtnWidth] = useState(0)

  useEffect(() => {
    const updateBtnWidth = () => {
      if (btnRef.current) {
        setBtnWidth(btnRef.current.clientWidth)
      }
    }

    // Initial update
    updateBtnWidth()

    // Set up resize observer to watch for changes in width
    const resizeObserver = new ResizeObserver(updateBtnWidth)
    if (btnRef.current) {
      resizeObserver.observe(btnRef.current)
    }

    // Clean up observer on unmount
    return () => {
      if (btnRef.current) {
        resizeObserver.unobserve(btnRef.current)
      }
    }
  }, [])

  console.log(btnWidth)

  return (
    <div className='flex flex-col'>
        <h3 className='font-bold font-open-sans text-[1.5rem] text-light-white mb-[1.5rem]'>{ t('newsLetter') }</h3>
        
        <div className='relative w-fit'>
            <input type="text" placeholder='example@gmail.com' style={{ paddingRight: `calc(${btnWidth}px + 1.5rem)` }} className={`w-[25rem] h-[3.5rem] rounded-[1rem] outline-none pl-[1rem] text-[1rem] text-dark-gray placeholder:text-gray/75 font-[300] font-open-sans`} maxLength={70}/>
            <button ref={btnRef} className='absolute top-[50%] -translate-y-[50%] right-[0.5rem] px-[1.5rem] text-light-white font-open-sans text-[1rem] font-bold outline-none bg-red h-[2.5rem] rounded-[0.5rem]' type="submit">{ t('send') }</button>
        </div>
    </div>
  )
}

export default FooterNewsLetter
