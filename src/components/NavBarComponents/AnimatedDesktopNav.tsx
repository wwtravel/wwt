'use client'

import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"
import { Link } from '../../navigation'
import LangPicker from './LangPicker';
import CurrencyPicker from './CurrencyPicker';

const AnimatedDesktopNav = () => {

  const t = useTranslations('NavBar');

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
                    className='max-xl:hidden shadow-custom fixed z-[20000] top-0 left-0 right-0 h-[4rem] bg-light-white rounded-[1rem] mx-[8.4375rem] px-[3.5rem] flex justify-between items-center border border-gray/25'
                    initial={{ top: '-4rem' }}
                    animate={{ top: '1rem' }}
                    exit={{ top: '-4rem' }}
                    transition={{ type: 'tween', ease: 'linear', duration: 0.3 }}
                >
                    <div className='flex gap-[1.5rem]'>
                        <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navHome')}</Link>
                        <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navSchedule')}</Link>
                        <Link href="/about" className='font-bold text-[1rem] text-dark-gray'>{t('navAbout')}</Link>
                        <Link href="/" className='font-bold text-[1rem] text-dark-gray'>{t('navContact')}</Link>
                    </div>

                    <div className='flex'>
                        <div className='flex gap-[1.5rem] mr-[3rem]'>
                        <LangPicker />
                        <CurrencyPicker />
                        </div>

                        <Link className='flex items-center gap-[0.5rem] mr-[1.5rem]' href="/">
                        <img src="/icons/icon-cart.svg" alt="cart" draggable={false} className='size-[1rem]'/>
                        <p className='font-bold text-dark-gray text-[1rem]'>{ t('navCart') }</p>
                        </Link>

                        <div className='bg-red rounded-[0.5rem] px-[1.5rem] h-[2.5rem] flex justify-center items-center gap-[0.5rem] cursor-pointer'>
                        <img src="/icons/icon-profile.svg" alt="profile" draggable={false} className='size-[1rem]' />
                        <p className='text-white font-bold text-[1rem]'>Cătălin P.</p>
                        </div>
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default AnimatedDesktopNav