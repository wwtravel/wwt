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
        <img src={imgUrl} alt="avatar" className='sm:size-[6rem] size-[5.333rem] absolute top-[50%] -translate-y-[50%] left-0 -translate-x-2/3 rounded-[0.5rem]' draggable={false} />
        <img src="/icons/icon-quote.svg" alt="quote" draggable={false} className='sm:size-[4.5rem] size-[4rem]' />
        <p className='text-dark-gray sm:text-[1.125rem] text-[1.167rem] font-[400] italic sm:mt-[0.5rem] mt-[0.333rem]'>{ text }</p>
        <p className='text-dark-gray sm:text-[1.5rem] text-[1.333rem] font-bold sm:mt-[1rem] mt-[0.667rem]'>{ name }</p>
        <p className='text-dark-gray sm:text-[1.125rem] text-[1.167rem] font-[400] sm:mt-[0.25rem] mt-[0.167rem]'>{ role }</p>
    </div>
  )
}

export default CarouselCard