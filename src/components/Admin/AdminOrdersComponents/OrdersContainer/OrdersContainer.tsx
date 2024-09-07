import { useTranslations } from 'next-intl'
import React from 'react'
import { Order, Order_Date_obj } from '../AdminOrdersContent';
import PulseLoader from 'react-spinners/PulseLoader';
import OrderCard from './OrderCard';

interface OrdersContainerProps{
  loading: boolean;
  groupedOrders: Order_Date_obj[] | undefined;
}

const OrdersContainer:React.FC<OrdersContainerProps> = ({ loading, groupedOrders }) => {

  const t = useTranslations("AdminOrders")
  const date_t = useTranslations("RouteSearchPage_Date")

  const extractDate = ( textDate: string ) => {
    const date = new Date(textDate);
    const dateString = date.toISOString().split('T')[0];

    return dateString
  }

  const getMonthText = ( month : number ) => {
    switch(month){
        case 1 : return date_t('jan')
        case 2 : return date_t('feb')
        case 3 : return date_t('mar')
        case 4 : return date_t('apr')
        case 5 : return date_t('may')
        case 6 : return date_t('jun')
        case 7 : return date_t('jul')
        case 8 : return date_t('aug')
        case 9 : return date_t('sept')
        case 10 : return date_t('oct')
        case 11 : return date_t('nov')
        case 12 : return date_t('dec')
    }
}

const parseDate = (dateString : string) => {
  const date = new Date(dateString.replace(" ", "T"));

  const dayOfWeek = date.getDay();

  const dayOfMonth = date.getDate();

  const month = date.getMonth() + 1;

  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  return { dayOfWeek, month, timeString, dayOfMonth, year };
}

  return (
    <div className='max-w-[66rem] w-full'>
      {
          (loading || groupedOrders === undefined)
          ? (
            <div className='h-[9.5rem] rounded-[1rem] w-full grid place-content-center bg-light-white border border-gray/25 shadow-custom'>
              <div>
                <PulseLoader 
                    size={15}
                    color='#757678'
                    style={{
                        opacity: '25%'
                    }}
                />
              </div>
          </div>
          )
          : (
            <>
              {
                groupedOrders.length === 0
                ? (
                  <div className='py-[2rem] px-[1.5rem] rounded-[1rem] w-full flex items-center justify-center bg-red/20 border border-gray/25 shadow-custom'>
                      <div className='flex lg:gap-[0.25rem] gap-[0.333rem] text-left'>
                          <img src="/icons/route-card-icons/icon-info.svg" alt="info" draggable={false} className='lg:size-[1rem] size-[1.333rem] mt-[0.25rem]' />
                          <p className='text-left text-dark-gray font-open-sans lg:text-[1rem] text-[1.333rem]'>{ t('order-not-found-error') }</p>
                      </div>
                  </div>
                )
                : (
                  <div className='flex flex-col gap-[1.5rem]'>
                    {
                      groupedOrders.map((orderGroup, index) => (
                        <div>
                          <p className='font-bold xl:text-[1.125rem] text-[1.5rem] text-dark-gray mb-[0.5rem]'>{ parseDate(orderGroup.date).dayOfMonth} {getMonthText(parseDate(orderGroup.date).month) } { parseDate(orderGroup.date).year}</p>
                          <div className='flex flex-col gap-[1rem]'>
                            {
                              orderGroup.orders.map((order, index) => (
                                <OrderCard key={index} order={order}/>
                              ))
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              }
            </>
          )
        }
    </div>
  )
}

export default OrdersContainer