import React from 'react'

interface CarouselCardProps{
    imgUrl : string;
    text : string;
    name : string;
    role : string;
}

const CarouselCard:React.FC<CarouselCardProps> = ({ imgUrl, text, name, role }) => {
  return (
    <div className='relative bg-light-white rounded-[0.5rem] border border-gray/25 py-[1.5rem] pl-[4rem] pr-[2rem] shadow-custom font-open-sans w-[31.75rem]'>
        <img src={imgUrl} alt="avatar" className='size-[6rem] absolute top-[50%] -translate-y-[50%] left-0 -translate-x-2/3 rounded-[0.5rem]' draggable={false} />
        <img src="/icons/icon-quote.svg" alt="quote" draggable={false} className='size-[4.5rem]' />
        <p className='text-dark-gray text-[1.125rem] font-[400] italic mt-[0.5rem]'>{ text }</p>
        <p className='text-dark-gray text-[1.5rem] font-bold mt-[1rem]'>{ name }</p>
        <p className='text-dark-gray text-[1.125rem] font-[400] mt-[0.25rem]'>{ role }</p>
    </div>
  )
}

export default CarouselCard