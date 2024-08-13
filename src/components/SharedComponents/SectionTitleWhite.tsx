import React from 'react'

interface SectionTitleProps{
    lowOpacityTitle : string;
    title : string;
}

const SectionTitleWhite:React.FC<SectionTitleProps> = ({ lowOpacityTitle, title }) => {
  return (
    <div className='w-full font-montserrat flex flex-col items-center px-[1rem]'>
      <div className='relative w-full flex justify-center'>
        <p className='md:text-[10rem] text-[5.333rem] leading-[0.7] text-light-white/15 font-bold uppercase select-none'>{ lowOpacityTitle }</p>
        <h2 className='w-full text-center absolute left-[50%] -translate-x-[50%] uppercase top-[50%] -translate-y-[50%] md:text-[2.5rem] text-[2rem] leading-[1] font-bold text-light-white'>{ title }</h2>
      </div>
        <div className='h-[0.25rem] md:w-[6rem] w-[4rem] bg-light-white mt-[1rem]'/>
    </div>
  )
}

export default SectionTitleWhite