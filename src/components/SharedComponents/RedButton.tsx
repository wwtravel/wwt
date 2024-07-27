import React from 'react'

interface RedButtonProps{
    text: string;
    iconURL?: string;
}

const RedButton:React.FC<RedButtonProps> = ({ text, iconURL }) => {
  return (
    <button className='h-[3.5rem] bg-red rounded-[0.5rem] px-[1.5rem] flex items-center justify-center text-[1.125rem] font-bold text-white'>
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