'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import PulseLoader from 'react-spinners/PulseLoader';
import OrdersTable from './OrdersTable';

interface Place {
  city: string;
  country: string;
  label: {
    en: string;
    fr: string;
    ro: string;
    ru: string;
  };
}

interface Passenger {
  price: {
    currency: string;
    value: number;
  }
}

interface Travel {
  route: {
    name: string;
  };
}

export interface Order {
  arrival_place: Place;
  departure_place: Place;
  order_date: string;
  passengers: Passenger[];
  public_id: string;
  travel: Travel;
}

interface OrdersResponse {
  orders: Order[];
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
        const response = await fetch('/api/user', {
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
        setOrders(data.orders)
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