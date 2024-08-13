import RedButton from '@/components/SharedComponents/RedButton'
import SectionTitle from '@/components/SharedComponents/SectionTitle'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const About = () => {

  const t = useTranslations("AboutPage_About")

  return (
    <div className='mt-[11.5rem]'>
        <SectionTitle lowOpacityTitle={t('lowOpacityTitle')} title={t('title')}/>

        <div className='max-w-[96rem] mx-auto mt-[4rem] flex gap-[4rem]'>
            <div className='flex-1 relative w-full'>
                <Image 
                    src="/images/aboutPage/about-sect.png"
                    alt='about'
                    draggable={false}
                    fill
                    objectFit='cover'
                    className='rounded-[1rem]'
                />
            </div>

            <div className='flex-1 font-open-sans text-dark-gray h-fit'>
                <p className='text-[1.5rem] font-bold'>{ t('AboutBoldText') }</p>
                <p className='text-[1.125rem] font-[400] mt-[1.5rem] mb-[3rem]'>
                    <span>{ t('AboutParagraph_1') }</span> 
                    <br />
                    <br />
                    <span>{ t('AboutParagraph_2') }</span>
                </p>
                <RedButton text={ t('AboutBtn') }/>
            </div>

        </div>
    </div>
  )
}

export default About