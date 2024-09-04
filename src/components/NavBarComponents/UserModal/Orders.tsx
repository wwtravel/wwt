'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader';
import OrdersTable from './OrdersTable';

interface ContactDetails {
  email: string;
  phone_number: string;
  notes: string | null;
}

interface Passenger {
  firstname: string;
  lastname: string;
  price: number;
}

export interface Order {
  id: string;
  contact_details: ContactDetails;
  passengers: Passenger[];
  travel_id: string;
  user_id: string;
}


interface OrdersProps{
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const Orders:React.FC<OrdersProps> = ({ setIsOpen }) => {

  const t = useTranslations("UserModal")

  const [loading, setLoading] = useState(false)

  const [orders, setOrders] = useState<Order[]>([])

  async function fetchOrder() {
    setLoading(true)
    try {
        const response = await fetch('/api/order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            setLoading(false)
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        setOrders(data.user.orders)
        setLoading(false)
      } catch (error) {
          setLoading(false)
          console.error('Error fetching order:', error);
      }
    }

    useEffect(() => {
      fetchOrder();
    }, [])


  return (
    <div className='p-[3rem] relative'>
      <img src="/icons/icon-close.svg" alt="close" draggable={false} className='absolute right-[1rem] top-[1rem] size-[2rem] cursor-pointer' onClick={() => setIsOpen(false)}/>
        <h3 className='text-dark-gray uppercase font-montserrat font-bold text-[1.5rem] text-center leading-[0.7]'>{ t('orders') }</h3>
        <div className='bg-red h-[2px] w-[3rem] mt-[1rem] mx-auto'/>

        <div className='h-[17.75rem] mt-[2.5rem] overflow-y-scroll'>
            {
              loading 
              ? (
                  <div className='h-full w-full flex justify-center pt-[6.25rem]'>
                    <PulseLoader 
                        size={15}
                        color='#757678'
                        style={{
                            opacity: '25%'
                        }}
                    />
                  </div>
                )
              : (
                <>
                  {
                    orders.length === 0
                    ? (
                      <div className='w-full h-full pt-[6.25rem] text-center'>
                        <p className='text-[1rem] font-[400] font-open-sans text-gray/75'>{ t('no-reservations') }</p>
                      </div>
                    )
                    : <OrdersTable orders={orders} />
                  }
                </>
              )
            }
        </div>
    </div>
  )
}

export default Orders