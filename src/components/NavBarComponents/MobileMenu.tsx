'use client'

import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import LogInModal from './LogInModal/LogInModal';
import { useState } from 'react';

import {RemoveScrollBar} from 'react-remove-scroll-bar';

import { useSession } from 'next-auth/react';
import UserModal from './UserModal/UserModal';

interface MobileMenuProps{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileMenu:React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {

  const pathname = usePathname()
  const activePage = pathname.split('/')[1];


  const t = useTranslations("NavBar")

  const [isOpenModal, setIsOpenModal] = useState(false)

  const { data } = useSession()
  const user = data?.user

  return (
    <AnimatePresence>

      {
        isOpen && (
          <>
            <RemoveScrollBar />

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
                  <img onClick={() => setIsOpen(false)} src="/icons/icon-close.svg" alt="close" draggable={false} className='w-[2.667rem] absolute right-[2rem] top-[2rem] cursor-pointer transition-opacity duration-300 hover:opacity-75' />
                  <div className='mt-[8rem] flex flex-col gap-[1.333rem] font-bold text-[2rem] text-dark-gray'>
                    <Link href="/" className={`${activePage === '' ? ' text-red ' : 'text-dark-gray hover:opacity-75'} transition-opacity duration-300'`} onClick={() => setIsOpen(false)}>{t('navHome')}</Link>
                    <Link href="/about" className={`${activePage === 'about' ? ' text-red ' : 'text-dark-gray hover:opacity-75'} transition-opacity duration-300`} onClick={() => setIsOpen(false)}>{t('navAbout')}</Link>
                    <Link href="/contacts" className={`${activePage === 'contacts' ? ' text-red ' : 'text-dark-gray hover:opacity-75'} transition-opacity duration-300`} onClick={() => setIsOpen(false)}>{t('navContact')}</Link>
                    {
                      user && user.role === "ADMIN" && (
                        <Link href="/admin/admin-routes" className={`font-bold text-[1rem] transition-opacity duration-300 text-dark-gray hover:opacity-75`}>Admin</Link>
                      )
                    }
                  </div>

                  <div className='bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] w-fit px-[4rem] h-[3.333rem] flex justify-center items-center gap-[0.667rem] cursor-pointer mt-[2rem]' onClick={() => setIsOpenModal(true)}>
                    <img src="/icons/icon-profile.svg" alt="profile" draggable={false} className='size-[1.333rem]' />
                    <p className='text-white font-bold text-[1.333rem]'>{ user ? `${user.firstname} ${user.lastname![0]}.` : t('log-in') }</p>
                  </div>

                  <AnimatePresence>
                    { !user && (
                      <motion.div exit={{ opacity: 0 }}>
                        <LogInModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
                      </motion.div>
                    )
                    }
                  </AnimatePresence>
                  { user && <UserModal isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>}
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