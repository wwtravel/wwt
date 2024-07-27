import React from 'react'

interface NavContactProps{
    imageUrl: string;
    title: string;
    info: string[];
}

const NavContact:React.FC<NavContactProps> = ({ imageUrl, title, info }) => {
  return (
    <div className='flex gap-[1rem]'>
        <img src={imageUrl} alt="icon" draggable={false} className='size-[1.5rem]' />
        <div>
            <h3 className='uppercase text-white text-[1.125rem] font-bold'>{ title }</h3>
            <p className='flex gap-[1rem] mt-[0.25rem] text-white text-[1rem] font-[400]'>
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