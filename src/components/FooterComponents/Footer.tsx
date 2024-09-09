import { useTranslations } from 'next-intl'
import React from 'react'
import FooterNewsLetter from './FooterNewsLetter'
import { Link } from '@/navigation'

const Footer = () => {

  const t = useTranslations("Footer")

  return (
    <div className='bg-[url(/images/footer-bg.webp)] bg-cover bg-center bg-no-repeat rounded-t-[1rem] mt-[8rem] overflow-hidden'>
        <div className='w-full h-full bg-red/95 xl:px-[12rem] px-[1rem] pt-[4rem]'>
            <div className='flex lg:justify-between lg:flex-row flex-col max-lg:gap-[2rem]'>
                <div>
                    <img src="/logo.svg" alt="logo" draggable={false} className='2xl:w-[20rem] w-[13.75rem]'/>
                    <p className='text-light-white font-open-sans font-bold text-[1.125rem] max-w-[21.3125rem] mt-[1.5rem] mr-[1.5rem]'>{ t('footerInfo') }</p>
                </div>

                <div className='flex md:flex-row flex-col lg:gap-[3rem] gap-[2rem] max-lg:justify-between leading-[1.5]'>
                    <div className='flex flex-col max-md:hidden'>
                        <h3 className='font-bold font-open-sans text-[1.5rem] text-light-white mb-[1.5rem] whitespace-nowrap'>{ t('usefulLinks') }</h3>
                        <Link href="/"><p className='font-open-sans text-[1rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('home') }</p></Link>
                        <Link href="/about"><p className='font-open-sans text-[1rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('about') }</p></Link>
                        <Link href="/contacts"><p className='font-open-sans text-[1rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('contact') }</p></Link>
                    </div>

                    <div className='flex flex-col'>
                        <h3 className='font-bold font-open-sans md:text-[1.5rem] text-[1.333rem] text-light-white mb-[1.5rem]'>{ t('contact') }</h3>
                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white mb-[1rem] cursor-pointer w-[16rem]'><span className='font-bold'>{ t('adress') }: </span>{ t('adressText') }</p>

                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-bold text-light-white cursor-pointer'>{ t('passengerDetails') }</p>
                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white cursor-pointer flex gap-[0.5rem]'><span>+373 60 262 525</span> <span>+41 762 333 452</span></p>
                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white mb-[1rem] cursor-pointer flex gap-[0.5rem]'><span>+373 60 629 009</span> <span>+41 766 023 886</span></p>

                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-bold text-light-white cursor-pointer'>{ t('parcelDetails') }</p>
                        <p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white cursor-pointer'>+373 68 213 292</p>
                    </div>

                    {/* <FooterNewsLetter /> */}

                    <div className='flex flex-col md:hidden'>
                        <h3 className='font-bold font-open-sans md:text-[1.5rem] text-[1.333rem] text-light-white mb-[1.5rem] whitespace-nowrap'>{ t('usefulLinks') }</h3>
                        <Link href="/"><p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('home') }</p></Link>
                        <Link href="/about"><p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('about') }</p></Link>
                        <Link href="/contacts"><p className='font-open-sans md:text-[1rem] text-[1.167rem] font-[300] text-light-white mb-[1rem] cursor-pointer'>{ t('contact') }</p></Link>
                    </div>
                </div>
            </div>

            <div className='w-full h-[1px] bg-light-white mt-[1.5rem]'/>
            
            <div className='mt-[1rem] pb-[1rem] text-center font-open-sans text-[1rem] font-[300] text-light-white cursor-pointer flex gap-[0.375rem] justify-center'>
                <p>Copyright ©World Wide Travel all rights reserved. </p>
                <div className='group transition-opacity duration-300 opacity-75 hover:opacity-100 flex gap-[0.375rem] items-center'>
                    <span className=''>Powered by Studio Modvis </span>
                    <img src="/icons/icon-modvis.svg" alt="modvis" draggable={false} className='size-[0.625rem] transition-transform duration-300 group-hover:rotate-[360deg]' />
                </div>    
            </div>

        </div>
    </div>
  )
}

export default Footer