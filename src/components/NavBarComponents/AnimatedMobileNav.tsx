'use client'

import { Link } from '@/navigation';
import React, { useEffect, useState } from 'react'
import LangPicker from './LangPicker';
import CurrencyPicker from './CurrencyPicker';
import MobileMenu from './MobileMenu';

import { motion, AnimatePresence } from "framer-motion"

const AnimatedMobileNav = () => {

  const [isOpen, setIsOpen] = useState(false)

  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;

      if(scrolled >= viewportHeight / 2) setShowNav(true)
      if(scrolled < viewportHeight / 2) setShowNav(false)
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
        {
            showNav && (
              <motion.div 
                className='xl:hidden fixed top-0 left-0 w-full bg-red flex items-center justify-between py-[1rem] lg:px-[12rem] px-[1rem] rounded-b-[0.5rem]'
                initial={{ translateY: '-100%' }}
                animate={{ translateY: '0%' }}
                exit={{ translateY: '-100%' }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
              >
                  <Link href='/'>
                      <img className='md:w-[17rem] w-[13.25rem]' src="/logo.svg" alt="logo" draggable={false} />
                  </Link>

                  <div className='flex gap-[0.5rem]'>
                      <LangPicker />
                      <CurrencyPicker />
                      <img onClick={() => {setIsOpen(true); document.body.style.overflow = 'hidden' }} src="/icons/icon-menu.svg" draggable={false} alt="menu" className='size-[2rem] ml-[0.5rem] cursor-pointer' />
                  </div>

                  <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
              </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default AnimatedMobileNav