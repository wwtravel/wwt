import React from 'react'

interface FeatureCardProps{
    imageUrl : string;
    title : string;
    description : string;
}

const FeatureCard:React.FC<FeatureCardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className='w-full bg-light-white rounded-[0.5rem] py-[1.5rem] text-center font-open-sans'>
        <img src={imageUrl} alt="feature_icon" draggable={false} className='md:size-[4.5rem] size-[4rem] mx-auto' />
        <h3 className='text-dark-gray text-[1.5rem] font-bold md:mt-[1rem] mt-[0.667rem] px-[1.5rem]'>{ title }</h3>
        <p className='text-dark-gray text-[1.125rem] font-[400] md:mt-[0.5rem] mt-[0.333rem] px-[3rem]'>{ description }</p>
    </div>
  )
}

export default FeatureCard