import React from 'react'

interface FeatureCeckTextProps{
    title: string;
    descrption : string;
}

const FeatureCeckText:React.FC<FeatureCeckTextProps> = ({ title, descrption }) => {
  return (
    <div className='flex gap-[1rem] items-start'>
        <img src="/icons/icon-checkmark.svg" alt="checkmark" draggable={false} className='size-[1.125rem]' />
        <p className='text-[1.125rem] text-dark-gray font-[500] font-open-sans align-super'><span className='font-[700] align-super leading-[1]'>{ title }:</span> <span className='align-super leading-[1]'>{ descrption }</span></p>
    </div>
  )
}

export default FeatureCeckText