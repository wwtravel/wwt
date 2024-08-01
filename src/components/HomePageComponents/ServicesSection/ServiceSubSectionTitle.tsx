import React from 'react'

interface ServiceSubSectionTitleProps{
    title: string;
    description: string;
}

const ServiceSubSectionTitle:React.FC<ServiceSubSectionTitleProps> = ({ title, description }) => {
  return (
    <div className='w-full text-center max-w-[52.625rem]'>
        <h3 className='text-red text-[2.5rem] font-black font-montserrat uppercase'>{ title }</h3>
        <p className='text-[1.125rem] text-dark-gray font-[400] font-open-sans mt-[1.5rem]'>{ description }</p>
    </div>
  )
}

export default ServiceSubSectionTitle