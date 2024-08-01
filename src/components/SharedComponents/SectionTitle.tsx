import React from 'react'

interface SectionTitleProps{
    lowOpacityTitle : string;
    title : string;
}

const SectionTitle:React.FC<SectionTitleProps> = ({ lowOpacityTitle, title }) => {
  return (
    <div className='w-full relative font-montserrat flex flex-col items-center'>
        <p className='text-[10rem] leading-[0.7] text-dark-gray/5 font-bold uppercase select-none'>{ lowOpacityTitle }</p>
        <h2 className='w-full text-center absolute left-[50%] -translate-x-[50%] uppercase top-[50%] -translate-y-[50%] text-[2.5rem] font-bold text-dark-gray'>{ title }</h2>
        <div className='h-[0.25rem] w-[6rem] bg-red mt-[1rem]'/>
    </div>
  )
}

export default SectionTitle