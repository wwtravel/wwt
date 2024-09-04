import React from 'react'
import { Order } from './Orders'
import { useTranslations } from 'next-intl'

interface OrdersTableProps{
    orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {

  const t = useTranslations("UserModal")

  return (
    <div className='w-full grid grid-cols-[auto,auto,auto,auto,auto] gap-x-[2rem] gap-y-[1rem]'>
            <p className='text-gray/75 font-open-sans text-[1rem] font-[400] uppercase text-nowrap text-center'>{ t('id') }</p>
            <p className='text-gray/75 font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ t('route') }</p>
            <p className='text-gray/75 font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ t('date') }</p>
            <p className='text-gray/75 font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ t('passengers') }</p>
            <p className='text-gray/75 font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ t('price') }</p>

        {
            orders.map((order, index) => (
                <React.Fragment key={index}>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] uppercase text-nowrap text-center'>{ `0189${index + 1}` }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ `order.route` }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ `order.date` }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ order.passengers.length }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ `order.price` }</p>
                </React.Fragment>
            ))
        }


    </div>
  )
}

export default OrdersTable