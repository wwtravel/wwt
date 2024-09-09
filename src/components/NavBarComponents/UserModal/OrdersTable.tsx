import React from 'react'
import { Order } from './Orders'
import { useLocale, useTranslations } from 'next-intl'

interface OrdersTableProps{
    orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {

  const t = useTranslations("UserModal")
  const locale = useLocale()

  const getLocale = ( locale: string ) => {
        switch(locale) {
            case 'ro' : return 'ro'
            case 'ru' : return 'ru'
            case 'en' : return 'en'
            case 'fr' : return 'fr'
            default : return 'en'
        }
    }

    const extractDate = ( textDate: string ) => {
        const date = new Date(textDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}.${month}.${year}`;
    }
    

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
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] uppercase text-nowrap text-center'>{ order.public_id }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ order.departure_place.label[getLocale(locale)] } - { order.arrival_place.label[getLocale(locale)] }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{  }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ order.passengers.length }</p>
                    <p className='text-dark-gray font-open-sans text-[1rem] font-[400] text-nowrap text-center'>{ order.passengers.reduce((sum, passenger) => sum + passenger.price.value, 0) }{order.passengers[0].price.currency}</p>
                </React.Fragment>
            ))
        }


    </div>
  )
}

export default OrdersTable