import React from 'react'
import { Order } from '../AdminOrdersContent'
import { useTranslations } from 'next-intl';
import UnderlinedText from '@/components/SearchPageComponents/SearchPageContent/UnderlinedText';
import OrderInfo from './OrderInfo';

interface OrderCardProps {
    order : Order;
}

const OrderCard:React.FC<OrderCardProps> = ({ order }) => {

    const t = useTranslations("AdminOrders")

    console.log(order)

  return (
    <div className='px-[4rem] py-[2rem] bg-light-white border border-gray/25 shadow-custom rounded-[1rem]'>
        <div className='grid grid-cols-[1.5fr,3fr]'>
            <div className='flex border justify-between'>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <p className='font-bold text-[1rem] text-dark-gray cursor-help'>{ order.id.substring(0, 6) }...</p>
                    <p className='font-[400] text-[1rem] text-gray/75'>{ t("id") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans mr-[1.5rem] gap-[0.25rem]'>
                    <p className='font-bold text-[1rem] text-dark-gray cursor-help'>{ order.passengers[0].lastname } { order.passengers[0].firstname }</p>
                    <p className='font-[400] text-[1rem] text-gray/75'>{ t("main-pass") }</p>
                </div>
            </div>

            <div className='border flex justify-between'>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <div className='flex items-center gap-[0.25rem]'>
                        <img src="/icons/route-card-icons/icon-passenger.svg" alt="passenger" className='size-[1rem]' />
                        <p className='font-bold text-[1rem] text-dark-gray cursor-help'>{ order.passengers.length }</p>
                    </div>
                    <p className='font-[400] text-[1rem] text-gray/75'>{ t("pass-nr") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <p className='font-bold text-[1rem] text-dark-gray cursor-help'>{ order.contact_details.phone_number }</p>
                    <p className='font-[400] text-[1rem] text-gray/75'>{ t("phone") }</p>
                </div>
                <div className='flex flex-col items-center font-open-sans gap-[0.25rem]'>
                    <p className='font-bold text-[1rem] text-dark-gray cursor-help'>{ order.passengers.reduce((acc, person) => acc + person.price, 0)}EUR</p>
                    <p className='font-[400] text-[1rem] text-gray/75'>{ t("total-price") }</p>
                </div>
                <div className='flex items-center font-open-sans gap-[0.25rem]'>
                    <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='size-[1rem]' />
                    <UnderlinedText text={ t('about') }/>
                </div>
            </div>
        </div>

        <OrderInfo order={order}/>
    </div>
  )
}

export default OrderCard