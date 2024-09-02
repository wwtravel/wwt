'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

interface OrdersProps{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const Orders:React.FC<OrdersProps> = ({ setIsOpen }) => {

  const t = useTranslations("UserModal")


  async function fetchOrder() {
    try {
        const response = await fetch('/api/order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
      } catch (error) {
          console.error('Error fetching order:', error);
      }
    }

    fetchOrder();

  return (
    <div className='p-[3rem] relative'>
      <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('orders') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>

        <div className='h-[17.75rem] mt-[2.5rem] overflow-y-scroll'>
            <div className='w-full h-full grid place-content-center'>
              <p className='text-[1rem] font-[400] font-open-sans text-gray/75'>{ t('no-reservations') }</p>
            </div>
        </div>
    </div>
  )
}

export default Orders