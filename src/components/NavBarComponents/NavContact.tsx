import React from 'react'

interface NavContactProps{
    imageUrl: string;
    darkImageUrl: string;
    title: string;
    info: string[];
}

const NavContact:React.FC<NavContactProps> = ({ imageUrl, title, info, darkImageUrl }) => {
  return (
    <div className='flex gap-[1rem]'>
        <img src={imageUrl} alt="icon" draggable={false} className='size-[1.5rem] max-xl:hidden' />
        <img src={darkImageUrl} alt="icon" draggable={false} className='size-[1.5rem] xl:hidden' />
        <div>
            <h3 className='uppercase xl:text-light-white text-dark-gray text-[1.125rem] font-bold'>{ title }</h3>
            <p className='flex md:flex-row flex-col md:gap-[1rem] gap-[0.125rem] mt-[0.25rem] xl:text-light-white text-dark-gray  text-[1rem] font-[400]'>
                {
                    info.map((info, index) => (
                        <span key={index}>{ info }</span>
                    ) )
                }
            </p>
        </div>
    </div>
  )
}

export default NavContact