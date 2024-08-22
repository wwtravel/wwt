import React from 'react'

interface RedButtonProps{
    text: string;
    iconURL?: string;
}

const RedButton:React.FC<RedButtonProps> = ({ text, iconURL }) => {
  return (
    <button className='md:h-[3.5rem] h-[3.333rem] bg-red hover:bg-dark-red transition-colors duration-300 rounded-[0.5rem] px-[1.5rem] flex items-center justify-center md:text-[1.125rem] text-[1rem] font-bold text-white'>
      {
        iconURL && (
          <img className='size-[1.5rem] mr-[0.5rem]' src={iconURL} alt="icon" draggable={false} />
        )
      }
      <p>
        { text }
      </p>
    </button>
  )
}

export default RedButton