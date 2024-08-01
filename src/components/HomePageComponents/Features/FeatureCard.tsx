import React from 'react'

interface FeatureCardProps{
    title: string;
    subtitle: string;
}

const FeatureCard:React.FC<FeatureCardProps> = ({ title, subtitle }) => {
  return (
    <div className='w-full bg-light-white border border-gray/25 shadow-[4px_4px_24px_0px_rgba(14,14,14,0.05)] rounded-[0.5rem] py-[1.5rem] text-center px-[5rem] flex flex-col items-center justify-center gap-[0.25rem]'>
        <p className='text-red font-montserrat text-[2.5rem] font-black'>{ title }</p>
        <p className='text-dark-gray font-open-sans text-[1.5rem] font-bold line-clamp-2'>{ subtitle }</p>
    </div>
  )
}

export default FeatureCard