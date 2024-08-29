'use client'

import { Link } from '@/navigation';

import {useSearchParams, useSelectedLayoutSegment} from 'next/navigation';

import { useLocale } from 'next-intl';
import { useState } from 'react';

import { usePathname } from 'next/navigation';

const LangPicker = () => {

    const [isHovered, setIsHovered] = useState(false)

    const locale = useLocale();

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const cleanedPathname = pathname === '/ru' || pathname === '/en' || pathname === '/ro' || pathname === '/fr'
    ? '/' 
    : pathname.replace(/^\/[^/]+\//, '/');

    const usableSearchParams = searchParams.toString() === "" ? "" : `?${searchParams.toString()}` 

  return (
    <div 
        className='relative flex items-center gap-[0.25rem] cursor-pointer'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <p className='uppercase text-[1rem] font-open-sans font-bold xl:text-dark-gray text-light-white'>{ locale }</p>
        <img src="/icons/icon-arrow.svg" alt="arrow" className='size-[1rem] max-xl:hidden' draggable={false} />
        <img src="/icons/icon-arrow-white.svg" alt="arrow" className='size-[1rem] xl:hidden' draggable={false} />

        {
            isHovered && (
                <div className='absolute top-[100%] pt-[0.5rem] left-[50%] -translate-x-[50%] flex flex-col items-center shadow-custom'>
                    <div className='bg-[#FFF] p-[0.25rem] flex flex-col items-center rounded-[0.5rem]'>
                        <Link href={`${cleanedPathname}${usableSearchParams}`} scroll={false} locale='ro' className='hover:bg-gray/10 w-full text-center leading-[2.5] px-[0.75rem] rounded-[0.5rem] transition-colors duration-300'>Română</Link>
                        <Link href={`${cleanedPathname}${usableSearchParams}`} scroll={false} locale='ru' className='hover:bg-gray/10 w-full text-center leading-[2.5] px-[0.75rem] rounded-[0.5rem] transition-colors duration-300'>Русский</Link>
                        <Link href={`${cleanedPathname}${usableSearchParams}`} scroll={false} locale='en' className='hover:bg-gray/10 w-full text-center leading-[2.5] px-[0.75rem] rounded-[0.5rem] transition-colors duration-300'>English</Link>
                        <Link href={`${cleanedPathname}${usableSearchParams}`} scroll={false} locale='fr' className='hover:bg-gray/10 w-full text-center leading-[2.5] px-[0.75rem] rounded-[0.5rem] transition-colors duration-300'>Français</Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default LangPicker