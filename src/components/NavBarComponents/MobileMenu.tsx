'use client'

import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu:React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {

  const t = useTranslations("NavBar")

  return (
    <AnimatePresence>

      {
        isOpen && (
          <>
            <motion.div 
              className='fixed z-[20000] left-0 top-0 w-screen h-screen bg-dark-gray/50'
              initial={{ opacity: 0 }}
              animate= {{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'linear', duration: 0.3 }}
            />

            <motion.div 
              className='fixed z-[20001] top-0 right-0 h-[100dvh] w-[24.5rem] bg-light-white pl-[2.667rem] pr-[1.333rem] pb-[2.667rem] flex flex-col justify-between'
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeIn', duration: 0.3 }}
            >


                <div className='relative'>
                  <img onClick={() => {setIsOpen(false); document.body.style.overflow = 'visible' }} src="/icons/icon-close.svg" alt="close" draggable={false} className='w-[2.667rem] absolute right-[2rem] top-[2rem] cursor-pointer' />
                  <div className='mt-[8rem] flex flex-col gap-[1.333rem] font-bold text-[2rem] text-dark-gray'>
                    <Link href="/" onClick={() => {setIsOpen(false)}}>{t('navHome')}</Link>
                    <Link href="/" onClick={() => {setIsOpen(false)}}>{t('navSchedule')}</Link>
                    <Link href="/about" onClick={() => {setIsOpen(false)}}>{t('navAbout')}</Link>
                    <Link href="/" onClick={() => {setIsOpen(false)}}>{t('navContact')}</Link>
                  </div>

                  <div className='bg-red rounded-[0.5rem] w-fit px-[5.333rem] h-[3.333rem] flex justify-center items-center gap-[0.667rem] cursor-pointer mt-[2rem]'>
                    <img src="/icons/icon-profile.svg" alt="profile" draggable={false} className='size-[1.333rem]' />
                    <p className='text-white font-bold text-[1.333rem]'>Cătălin P.</p>
                  </div>
                </div>

                <div className='text-[1.167rem] font-open-sans'>
                  <p className='font-bold'>{ t('passengerDetails') }</p>
                  <p className='flex gap-[1.333rem] font-[400]'>
                    <span>+373 60 262 525</span>
                    <span>+41 762 333 452</span>
                  </p>
                  <p className='flex gap-[1.333rem] font-[400]'>
                    <span>+373 60 629 009</span>
                    <span>+41 766 023 886</span>
                  </p>

                  <p className='font-bold mt-[1.333rem]'>{ t('parcelDetails') }</p>
                  <p className='font-[400]'>+373 68 213 292</p>
                </div>

              </motion.div>
          </>
        )
      }

    </AnimatePresence>
  )
}

export default MobileMenu